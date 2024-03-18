import s from "./AllUsers.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { onValue, ref, remove } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import {
  setAllUsers,
  setDeletedItemId,
  setIsDelete,
  setSearchMode,
} from "../../redux/User/slice";
import FormSelect from "../FormSelect/FormSelect";
import UserCard from "../UserCard/UserCard";
import Button from "@mui/material/Button";
import AppInput from "../app/app-input";
import Popup from "../../Popup/Popup";
import DeleteItem from "../DeleteItem/DeleteItem";

const AllUsers = () => {
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const { allUsers } = useSelector((state) => state.user);
  const { isDelete } = useSelector((state) => state.user);
  const { deletedItemId } = useSelector((state) => state.user);
  const { userId } = useSelector((state) => state.user);
  const { searchMode } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [profs, setProfs] = useState([]);
  const [mode, setMode] = useState(false);
  const [count, setCount] = useState(0);

  const { filterId } = useParams();

  useEffect(() => {
    setCount(4);
  }, []);
  const handleDelete = (id) => {
    dispatch(setIsDelete(true));
    dispatch(setDeletedItemId(id));
  };

  useEffect(() => {
    if (mode) {
      const dataRef = ref(db, "/users");
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        const allUsers1 = Object.values(data);
        if (data != null) {
          const keys = Object.keys(data);
          for (let i = 0; i < allUsers1.length; i++) {
            allUsers1[i].id = keys[i];
          }
          dispatch(setAllUsers(allUsers1));
          setFilteredUsers(allUsers);
          setMode(false);
        }
      });
    }
  }, [mode]);

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  useEffect(() => {
    const data = allUsers
      .filter((user) => user.id != userId)
      .map((user) => {
        return user.prof.toLowerCase();
      });

    const data1 = [...new Set(data)];
    const data2 = [];

    for (let i = 0; i < data1.length; i++) {
      const result = capitalizeFirstLetter(data1[i]);
      data2.push({ name: `${result}`, value: `${data1[i]}` });
    }
    data2.unshift({ name: "Show All", value: "" });
    setProfs(data2);
  }, [allUsers]);

  useEffect(() => {
    if (filterId) {
      const newData = allUsers.filter(
        (user) => user.prof.toLowerCase() === filterId,
      );
      const newData1 = newData.filter(({ id }) => id != userId);
      setFilteredUsers(newData1);
    } else if (!filterId) {
      const data = allUsers.filter((user) => user.id != userId);
      setFilteredUsers(data);
    }
  }, [filterId]);

  useEffect(() => {
    setFilteredUsers(allUsers.filter((user) => user.id != userId));
  }, [allUsers]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    navigate(`/allUsers/${nextFilter}`);
  };

  const configFilters = {
    defaultValue: filterId,
    options: [...profs],
    handleChange: handleFilter,
  };
  const handleChangingSearch = (e) => {
    setSearchItem(e.target.value);
    searchItem.length < 2 && dispatch(setSearchMode(false));
    searchItem.length >= 2 && dispatch(setSearchMode(true));
  };

  useEffect(() => {
    if (searchItem.length <= 2) {
      setSearchedUsers([]);
    } else {
      const data = allUsers.filter(({ prof }) =>
        prof.toLowerCase().trim().includes(searchItem.toLowerCase().trim()),
      );
      const data1 = allUsers.filter(({ name }) =>
        name.toLowerCase().trim().includes(searchItem.toLowerCase().trim()),
      );
      const data2 = allUsers.filter(({ surname }) =>
        surname.toLowerCase().trim().includes(searchItem.toLowerCase().trim()),
      );
      const dataAll = [...data, ...data1, ...data2];
      setSearchedUsers([...new Set(dataAll)]);
    }
  }, [searchItem.length]);

  useEffect(() => {
    setCount(4);
  }, [filterId]);

  useEffect(() => {
    setCount(4);
  }, [searchMode]);

  const loadMore = () => {
    setCount((count) => count + 4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClick1 = () => {
    dispatch(setIsDelete(false));
  };

  const handleClick2 = () => {
    dispatch(setIsDelete(false));
    remove(ref(db, "users/" + deletedItemId))
      .then(() => {})
      .catch(() => {});
    setMode(true);
  };

  return (
    <>
      {!isDelete && (
        <div className={s.boxAll}>
          <div className={s.boxSearch}>
            <FormSelect {...configFilters} />
            <div className={s.search}>
              <label style={{ color: "gray" }}> Search for a user </label>
              <AppInput
                type={"text"}
                placeholder={"Search"}
                label={"Search"}
                value={searchItem}
                handleChange={handleChangingSearch}
              />
            </div>
          </div>

          {!searchMode && (
            <>
              <div className={s.box}>
                {filteredUsers?.map((user, index) => {
                  if (index <= count - 1) {
                    return (
                      <>
                        <div key={user.id} className={s.card}>
                          <UserCard
                            imageUrl={user?.imageUrl}
                            name={user?.name}
                            surname={user?.surname}
                            prof={user?.prof}
                          />

                          <div className={s.buttonBox}>
                            <Button
                              margin="dense"
                              size="small"
                              onClick={() => navigate(`/editUser/${user.id}`)}
                              variant="contained"
                            >
                              {" "}
                              Edit
                            </Button>
                            <Button
                              margin="dense"
                              onClick={() => handleDelete(user.id)}
                              size="small"
                              variant="contained"
                            >
                              {" "}
                              Delete
                            </Button>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </div>

              {count < filteredUsers?.length && (
                <Button
                  margin="dense"
                  size="small"
                  onClick={loadMore}
                  variant="contained"
                  className={s.loadMore}
                >
                  {" "}
                  Load More
                </Button>
              )}
            </>
          )}

          {searchMode && (
            <>
              <div className={s.box}>
                {/*{searchedUsers && mode && "No such users"}*/}
                {searchedUsers?.map((user, index) => {
                  if (index <= count - 1) {
                    return (
                      <div key={user.id} className={s.card}>
                        <UserCard
                          imageUrl={user.imageUrl}
                          name={user.name}
                          surname={user.surname}
                          prof={user.prof}
                        />
                        <div className={s.buttonBox}>
                          <Button
                            margin="dense"
                            size="small"
                            onClick={() => navigate(`/editUser/${user.id}`)}
                            variant="contained"
                          >
                            {" "}
                            Edit
                          </Button>
                          <Button
                            margin="dense"
                            onClick={() => handleDelete(user.id)}
                            size="small"
                            variant="contained"
                          >
                            {" "}
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              {count < searchedUsers?.length && (
                <Button
                  margin="dense"
                  size="small"
                  onClick={loadMore}
                  variant="contained"
                  className={s.loadMore}
                >
                  {" "}
                  Load More
                </Button>
              )}
            </>
          )}
        </div>
      )}
      {isDelete && (
        <Popup mode={isDelete}>
          <DeleteItem handleClick1={handleClick1} handleClick2={handleClick2} />
        </Popup>
      )}
    </>
  );
};
export default AllUsers;
