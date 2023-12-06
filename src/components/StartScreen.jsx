export default function StartScreen({ questionsLength }) {
  return (
    <div className="start-container">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questionsLength} questions to test your React mastery</h3>
      <div className="btn-container">
        <button className="btn btn-ui">Let's Start</button>
      </div>
    </div>
  );
}
