import React from "react";
import { useParams } from "react-router-dom";
import { useDatabase, useDatabaseObjectData, useUser } from "reactfire";
import LoadingSpinner from "../components/loading.component";
import BingoSheet from "../components/bingo-sheet.component";
import JoinGame from "../components/join-game.component";
import EnemyGameView from "../components/enemy-game.component";

const GameView: React.FunctionComponent = () => {
  const { data: user } = useUser();
  const { gameId } = useParams<{ gameId: string }>();
  const database = useDatabase();
  const ref = database.ref(`/games/${gameId}`);
  const { status, data } = useDatabaseObjectData<any>(ref);

  switch (status) {
    case "loading":
      return <LoadingSpinner />;
    case "error":
      return <p>Whoopsie!</p>;
    default:
      return "creator" in data ? (
        <>
          {user.uid in data.players ? (
            <div className="jumbotron">
              <BingoSheet gameId={gameId} userId={user.uid} />
            </div>
          ) : (
            <JoinGame gameId={gameId} />
          )}
          {/**<div className="row">
           <div className="col-md-6">
           <h2>BINGO</h2>
           <p>Noch keiner</p>
           </div>
           <div className="col-md-6">
           <h2>BINGO BINGO</h2>
           </div>
           </div>*/}
          {Object.entries(data.players).filter(([k]) => k !== user.uid).length >
            0 && (
            <>
              <h2>Mitspieler</h2>
              {Object.entries(data.players)
                .filter(([k]) => k !== user.uid)
                .map(([k, v]) => (
                  <EnemyGameView
                    key={"enemy-" + k}
                    gameId={gameId}
                    userId={k}
                  />
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
