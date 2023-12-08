/* eslint-disable react/prop-types */
export default function Finished({ points, questions, highScore, dispatch }) {
  const totalPoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  const percentage = Math.ceil((points / totalPoints) * 100);

  // onClick - restart quiz
  function handleRestart() {
    dispatch({ type: "restartQuiz" });
  }

  const emoji = percentage <= 60 ? "🤦" : "👏";

  return (
    <div>
      <p className="result">
        {emoji} You scored <strong>{points} </strong> out of{" "}
        <strong>{totalPoints}</strong> ({percentage})%
      </p>
      <p className="highscore">Highscore: {highScore}</p>

      <button className="btn btn-restart" onClick={handleRestart}>
        Restart Quiz
      </button>
    </div>
  );
}
