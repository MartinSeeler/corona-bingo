import React, {useState} from 'react';
import words from './words';
import './app.scss';

function App() {
  const [wordsToUse] = useState<string[]>(() => {
    const shuffled = words.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 16).map(xs => xs.sort(() => 0.5 - Math.random())[0]);
    console.log(selected)
    return selected;
  });
  return (
    <div className="container">
      <div className="row">
        {wordsToUse.map((word: string, idx: number) => <div key={`cell-${idx}`}
                                                            className={"col-3 bingo-box text-center d-flex justify-content-center align-items-center" + (idx === 3 ? " checked" : "")}
                                                            dangerouslySetInnerHTML={{__html: word}}/>
        )}
      </div>

    </div>
  );
}

export default App;
