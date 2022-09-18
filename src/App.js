import "./App.css";
import PlantDetail from "./components/pages/PlantDetail";
import Plants from "./components/pages/Plants";
import NewPlantForm from "./components/pages/NewPlantForm";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPlantData, sendPlantData } from "./store/plants-actions";
import LoadingSpinner from "./components/ui/LoadingSpinner";

let initialRun = true;

function App() {
  const plants = useSelector((state) => state.plants.allPlants);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(getPlantData());
  }, [dispatch]);

  useEffect(() => {
    if (initialRun) {
      initialRun = false;
      return;
    }
    dispatch(sendPlantData(plants));
    console.log("Parent app useEffect ran");
  }, [dispatch, plants]);

  if (notification.status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="*" element={<Navigate to="/plants" replace />}></Route>;
        <Route path="/plants" element={<Plants />}></Route>;
        <Route path="/plants/:plantId" element={<PlantDetail />}></Route>
        <Route path="/new-plant" element={<NewPlantForm />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
