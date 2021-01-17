import React from "react";
import { usePlayerName } from "../use-player-name.hook";

const PlayerJoinedMessage: React.FunctionComponent<{ userId: string }> = ({
  userId,
}) => {
  const [username] = usePlayerName(userId);
  return (
    <div>
      <b>{username}</b> ist gerade dem Spiel beigetreten!
    </div>
  );
};

export default PlayerJoinedMessage;
