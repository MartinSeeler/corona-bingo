import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDatabase, useDatabaseObjectData, useUser } from "reactfire";
import LoadingSpinner from "../components/loading.component";
import BingoSheet from "../components/bingo-sheet.component";
import EnemyGameView from "../components/enemy-game.component";
import ShareComponent from "../components/share-game.component";
import JoinGame from "../components/join-game.component";
import { toast } from "react-toastify";

export type GameSheet = {
  completed: string;
  words: string;
};

export type Game = {
  creator: string;
  created: number;
  players: {
    [uid: string]: GameSheet;
  };
};

const GameView: React.FunctionComponent = () => {
  const { data: user } = useUser();
  const { gameId } = useParams<{ gameId: string }>();
  const database = useDatabase();
  const ref = database.ref(`/games/${gameId}`);
  const { status, data } = useDatabaseObjectData<Game>(ref);

  const [otherPlayers, setOtherPlayers] = useState<string[]>(
    Object.entries(data.players)
      .filter(([k]) => k !== user.uid)
      .map(([k]) => k)
  );

  useEffect(() => {
    const newOtherPlayers = Object.entries(data.players)
      .filter(([k]) => k !== user.uid)
      .map(([k]) => k);
    newOtherPlayers
      .filter((x) => !otherPlayers.includes(x))
      .forEach((uid) => {
        toast(`Spieler ${uid} ist beigetreten!`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setOtherPlayers(newOtherPlayers);
  }, [user, data, setOtherPlayers]);

  switch (status) {
    case "loading":
      return <LoadingSpinner text={"Spiel wird geladen..."} />;
    case "error":
      return <p>Whoopsie!</p>;
    default:
      return "creator" in data ? (
        <>
          {user.uid in data.players ? (
            <>
              <ShareComponent />
              <BingoSheet gameId={gameId} userId={user.uid} />
            </>
          ) : (
            <>
              <JoinGame gameId={gameId} />
              <hr />
            </>
          )}
          {otherPlayers.length > 0 && (
            <>
              {otherPlayers.map((k) => (
                <EnemyGameView key={"enemy-" + k} gameId={gameId} userId={k} />
              ))}
            </>
          )}
        </>
      ) : (
        <p>Existiert nicht!</p>
      );
  }
};

export default GameView;
