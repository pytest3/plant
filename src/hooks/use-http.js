import { useReducer, useCallback } from "react";

const reducer = (state, action) => {
  if (action.type === "PENDING") {
    return {
      status: "pending",
      error: null,
      data: [],
    };
  } else if (action.type === "SUCCESS") {
    return {
      status: "success",
      error: null,
      data: action.data,
    };
  } else if (action.type === "ERROR") {
    return {
      status: "error",
      error: action.error,
      data: null,
    };
  }
};

const useHttp = () => {
  const [state, dispatch] = useReducer(reducer, {
    status: null,
    error: null,
    data: null,
  });

  const sendRequest = useCallback(async (requestType, requestData) => {
    dispatch({ type: "PENDING" });
    try {
      const data = await requestType(requestData);
      dispatch({ type: "SUCCESS", data });
    } catch (error) {
      dispatch({ type: "ERROR", error });
      console.log(error);
    }
  }, []);

  return { ...state, sendRequest };
};

export default useHttp;
