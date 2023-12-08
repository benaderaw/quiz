import NextButton from "./NextButton";
import Options from "./Options";

/* eslint-disable react/prop-types */
export default function Questions({
  question,
  answer,
  dispatch,
  index,
  questions,
}) {
  return (
    <div>
      <h4>{question.question}</h4>

      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        index={index}
      />

      <NextButton
        dispatch={dispatch}
        answer={answer}
        questions={questions}
        index={index}
      />
    </div>
  );
}
