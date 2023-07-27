import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import { removeUser } from "../store";
import { RiDeleteBin5Line } from "react-icons/ri";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

const UsersListItems = ({ user }) => {
  const [runThunkRemove, isRemovingUser, RemovingError] = useThunk(removeUser);
  const handleUserRemove = () => {
    runThunkRemove(user);
  };
  const header = (
    <>
      <Button
        className="mr-3"
        onClick={handleUserRemove}
        loading={isRemovingUser}
      >
        <RiDeleteBin5Line />
      </Button>
      {user.name}
      {RemovingError && <div>Removing Error!</div>}
    </>
  );
  return (
    <ExpandablePanel header={header}>
          <AlbumsList user={ user} />
    </ExpandablePanel>
  );
};

export default UsersListItems;
