import "./App.css";
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import Progress from "./components/Progress";
import Finished from "./components/Finished";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading", // loading, error*, ready*, active, finished
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

// REDUCER
function reducer(state, action) {
  const newHighScore =
    state.points > state.highScore ? state.points : state.highScore;

  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "quizOver":
      return { ...state, status: "finished", highScore: newHighScore };
    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready", // loading, error*, ready*, active, finished
        highScore: state.highScore,
      };
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highScore: newHighScore,
      };
    }
    default:
      throw new Error("Action Unknown");
  }
}

// Component start
function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      restartQuiz,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`http://localhost:3000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, [restartQuiz]);

  // code

  // return
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsLength={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questions={questions}
              index={index}
              points={points}
              answer={answer}
            />
            <Questions
              index={index}
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
              questions={questions}
            />
          </>
        )}

        <Footer>
          {status === "active" && (
            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
          )}{" "}
          {status === "finished" && (
            <Finished
              questions={questions}
              points={points}
              highScore={highScore}
              dispatch={dispatch}
            />
          )}
        </Footer>
      </Main>
    </div>
  );
}

export default App;
