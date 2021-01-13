import React, { useState } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { usePlayerName } from "./use-player-name.hook";
import LoadingSpinner from "./loading.component";

const CreateGame: React.FunctionComponent<{}> = () => {
  const app = useFirebaseApp();
  const { data: user } = useUser();
  const { push } = useHistory();
  const [playerName, changePlayerName] = usePlayerName(user.uid);
  const { register, handleSubmit, watch, errors } = useForm();
  const [isStarting, setIsStartin] = useState(false);
  const onSubmit: ({ newPlayerName }: { newPlayerName: string }) => void = ({
    newPlayerName,
  }) => {
    setIsStartin(true);
    changePlayerName(newPlayerName).then(() =>
      app
        .functions("europe-west3")
        .httpsCallable("onCreateGame")()
        .then(
          (e) => {
            setIsStartin(false);
            push(`/${e.data.game}`);
          },
          (e) => console.log("err", e)
        )
    );
  };
  return (
    <>
      {isStarting && <LoadingSpinner />}
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
                Spiel starten
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateGame;
