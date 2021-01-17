import React, { useEffect, useState } from "react";
import BingoCell from "./bingo-cell.component";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { usePlayerName } from "./use-player-name.hook";

const BingoSheet: React.FunctionComponent<{
  gameId: string;
  userId: string;
  readOnly?: boolean;
}> = ({ gameId, userId, readOnly = false }) => {
  const [username] = usePlayerName(userId);
  const database = useDatabase();
  const ref = database.ref(`/games/${gameId}/players/${userId}`);
  const { data } = useDatabaseObjectData<any>(ref);
  const [completed, setCompleted] = useState<number[]>([]);
  const [words, setWords] = useState<string[]>([]);
  useEffect(() => {
    setWords(data.words.split(";"));
    setCompleted(
      data.completed
        ? data.completed.split(";").map((x: string) => parseInt(x))
        : []
    );
  }, [data]);
  const markChecked = (idx: number) => {
    ref.child("completed").set([...completed, idx].join(";"));
  };
  return (
    <div className="py-3 no-select">
      <div className="container text-center">
        <h2 className="jumbotron-heading">{username}</h2>
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
