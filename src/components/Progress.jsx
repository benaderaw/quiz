/* eslint-disable react/prop-types */
export default function Progress({ questions, index, points, answer }) {
  const numOfQuestions = questions.length;

  const totalPoints = questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);

  console;

  return (
    <header className="progress">
      <progress max={numOfQuestions} value={Number(answer !== null) + index} />

      <p>
        Question <strong>{index + 1}</strong>/{numOfQuestions}
      </p>

      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}
