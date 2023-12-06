import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
};

// REDUCER
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "failed" };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status } = state;

  useEffect(() => {
    fetch(`http://localhost:3000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  console.log(questions, status);

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
