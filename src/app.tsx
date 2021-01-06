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
  return (
    <div className="container">
      <div className="row">
        {wordsToUse.map((word: string, idx: number) => <div key={`cell-${idx}`}
                                                            className="col-sm-4 col-sm-4 text-center d-flex justify-content-center align-items-center bingo-cell">
            {word}
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
