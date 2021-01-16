import React, { useEffect, useState } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { usePlayerName } from "./use-player-name.hook";

type CreateGameFormData = {
  newPlayerName: string;
};

const CreateGame: React.FunctionComponent<{}> = () => {
  const app = useFirebaseApp();
  const { data: user } = useUser();
  const { push } = useHistory();
  const [playerName, changePlayerName] = usePlayerName(user.uid);
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setValue,
  } = useForm<CreateGameFormData>({
    defaultValues: {
      newPlayerName: playerName,
    },
  });
  useEffect(() => {
    setValue("newPlayerName", playerName);
  }, [playerName, setValue]);
  const [isStarting, setIsStarting] = useState(false);
  const onSubmit = handleSubmit(({ newPlayerName }) => {
    setIsStarting(true);
    changePlayerName(newPlayerName).then(() =>
      app
        .functions("europe-west3")
        .httpsCallable("onCreateGame")()
        .then(
          (e) => {
            setIsStarting(false);
            push(`/${e.data.game}`);
          },
          (e) => console.log("err", e)
        )
    );
  });
  return (
    <section className="jumbotron">
      <div className="container text-center">
        <h1 className="jumbotron-heading">Neues Spiel</h1>
        <p className="lead text-muted">
          Erstelle ein neues Corona-Bingo Spiel und spiele allein oder gegen
          deine Freunde.
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
              disabled={formState.isSubmitting || isStarting}
            >
              {isStarting ? "Spiel wird erstellt..." : "Spiel starten"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateGame;
