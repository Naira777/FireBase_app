import React from "react";
import { useSelector } from "react-redux";
import UserSettings from "../UserSettings/UserSettings";

const EditSettings = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <UserSettings
        userName={userInfo?.name}
        userSurname={userInfo?.surname}
        userPhoto={userInfo?.imageUrl}
        userProf={userInfo?.prof}
        activeUserId={userInfo?.id}
        userEmail={userInfo?.email}
        url={"/dashboard"}
      />
    </>
  );
};
export default EditSettings;
