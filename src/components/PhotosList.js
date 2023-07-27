import React from "react";
import PhotosListItems from "./PhotosListItems";
import { useGetPhotosQuery, useAddPhotoMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

const PhotosList = ({ album }) => {
    const { data,error,isLoading}=useGetPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();
  const handleAddPhoto = () => {
    addPhoto(album);
  };
  let content;
  if (isLoading) {
    content = <Skeleton className="h-8 w-8" times={2} />;
  } else if (error) {
    content = <div>Error adding photos</div>;
  } else {
    content = data.map((photo) => <PhotosListItems key={photo.id} photo={photo} />);
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photo In {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto} className="bg-[#F7FFE5]">
          Add Photo
              </Button></div>
             <div className="mx-8 flex flex-row flex-wrap justify-center bg-[#F7FFE5]">{content}</div> 
      
    </div>
  );
};

export default PhotosList;
