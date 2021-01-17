import React, { useEffect, useState } from "react";
import BingoCell from "./bingo-cell.component";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { usePlayerName } from "./use-player-name.hook";
import { GameSheet } from "../views/game.view";
import { toast } from "react-toastify";
import WordCrossedMessage from "./notifications/word-crossed.component";
import PlayerBingoMessage from "./notifications/player-bingo.component";

const parseCompleted: (completed: string) => number[] = (completed: string) =>
  completed ? completed.split(";").map((x: string) => parseInt(x)) : [];

const calcHasSimpleBingo: (completed: number[]) => boolean = (completed) => {
  return [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ].some((xs) => xs.every((x) => completed.includes(x)));
};

const BingoSheet: React.FunctionComponent<{
  gameId: string;
  userId: string;
  readOnly?: boolean;
}> = ({ gameId, userId, readOnly = false }) => {
  const [username] = usePlayerName(userId);
  const database = useDatabase();
  const ref = database.ref(`/games/${gameId}/players/${userId}`);
  const { data } = useDatabaseObjectData<GameSheet>(ref);
  const [completed, setCompleted] = useState<number[]>(() =>
    parseCompleted(data.completed || "")
  );

  const [hasSimpleBingo, sethasSimpleBingo] = useState(
    calcHasSimpleBingo(completed)
  );

  const [words, setWords] = useState<string[]>(() => data.words.split(";"));
  useEffect(() => {
    const newWords = data.words.split(";");
    setWords(newWords);
    setCompleted((oldCompleted) => {
      const newCompleted = parseCompleted(data.completed);
      newCompleted
        .filter((x) => !oldCompleted.includes(x))
        .forEach((id) => {
          readOnly &&
            toast.error(
              <WordCrossedMessage userId={userId} word={newWords[id]} />,
              {
                toastId: `crossed-${userId}-${id}`,
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
        });
      sethasSimpleBingo((oldHasSimpleBingo) => {
        const newSimpleBingo = calcHasSimpleBingo(newCompleted);
        if (!oldHasSimpleBingo && newSimpleBingo) {
          readOnly &&
            toast.success(<PlayerBingoMessage userId={userId} />, {
              toastId: `crossed-${userId}-${userId}`,
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }
        return newSimpleBingo;
      });
      return newCompleted;
    });
  }, [data, userId, readOnly, sethasSimpleBingo]);
  const markChecked = (idx: number) => {
    ref.child("completed").set([...completed, idx].join(";"));
  };

  return (
    <div className="py-3 no-select">
      <div className="container text-center">
        <h2 className="jumbotron-heading">
          {username}{" "}
          {hasSimpleBingo && <span className="badge bg-secondary">BINGO!</span>}
        </h2>
        <p className="lead text-muted">
          hat{" "}
          <b>
            {completed.length} von {words.length}
          </b>{" "}
          Wörtern getroffen.
        </p>
      </div>
      <div className="row">
        {words.map((word: string, idx: number) => (
          <BingoCell
            key={`cell-${idx}`}
            done={completed.includes(idx)}
            onDone={() => markChecked(idx)}
            word={word}
            readOnly={readOnly}
            extraClassName="col-4"
          />
        ))}
      </div>
    </div>
  );
};

export default BingoSheet;
