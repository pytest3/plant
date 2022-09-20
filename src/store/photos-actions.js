import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { useDispatch } from "react-redux";
import { storage } from "../firebase";
import { refreshPhotos } from "./photos-slice";

export const downloadPhotoInfo = () => {
  return async (dispatch) => {
    const imageListRef = ref(storage, "images/");
    // listAll returns a refrence object
    // {items: [array of photos' reference], prefixes: [array of photos' prefix]}
    const { items: photoItems } = await listAll(imageListRef);
    const photoUrls = await Promise.all(
      photoItems.map(async (item) => await getDownloadURL(item))
    );
    const photoIds = await Promise.all(
      photoItems.map((item) =>
        getMetadata(item).then((metaData) => metaData.name)
      )
    );
    console.log(photoIds);
    const photoList = photoUrls.map((url, index) => {
      return { id: photoIds[index], url };
    });
    console.log(photoList);

    dispatch(refreshPhotos(photoList));
  };
};
