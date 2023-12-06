import Options from "./Options";

/* eslint-disable react/prop-types */
export default function Questions({ questions, dispatch }) {
  return (
    <div>
      <h4>{questions.question}</h4>

      <Options questions={questions} />

      {/* <div>
        <button
          className="btn"
          onClick={() => dispatch({ type: "next", payload: index + 1 })}
        >
          next
        </button>
      </div> */}
    </div>
  );
}
