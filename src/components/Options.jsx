/* eslint-disable react/prop-types */
export default function Options({ questions, answer, dispatch }) {
  const hasAnswered = answer !== null;

  function className(i) {
    return `btn btn-option ${i === answer ? "answer" : ""} ${
      hasAnswered ? (i === questions.correctOption ? "correct" : "wrong") : ""
    }`;
  }

  return (
    <div className="options">
      {questions.options.map((option, i) => (
        <button
          className={className(i)}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
