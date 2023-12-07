/* eslint-disable react/prop-types */
export default function NextButton({ dispatch }) {
  // onClick
  function handleClick() {
    dispatch({
      type: "next",
    });
  }

  return (
    <div className="next-btn-container">
      <button className="btn" onClick={() => handleClick()}>
        Next
      </button>
    </div>
  );
}
