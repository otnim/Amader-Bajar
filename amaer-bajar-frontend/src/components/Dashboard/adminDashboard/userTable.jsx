import React from "react";
import Table from "../../common/table";

const UserTable = ({ users, onSelect, sortColumn, onSort }) => {
  const columns = [
    { path: "name", label: "User Name" },
    { path: "email", label: "Email" },
    { path: "phone", label: "Phone" },
    { path: "_id", label: "User Id" },
    {
      key: "action",
      label: "User Type",
      content: (user) => (
        <select onChange={(e) => onSelect(e, user)} className="form-control">
          <option className="" value={user.userType}>
            {user.userType}
          </option>
          <option className="text-success" value="admin">
            Admin
          </option>
          <option className="text-warning" value="customer">
            Customer
          </option>
        </select>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      data={users}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default UserTable;
