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
      return { ...state, index: action.payload };
    default:
      throw new Error("Action Unknown");
  }
}

//
function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
          />
        )}
      </Main>
    </div>
  );
}

export default App;
