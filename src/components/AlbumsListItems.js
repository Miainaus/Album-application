import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDeleteAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

const AlbumsListItems = ({ album }) => {
    const [deleteAlbum,results] = useDeleteAlbumMutation();
    const handleRemoveAlbum = () => {
        deleteAlbum(album);
        console.log(results);
    }
  const header = (
    <>
      <Button className="mr-2" onClick={handleRemoveAlbum}>
        <RiDeleteBin5Line />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel header={header} key={album.id}>
      <PhotosList album={album}/> 
    </ExpandablePanel>
  );
};

export default AlbumsListItems;
