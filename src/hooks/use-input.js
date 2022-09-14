import { useState } from "react";

const useInput = (validateValue, optional = false) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = !optional
    ? validateValue(enteredValue)
    : enteredValue.length > 1
    ? validateValue(enteredValue)
    : true;
  const hasError = !valueIsValid && isTouched;

  const inputTouchHandler = (e) => {
    if (optional) {
      enteredValue.length > 0 && setIsTouched(true);
    } else {
      setIsTouched(true);
    }
    return;
  };

  const inputChangeHandler = (e) => {
    const input = e.target.value;
    setEnteredValue(input);
    return;
  };

  const resetInput = () => {
    setIsTouched(false);
    setEnteredValue("");
  };

  return {
    enteredValue,
    valueIsValid,
    hasError,
    inputTouchHandler,
    inputChangeHandler,
    resetInput,
  };
};

export default useInput;
