import Options from "./Options";

/* eslint-disable react/prop-types */
export default function Questions({ questions, answer, dispatch, index }) {
  return (
    <div>
      <h4>{questions.question}</h4>

      <Options
        questions={questions}
        dispatch={dispatch}
        answer={answer}
        index={index}
      />

      {answer !== null && (
        <div>
          <button
            className="btn"
            onClick={() =>
              dispatch({
                type: "next",
                payload: { index: index + 1, answer: null },
              })
            }
          >
            next
          </button>
        </div>
      )}
    </div>
  );
}
