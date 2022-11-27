import React from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

const CategoryTable = ({ categories, onDelete, sortColumn, onSort }) => {
  const columns = [
    { path: "name", label: "Category Name" },
    {
      key: "edit",
      label: "Edit",
      content: (category) => (
        <Link
          className="btn btn-success btn-sm"
          to={`/admin/category/${category._id}`}
        >
          Edit
        </Link>
      ),
    },
    {
      key: "action",
      label: "Action",
      content: (category) => (
        <button
          onClick={() => onDelete(category)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      data={categories}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default CategoryTable;
