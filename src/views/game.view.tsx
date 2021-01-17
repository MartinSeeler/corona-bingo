import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDatabase,
  useDatabaseListData,
  useDatabaseObjectData,
  useUser,
} from "reactfire";
import LoadingSpinner from "../components/loading.component";
import BingoSheet from "../components/bingo-sheet.component";
import EnemyGameView from "../components/enemy-game.component";
import ShareComponent from "../components/share-game.component";
import JoinGame from "../components/join-game.component";

const GameView: React.FunctionComponent = () => {
  const { data: user } = useUser();
  const { gameId } = useParams<{ gameId: string }>();
  const database = useDatabase();
  const ref = database.ref(`/games/${gameId}`);
  const { status, data, hasEmitted } = useDatabaseObjectData<any>(ref);

  const [otherPlayers, setOtherPlayers] = useState<string[]>([]);

  const playersRef = database.ref(`/games/${gameId}/players`);
  const { data: players } = useDatabaseListData<{ completed: number[] }>(
    playersRef
  );

  useEffect(() => {
    hasEmitted &&
      setOtherPlayers(
        Object.entries(data.players)
          .filter(([k]) => k !== user.uid)
          .map(([k]) => k)
      );
  }, [user, data, setOtherPlayers, hasEmitted]);

  useEffect(() => {
    console.log("OtherPlayers now", players);
  }, [players]);

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
              <BingoSheet gameId={gameId} userId={user.uid} />
              <ShareComponent />
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
