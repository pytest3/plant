import "./App.css";
import PlantDetail from "./components/pages/PlantDetail";
import Plants from "./components/pages/Plants";
import NewPlantForm from "./components/pages/NewPlantForm";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { sendPlantData } from "./store/plants-actions";

function App() {
  const plants = useSelector((state) => state.plants);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("ran");
    dispatch(sendPlantData(plants));
  }, [dispatch, plants]);

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
