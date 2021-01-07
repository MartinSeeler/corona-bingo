import React, {useState} from 'react';
import words from './words';
import './app.scss';

function App() {
  const [wordsToUse] = useState<string[]>(() => {
    const shuffled = words.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 9).map(xs => xs.sort(() => 0.5 - Math.random())[0]);
    console.log(selected)
    return selected;
  });
  const [completed, setCompleted] = useState<boolean[]>(() => {
    return Array(9).fill(false)
  })
  const toggleIndex = (idx: number) => {
    setCompleted(oldCompleted => oldCompleted.map((v, i) => idx === i ? !v : v))
  }
  return (
    <div className="container">
      <div className="row">
        {wordsToUse.map((word: string, idx: number) => <div key={`cell-${idx}`}
                                                            onClick={() => toggleIndex(idx)}
                                                            className={"col-4 bingo-box text-center d-flex justify-content-center align-items-center" + (completed[idx] ? " checked" : "")}
                                                            dangerouslySetInnerHTML={{__html: word}}/>
        )}
      </div>

    </div>
  );
}

export default App;
