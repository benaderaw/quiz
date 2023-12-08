import NextButton from "./NextButton";
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

      <NextButton dispatch={dispatch} answer={answer} />
    </div>
  );
}
