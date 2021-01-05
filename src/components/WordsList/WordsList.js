import React from "react";
import './WordsList.css';


function WordsList(props) {
    const words = props.words;
    return (
        <div className='words-container'>
            {words.map((word, i) => (
                <div key={i} className="words">
                    <h4 className="bold">{word.original}</h4>
                    <p>
                        Correct: <span>{word.correct_count}</span>
                    </p>
                    <p>
                        Incorrect: <span>{word.incorrect_count}</span>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default WordsList;