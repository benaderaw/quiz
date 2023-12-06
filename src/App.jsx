import "./App.css";
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

const initialState = {
  questions: [],
  status: "loading", // loading, error*, ready*, active, finished
  index: 0,
  answer: null,
  score: 0,
};

// REDUCER
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "next":
      return { ...state, ...action.payload };
    case "newAnswer":
      return { ...state, answer: action.payload };
    default:
      throw new Error("Action Unknown");
  }
}

//
function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  console.log("answer", answer);
  console.log("index", index);

  useEffect(() => {
    fetch(`http://localhost:3000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

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
          <Questions
            index={index}
            questions={questions.at(index)}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
