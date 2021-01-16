import React from "react";
import BingoSheet from "./bingo-sheet.component";

const EnemyGameView: React.FunctionComponent<{
  gameId: string;
  userId: string;
}> = ({ gameId, userId }) => {
  return <BingoSheet gameId={gameId} userId={userId} readOnly />;
};

export default EnemyGameView;
