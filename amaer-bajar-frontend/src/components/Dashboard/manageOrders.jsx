import _ from "lodash";
import React, { useEffect, useState } from "react";
import { changeOrderStatus, getOrders } from "../../services/orderServices";
import OrdersTable from "./ordersTable";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "productName",
    order: "asc",
  });

  useEffect(() => {
    async function getData() {
      const { data: loadedOrders } = await getOrders();
      setOrders(loadedOrders);
    }
    getData();
  }, []);

  const sortedOrders = _.orderBy(orders, [sortColumn.path], [sortColumn.order]);

  const handleSelect = async (e, order) => {
    const currentStatus = e.target.value;
    const orderId = order._id;
    const result = await changeOrderStatus(orderId, currentStatus);
    // console.log(result.data);

    // console.log("status current ", currentStatus, "orderID ", orderId);
    // console.log("Option Selected", order);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  console.log(orders);
  return (
    <div>
      <h1>Total orders {orders.length}</h1>
      <OrdersTable
        orders={sortedOrders}
        onSelect={handleSelect}
        onSort={handleSort}
        sortColumn={sortColumn}
      />
    </div>
  );
};

export default ManageOrders;
