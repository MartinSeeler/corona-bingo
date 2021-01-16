import React from "react";
import BingoSheet from "./bingo-sheet.component";
import { usePlayerName } from "./use-player-name.hook";

const EnemyGameView: React.FunctionComponent<{
  gameId: string;
  userId: string;
}> = ({ gameId, userId }) => {
  const [playerName] = usePlayerName(userId);
  return (
    <div>
      <h3>Wörter von {playerName}</h3>
      <BingoSheet gameId={gameId} userId={userId} readOnly />
    </div>
  );
};

export default EnemyGameView;
