import React from "react";
import Table from "../../common/table";

const CustomerOrderTable = ({ orders, sortColumn, onSort }) => {
  const columns = [
    { path: "productName", label: "Product Name" },
    { path: "_id", label: "OrderId" },
    { path: "quantity", label: "Quantity" },
    { path: "pricePerUnit", label: "Unit Price (Tk)" },
    { path: "orderDate", label: "OrderDate" },
    { path: "orderStatus", label: "Order Status" },
    { path: "customerPhone", label: "Phone" },
  ];
  return (
    <Table
      columns={columns}
      data={orders}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default CustomerOrderTable;
