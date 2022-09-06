import { format } from "date-fns";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { calculateDaysSinceLast } from "../utils/Utils";

const URL =
  "https://plants-7b455-default-rtdb.asia-southeast1.firebasedatabase.app";
// const daysSinceLast = differenceInCalendarDays(new Date());

export const addNewPlant = async (plantData) => {
  const response = await fetch(`${URL}/plants.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plantData),
  });

  if (!response.ok) {
    throw new Error("Unable to add plant");
  }

  console.log("adding plants to firebase...");

  const postData = await response.json();

  const { name: firebaseKey } = postData;

  const patchResponse = await fetch(`${URL}/plants/${firebaseKey}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firebaseKey: firebaseKey }),
  });

  if (!patchResponse.ok) {
    throw new Error("Unable to PATCH plant");
  }

  const patchdata = await patchResponse.json();

  return;
};

export const refreshPlantData = async () => {
  console.log("refresh api ran");
  // 1. GET CURRENT DATA
  const getResponse = await fetch(`${URL}/plants.json`);
  if (!getResponse.ok) {
    throw new Error("Unable to get plants");
  }
  const data = await getResponse.json();

  let plantsList = [];

  for (let key in data) {
    const { daysSinceLast, frequency, id, lastWatered, name } = data[key];
    plantsList.push({
      id,
      name,
      lastWatered,
      daysSinceLast,
      frequency,
      firebaseKey: key,
    });
  }
  // 1. RECALCULATE DAYS SINCE LAST WATERED
  const updatedPlantsList = plantsList.map((plant) => {
    return {
      ...plant,
      daysSinceLast: calculateDaysSinceLast(plant.lastWatered),
    };
  });

  let formattedPlantList = {};

  for (let plant of updatedPlantsList) {
    formattedPlantList[plant.firebaseKey] = plant;
  }

  console.log(formattedPlantList);
  // 2. PATCH UPDATED DATA
  const patchResponse = await fetch(`${URL}/plants.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedPlantList),
  });

  if (!patchResponse.ok) {
    console.log("Unable to patch plants");
    throw new Error("Unable to patch plants");
  }
  return updatedPlantsList;
};

export const getAllPlants = async (plantData) => {
  const response = await fetch(`${URL}/plants.json`);
  if (!response.ok) {
    throw new Error("Unable to add plant");
  }
  const data = await response.json();
  console.log("Get all plants:");
  console.log(data);

  let allPlants = [];

  for (let key in data) {
    const { daysSinceLast, frequency, id, lastWatered, name } = data[key];
    allPlants.push({
      id,
      name,
      lastWatered,
      daysSinceLast,
      frequency,
    });
  }
  console.log(allPlants);
  return allPlants;
};

export const getSinglePlant = async (id) => {
  const response = await fetch(`${URL}/plants.json`);
  if (!response.ok) {
    throw new Error("Unable to get plant");
  }
  const data = await response.json();
  console.log(data);

  let allPlants = [];
  for (let key in data) {
    allPlants.push(data[key]);
  }
  const selectedPlant = allPlants.find((plant) => plant.id === id);

  return selectedPlant;
};

export const updateSinglePlant = async (plantData) => {
  const getResponse = await fetch(`${URL}/plants.json`);
  if (!getResponse.ok) {
    throw new Error("Unable to get plant");
  }
  const data = await getResponse.json();

  let allPlants = [];
  for (let key in data) {
    allPlants.push({ ...data[key], fireBaseId: key });
  }

  const fireBaseId = allPlants.find(
    (item) => item.id === plantData.id
  ).fireBaseId;

  const patchResponse = await fetch(`${URL}/plants/${fireBaseId}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plantData),
  });

  const patchData = await patchResponse.json();

  console.log("Get patched plants:");
  console.log(patchData);

  return allPlants;
};

export const updateLastWateredToToday = async (plantId) => {
  const getResponse = await fetch(`${URL}/plants.json`);
  if (!getResponse.ok) {
    throw new Error("Unable to get plant");
  }
  const data = await getResponse.json();

  let allPlants = [];
  for (let key in data) {
    allPlants.push({ ...data[key], fireBaseId: key });
  }

  const fireBaseId = allPlants.find((item) => item.id === plantId).fireBaseId;

  const patchResponse = await fetch(`${URL}/plants/${fireBaseId}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lastWatered: format(new Date(), "yyyy-MM-dd"),
      daysSinceLast: 0,
    }),
  });

  const patchData = await patchResponse.json();

  console.log("Get patched plants:");
  console.log(patchData);

  return allPlants;
};
