import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const uploadPhotoToFireBase = (photoFile, photoId) => {
  // in Firebase you must create a reference to the file you want to operate on
  // in order to upload/download files

  // create a reference to a location in the firebase cloud storage
  const photoRef = ref(storage, `images/${photoId}`);
  uploadBytes(photoRef, photoFile).then((snapshot) => console.log(snapshot));
};
