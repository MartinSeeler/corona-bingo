import React, { useEffect, useState } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import { usePlayerName } from "./use-player-name.hook";
import { useForm } from "react-hook-form";

type JoinGameFormData = {
  newPlayerName: string;
};

const JoinGame: React.FunctionComponent<{ gameId: string }> = ({ gameId }) => {
  const app = useFirebaseApp();
  const { data: user } = useUser();
  const [playerName, changePlayerName] = usePlayerName(user.uid);
  const [isJoining, setIsJoining] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setValue,
  } = useForm<JoinGameFormData>({
    defaultValues: {
      newPlayerName: playerName,
    },
  });
  useEffect(() => {
    setValue("newPlayerName", playerName);
  }, [playerName, setValue]);
  const onSubmit = handleSubmit(({ newPlayerName }) => {
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
  });
  return (
    <section className="jumbotron">
      <div className="container text-center">
        <h1 className="jumbotron-heading">Mitspielen</h1>
        <p className="lead text-muted">
          Tritt diesem Spiel bei schlage deine Gegner!
        </p>
      </div>
      <div className="container py-3">
        <form onSubmit={onSubmit}>
          <div>
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${
                  errors.newPlayerName && "is-invalid"
                }`}
                id="playerNameInput"
                name="newPlayerName"
                ref={register({
                  required: "Bitte gib einen Spielernamen ein",
                  maxLength: {
                    value: 60,
                    message: "Bitte verwende einen kürzeren Namen",
                  },
                })}
                placeholder="Corona Gamer 3000"
              />
              <label htmlFor="playerNameInput">Dein Spielername</label>
            </div>
            <small className="text-danger">
              {errors.newPlayerName && errors.newPlayerName.message}
            </small>
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-lg btn-success my-2"
              disabled={formState.isSubmitting || isJoining}
            >
              {isJoining ? "Wird beigetreten..." : "Spiel beitreten"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JoinGame;
