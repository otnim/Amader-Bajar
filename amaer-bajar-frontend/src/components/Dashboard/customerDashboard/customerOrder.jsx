import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Redirect } from "react-router";
import { getCurrentUser } from "../../../services/authService";
import { getOrderByCustomerId } from "../../../services/orderServices";
import CustomerOrderTable from "./customerOrderTable";

const CustomerOrder = () => {
  const user = getCurrentUser();
  const [orders, setOrders] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "productName",
    order: "asc",
  });

  const customerId = user._id;
  useEffect(() => {
    async function getData() {
      const { data: loadedOrders } = await getOrderByCustomerId(customerId);
      setOrders(loadedOrders);
    }
    getData();
  }, [customerId]);
  console.log(orders);

  const sortedOrders = _.orderBy(orders, [sortColumn.path], [sortColumn.order]);
  
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const isCustomer = user && user.userType === "customer";
  if (!isCustomer) return <Redirect to="/login" />;

  return (
    <div>
      <h1>Customer Total Orders {orders.length}</h1>

      <CustomerOrderTable
        orders={sortedOrders}
        onSort={handleSort}
        sortColumn={sortColumn}
      />
    </div>
  );
};

export default CustomerOrder;
