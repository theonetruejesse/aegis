import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import {db} from "../firebase";

const UploadButton = (props) => {
  const [pictures, setPictures] = useState([]);

  const onDrop = picture => {
    setPictures([...pictures, picture]);
		db.collection("posts").doc(props.id).update({picture: pictures[0]})
  };
  return (
    <ImageUploader
      {...props}
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpeg", ".jpg", ".png", ".gif"]}
      maxFileSize={5242880}
    />
  );
};

export default UploadButton;