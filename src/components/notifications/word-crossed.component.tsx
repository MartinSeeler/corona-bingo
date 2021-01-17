import React from "react";
import { usePlayerName } from "../use-player-name.hook";

const WordCrossedMessage: React.FunctionComponent<{
  userId: string;
  word: string;
}> = ({ userId, word }) => {
  const [username] = usePlayerName(userId);
  return (
    <div>
      <b>{username}</b> hat gerade{" "}
      <b dangerouslySetInnerHTML={{ __html: word }} /> abgehakt!
    </div>
  );
};

export default WordCrossedMessage;
