import React from "react";
import Table from "../common/table";

const OrdersTable = ({ orders, onSelect, sortColumn, onSort }) => {
  const columns = [
    { path: "productName", label: "Product Name" },
    { path: "_id", label: "OrderId" },
    { path: "quantity", label: "Quantity" },
    { path: "orderDate", label: "OrderDate" },
    { path: "paymentInfo.deliveryAddress", label: "Delivery Address" },
    { path: "customerPhone", label: "Phone" },
    {
      key: "action",
      label: "Change Delivery Status",
      content: (order) => (
        <select onChange={(e) => onSelect(e, order)} className="form-control">
          <option className="" value={order.orderStatus}>{order.orderStatus}</option>
          <option className="text-success" value="Done">
            Done
          </option>
          <option className="text-warning" value="On Going">
            On Going
          </option>
          <option className="text-danger" value="Pending">
            Pending
          </option>
        </select>
      ),
    },
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

export default OrdersTable;
