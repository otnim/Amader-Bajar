import React from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

const ProductsTable = ({ products, onDelete, sortColumn, onSort }) => {
  const columns = [
    { path: "name", label: "Name" },
    { path: "category.name", label: "Category" },
    { path: "numberInStock", label: "Stock" },
    { path: "price", label: "Price (Tk)" },
    {
      key: "edit",
      label: "Edit",
      content: (product) => (
        <Link
          className="btn btn-success btn-sm"
          to={`/admin/product/${product._id}`}
        >
          Edit
        </Link>
      ),
    },
    {
      key: "action",
      label: "Action",
      content: (product) => (
        <button
          onClick={() => onDelete(product)}
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
      data={products}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default ProductsTable;
