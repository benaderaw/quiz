/* eslint-disable react/prop-types */
export default function NextButton({ questions, dispatch, answer, index }) {
  if (answer === null) return null;

  // onClick
  function handleClick() {
    if (index === questions.length - 1) {
      return dispatch({ type: "quizOver" });
    }

    dispatch({
      type: "next",
    });
  }

  return (
    <div className="next-btn-container">
      <button className="btn" onClick={() => handleClick()}>
        {index === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}
