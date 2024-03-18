import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserSettings from "../UserSettings/UserSettings";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const [activeUser, setActiveUser] = useState(undefined);
  const { allUsers } = useSelector((state) => state.user);
  const { filterId } = useParams();

  useEffect(() => {
    const editedUser = allUsers.find(({ id }) => id === filterId);
    setActiveUser(editedUser);
  }, [filterId]);

  return (
    <>
      {filterId && (
        <UserSettings
          userName={activeUser?.name}
          userSurname={activeUser?.surname}
          userPhoto={activeUser?.imageUrl}
          userProf={activeUser?.prof}
          activeUserId={activeUser?.id}
          userEmail={activeUser?.email}
          url={"/allUsers"}
        />
      )}
    </>
  );
};
export default EditUser;
