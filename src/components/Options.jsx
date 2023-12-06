/* eslint-disable react/prop-types */
export default function Options({ questions, index }) {
  return (
    <div className="options">
      {questions.options.map((option) => (
        <button className="btn btn-option" key={index}>
          {option}
        </button>
      ))}
    </div>
  );
}
