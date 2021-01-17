import React from "react";
import { usePlayerName } from "../use-player-name.hook";

const PlayerBingoBingoMessage: React.FunctionComponent<{ userId: string }> = ({
  userId,
}) => {
  const [username] = usePlayerName(userId);
  return (
    <div>
      <b>{username}</b> hat das alles getroffen! <b>BINGO BINGO</b>! 🎉🥳
    </div>
  );
};

export default PlayerBingoBingoMessage;
