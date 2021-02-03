import React, { useEffect, useState } from "react";
import { useUser } from "reactfire";
import { Game } from "../types";
import { toast } from "react-toastify";
import PlayerJoinedMessage from "../components/notifications/player-joined.component";
import ShareComponent from "../components/share-game.component";
import BingoSheet from "../components/bingo-sheet.component";
import JoinGame from "../components/join-game.component";
import EnemyGameView from "../components/enemy-game.component";

const GameExistingView: React.FunctionComponent<{
  gameId: string;
  game: Game;
}> = ({ gameId, game }) => {
  const { data: user } = useUser();

  const [otherPlayers, setOtherPlayers] = useState<string[]>(
    Object.entries(game.players)
      .filter(([k]) => k !== user.uid)
      .map(([k]) => k)
  );

  useEffect(() => {
    setOtherPlayers((oldOtherPlayers) => {
      const newOtherPlayers = Object.entries(game.players)
        .filter(([k]) => k !== user.uid)
        .map(([k]) => k);
      newOtherPlayers
        .filter((x) => !oldOtherPlayers.includes(x))
        .forEach((uid) => {
          toast.dark(<PlayerJoinedMessage userId={uid} />, {
            toastId: `joined-${uid}`,
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      return newOtherPlayers;
    });
  }, [user, game, setOtherPlayers]);

  return (
    <>
      {user.uid in game.players ? (
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
  );
};

export default GameExistingView;
