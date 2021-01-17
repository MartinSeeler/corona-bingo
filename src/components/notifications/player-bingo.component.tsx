import React from "react";
import { usePlayerName } from "../use-player-name.hook";

const PlayerBingoMessage: React.FunctionComponent<{ userId: string }> = ({
  userId,
}) => {
  const [username] = usePlayerName(userId);
  return (
    <div>
      <b>{username}</b> hat das erste <b>BINGO</b> geschafft!
    </div>
  );
};

export default PlayerBingoMessage;
