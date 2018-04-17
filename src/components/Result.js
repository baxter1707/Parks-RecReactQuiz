import React from 'react';

  function Result(props) {
    return (
      <div className="result">
        You are <strong>{props.quizResult}</strong>!
        <img src = {`${props.quizResultImage}`} />
      </div>
    );
  }

  export default Result;
