import React, { useEffect, useState } from "react";
import BingoCell from "./bingo-cell.component";
import { useDatabase, useDatabaseObjectData } from "reactfire";

const BingoSheet: React.FunctionComponent<{
  gameId: string;
  userId: string;
  readOnly?: boolean;
}> = ({ gameId, userId, readOnly = false }) => {
  const database = useDatabase();
  const ref = database.ref(`/games/${gameId}/players/${userId}`);
  const { status, data, hasEmitted } = useDatabaseObjectData<any>(ref);
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
  );
};

export default BingoSheet;
