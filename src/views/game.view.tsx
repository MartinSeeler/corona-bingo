import React from "react";
import {
  SuspenseWithPerf,
  useDatabase,
  useDatabaseObjectData,
} from "reactfire";
import { Game } from "../types";
import LoadingSpinner from "../components/loading.component";
import { useParams } from "react-router-dom";
import GameExistingView from "./game-existing.view";
import GameMissingView from "./game-missing.view";

const GameView: React.FunctionComponent = () => {
  const database = useDatabase();
  const { gameId } = useParams<{ gameId: string }>();
  const ref = database.ref(`/games/${gameId}`);
  const { data } = useDatabaseObjectData<Game>(ref);

  return (
    <SuspenseWithPerf
      fallback={<LoadingSpinner text={"Spiel wird geladen"} />}
      traceId="load-game"
    >
      {Object.keys(data).length > 1 ? (
        <GameExistingView gameId={gameId} game={data} />
      ) : (
        <GameMissingView />
      )}
    </SuspenseWithPerf>
  );
};

export default GameView;
