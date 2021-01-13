import React, { useState } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import { usePlayerName } from "./use-player-name.hook";
import { useForm } from "react-hook-form";
import LoadingSpinner from "./loading.component";

const JoinGame: React.FunctionComponent<{ gameId: string }> = ({ gameId }) => {
  const app = useFirebaseApp();
  const { data: user } = useUser();
  const [playerName, changePlayerName] = usePlayerName(user.uid);
  const { register, handleSubmit } = useForm();
  const [isJoining, setIsJoining] = useState(false);
  const onSubmit: ({ newPlayerName }: { newPlayerName: string }) => void = ({
    newPlayerName,
  }) => {
    setIsJoining(true);
    changePlayerName(newPlayerName).then(() =>
      app
        .functions("europe-west3")
        .httpsCallable("onJoinGame")({ game: gameId, token: "" })
        .then(
          () => {
            setIsJoining(false);
          },
          (e) => console.log("err", e)
        )
    );
  };
  return (
    <>
      {isJoining && <LoadingSpinner />}
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="playerNameInput" className="form-label">
                <b>Dein Spielername</b>
              </label>
              <input
                id="playerNameInput"
                name="newPlayerName"
                className="form-control form-control-lg"
                defaultValue={
                  typeof playerName === "string" ? playerName : undefined
                }
                ref={register({ required: true })}
                type="text"
                placeholder="Gib hier deinen Namen ein"
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-lg btn-info ">
                Spiel beitreten
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default JoinGame;
