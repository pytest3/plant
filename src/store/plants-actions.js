import { sendNotification } from "./ui-slice";
import { refreshPlantList } from "./plants-slice";
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
    dispatch(sendNotification("pending"));
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
      const data = await response.json();
      return data;
    };
    dispatch(sendNotification("pending"));
    try {
      const plantData = await getData();
      dispatch(refreshPlantList({ allPlants: plantData.allPlants || [] }));
      dispatch(sendNotification("success"));
    } catch (e) {
      dispatch(sendNotification("error"));
    }
  };
};
