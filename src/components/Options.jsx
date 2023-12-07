/* eslint-disable react/prop-types */
export default function Options({ questions, answer, dispatch }) {
  const hasAnswered = answer !== null;

  // helper function
  function className(i) {
    return `btn btn-option ${i === answer ? "answer" : ""} ${
      hasAnswered ? (i === questions.correctOption ? "correct" : "wrong") : ""
    }`;
  }

  // onClick
  function handleClick(i) {
    dispatch({
      type: "newAnswer",
      payload: i,
    });
  }

  return (
    <div className="options">
      {questions.options.map((option, i) => (
        <button
          className={className(i)}
          key={option}
          disabled={hasAnswered}
          onClick={() => handleClick(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
