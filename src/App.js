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
import { storage } from "./firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { useState } from "react";
import Photos from "./components/pages/Photos";

let initialRun = true;

function App() {
  const plants = useSelector((state) => state.plants.allPlants);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    dispatch(getPlantData());
    console.log("here");
  }, [dispatch]);

  useEffect(() => {
    // listAll returns a refrence object
    // {items: [array of photos' reference], prefixes: [array of photos' prefix]}
    const getPhotoData = async () => {
      const { items: photoItems } = await listAll(imageListRef);
      const photoUrls = await Promise.all(
        photoItems.map(async (item) => await getDownloadURL(item))
      );
      const photoIds = await Promise.all(
        photoItems.map((item) =>
          getMetadata(item).then((metaData) => metaData.name)
        )
      );
      const photoList = photoUrls.map((url, index) => {
        return { id: photoIds[index], url };
      });
      setImageList(photoList);
    };
    getPhotoData();
  }, [imageListRef]);

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
        <Route path="/photos" element={<Photos images={imageList} />}></Route>;
        <Route path="/plants/:plantId" element={<PlantDetail />}></Route>
        <Route path="/new-plant" element={<NewPlantForm />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
