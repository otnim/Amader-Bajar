import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { getCurrentUser } from "../../../services/authService";
import NotFound from "../../shared/notFound";
import CustomerLeftNav from "./customerLeftNav";
import CustomerOrder from "./customerOrder";
import CustomerProfile from "./customerProfile";

const CustomerDashboard = () => {
  const user = getCurrentUser();
  const isCustomer = user && user.userType === "customer";
  if (!isCustomer) return <Redirect to="/not-found" />;
  return (
    <div className="row container-fluid">
      <div className="col-md-2">
        <CustomerLeftNav></CustomerLeftNav>
      </div>

      <div className="col-10">
        <Switch>
          <Route path="/customer/order">
            <CustomerOrder />
          </Route>
          <Route path="/customer/profile">
            <CustomerProfile />
          </Route>

          <Route exact path="/customer">
            <CustomerOrder />
          </Route>

          <Route path="/customer/">
            <Redirect to="/not-found" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default CustomerDashboard;
