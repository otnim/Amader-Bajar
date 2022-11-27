import React, { useEffect, useState } from "react";
import _ from "lodash";
import { changeUserType, getUsers } from "../../../services/userService";
import UserTable from "./userTable";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "name",
    order: "asc",
  });

  useEffect(() => {
    async function getData() {
      const { data: loadedUsers } = await getUsers();
      setUsers(loadedUsers);
    }
    getData();
  }, []);
//   console.log(users);

  const sortedUsers = _.orderBy(users, [sortColumn.path], [sortColumn.order]);

  const handleSelect = async (e, user) => {
    const newUserType = e.target.value;
    const userId = user._id;
    const result = await changeUserType(userId, newUserType);
    console.log(result.data);

    console.log("newUserType ", newUserType, "orderID ", userId);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };
  return (
    <div>
      <h1>Total User {users.length}</h1>
      <UserTable
        users={sortedUsers}
        onSelect={handleSelect}
        onSort={handleSort}
        sortColumn={sortColumn}
      />
    </div>
  );
};

export default ManageUser;
