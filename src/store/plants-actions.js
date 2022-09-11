import { sendNotification } from "./ui-slice";
const URL =
  "https://allplants-b080e-default-rtdb.asia-southeast1.firebasedatabase.app/plants.json";

export const sendPlantData = (plantData) => {
  return async function (dispatch) {
    const sendData = async () => {
      const response = await fetch(URL, {
        method: "PUT",
        body: JSON.stringify(plantData),
      });
      if (!response.ok) {
        throw new Error("Cannot send data");
      }
    };
    dispatch(sendNotification("sending"));
    console.log("here");
    try {
      await sendData();
      dispatch(sendNotification("success"));
    } catch (e) {
      dispatch(sendNotification("error"));
    }
  };
};

export const getPlantData = () => {
  return async function (dispatch) {
    const getData = async () => {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Fetching data failed..");
      }
    };
    dispatch(sendNotification("sending"));
    try {
      await getData();
      dispatch(sendNotification("success"));
    } catch (e) {
      dispatch(sendNotification("error"));
    }
  };
};
