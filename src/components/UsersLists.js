import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUser, addUser} from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { useThunk } from "../hooks/use-thunk";
import UsersListItems from "./UsersListItems";

const UsersLists = () => {
  const [runThunkFetch, isUserLoading, userLoadingError] = useThunk(fetchUser);
  const [runThunkAdd, isCreatingUser, creatingError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });
  useEffect(() => {
    runThunkFetch();
  }, [runThunkFetch]);

  const handleUserAdd = () => {
    runThunkAdd();
  };
  let content;
  if (isUserLoading) {
    content = <Skeleton times={20} className="h-10 w-full" />;
  } else if (userLoadingError) {
    content = <div>Error</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItems key={user.id} user={user} />;
    });
  }
  return (
    <div className="bg-[#AAC8A7]">
      <div className="flex flex-row justify-between m-2">
        <h1 className="m-2 text-xl font-mono ">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd} className="bg-[#85A389]">
          + Add user
        </Button>
        {creatingError && "Error"}
      </div>
      {content}
    </div>
  );
};

export default UsersLists;
