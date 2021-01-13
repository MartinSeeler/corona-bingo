import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import words from "./words";

//Initialize the App
admin.initializeApp(functions.config().firebase);

exports.onUserCreate = functions
  .region("europe-west3")
  .runWith({
    memory: "128MB",
  })
  .auth.user()
  .onCreate((user) => {
    return admin
      .database()
      .ref("/players/" + user.uid)
      .update({
        name: "",
        created: new Date().getTime(),
      });
  });

exports.deleteStale = functions
  .region("europe-west3")
  .runWith({
    memory: "128MB",
  })
  .https.onRequest((req, resp) => {
    const minOffset: number = 86400000; // 24h
    const now = new Date().getTime();
    const gamesRef = admin.database().ref("/games");
    const playersRef = admin.database().ref("/players");
    const deleteGames = gamesRef
      .get()
      .then((snap) => {
        if (snap.exists()) {
          const games: any = snap.val();
          const gameIdsToRemove: string[] = Object.entries(games)
            .filter((foo: [string, any]) => {
              return now - parseInt(foo[1].created) >= minOffset;
            })
            .map(([k]) => k);
          return gameIdsToRemove;
        } else {
          console.log("No games found");
          return [];
        }
      })
      .then((gameIds: string[]) => {
        console.log("Deleting games", gameIds);
        return Promise.all(gameIds.map((gid) => gamesRef.child(gid).remove()));
      });
    const deletePlayers = playersRef
      .get()
      .then((snap) => {
        if (snap.exists()) {
          const players: any = snap.val();
          return Object.entries(players)
            .filter((foo: [string, any]) => {
              return now - parseInt(foo[1].created) >= minOffset;
            })
            .map(([k]) => k);
        } else {
          console.log("No players found");
          return [];
        }
      })
      .then((playerIds: string[]) => {
        console.log("Deleting players", playerIds);
        return Promise.all(
          playerIds.map((uid) =>
            playersRef
              .child(uid)
              .remove()
              .then(() => admin.auth().deleteUser(uid))
          )
        );
      });
    Promise.all([deleteGames, deletePlayers]).then(
      () => resp.sendStatus(200),
      () => resp.sendStatus(500)
    );
  });

exports.onCreateGame = functions
  .region("europe-west3")
  .runWith({
    memory: "128MB",
  })
  .https.onCall((data, context) => {
    // verify Firebase Auth ID token
    if (!context.auth) {
      return { message: "Authentication Required!", code: 401 };
    }

    // do your things..
    const uid = context.auth.uid;
    // const query = data.query;

    const newGame = admin.database().ref("/games").push();
    return newGame
      .set({
        creator: uid,
        created: new Date().getTime(),
        words: 9,
        players: {
          [uid]: {
            words: createRandomWords().join(";"),
            completed: "",
          },
        },
      })
      .then(() => ({
        game: newGame.key,
        token: uid.slice(uid.length - 5),
      }));
  });

exports.onJoinGame = functions
  .region("europe-west3")
  .runWith({
    memory: "128MB",
  })
  .https.onCall(({ game, token }: { game: string; token: string }, context) => {
    // verify Firebase Auth ID token
    if (!context.auth) {
      return { message: "Authentication Required!", code: 401 };
    }

    const uid = context.auth.uid;

    return admin
      .database()
      .ref(`/games/${game}`)
      .get()
      .then((snap) => {
        if (snap.exists()) {
          // game exists
          const playersRef = admin
            .database()
            .ref(`/games/${game}/players/${uid}`);
          return playersRef.set({
            words: createRandomWords().join(";"),
            completed: "",
          });
        } else {
          return Promise.reject("Game does not exist");
        }
      });
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const createRandomWords: () => string[] = () => {
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled
    .slice(0, 9)
    .map((xs) => xs.sort(() => 0.5 - Math.random())[0]);
};
