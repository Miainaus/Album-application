import { useGetAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItems from "./AlbumsListItems";

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useGetAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
      addAlbum(user);
      console.log(results)
  };
  let content;
  if (isLoading) {
    content = <Skeleton times={2} />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    content = data.map((album) => <AlbumsListItems key={album.id} album={album} />);
  }

  return (
    <div >
      <div className="m-2 flex flex-row items-center justify-between bg-[#AAC8A7]">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button onClick={handleAddAlbum} loading={isLoading} className="bg-[#C3EDC0]">Add Album</Button>
      </div>
      <div className="bg-[#C3EDC0]">{content}</div>
    </div>
  );
}

export default AlbumsList;
