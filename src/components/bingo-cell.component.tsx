import React from "react";

const BingoCell: React.FunctionComponent<{
  word: string;
  done: boolean;
  onDone: () => void;
  extraClassName: string;
  readOnly?: boolean;
}> = ({ word, done, onDone, extraClassName, readOnly = false }) => {
  return (
    <div
      onClick={() => !done && !readOnly && onDone()}
      className={`bingo-box text-center d-flex justify-content-center align-items-center ${
        done ? "checked" : ""
      } ${readOnly ? "readonly" : ""} ${extraClassName}`}
      dangerouslySetInnerHTML={{ __html: word }}
    />
  );
};

export default BingoCell;
