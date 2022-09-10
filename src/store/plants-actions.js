const URL =
  "https://allplants-b080e-default-rtdb.asia-southeast1.firebasedatabase.app/plants.json";

export const sendPlantData = (plantData) => {
  const sendData = async () => {
    const response = await fetch(URL, {
      method: "PUT",
      body: JSON.stringify(plantData),
    });
    if (!response.ok) {
      throw new Error("Cannot send data");
    }
    const data = await response.json();
  };
  try {
    sendData();
  } catch (e) {}
};
