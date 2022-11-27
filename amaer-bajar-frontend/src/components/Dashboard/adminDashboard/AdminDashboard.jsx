import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { getCurrentUser } from "../../../services/authService";
import CategoryForm from "../categoryForm";
import ManageCategory from "../manageCategory";
import ManageOrders from "../manageOrders";
import ManageProducts from "../ManageProducts";
import ProductForm from "../productForm";
import AdminLeftNav from "./adminLeftNav";
import ManageUser from "./manageUser";

const AdminDashboard = () => {
  const user = getCurrentUser();
  const isAdmin = user && user.userType === "admin";

  if (!isAdmin) return <Redirect to="/not-found" />;
  return (
    <div className="row container-fluid">
      <div className="col-md-2">
        <AdminLeftNav></AdminLeftNav>
      </div>
      <div className="col-8">
        <Switch>
          <Route path="/admin/product/manage">
            <ManageProducts />
          </Route>
          <Route path="/admin/orders/manage">
            <ManageOrders />
          </Route>
          <Route path="/admin/product/:id" component={ProductForm} />
          <Route path="/admin/category/manage">
            <ManageCategory />
          </Route>
          <Route path="/admin/category/:id" component={CategoryForm} />
          <Route path="/admin/user">
            <ManageUser />
          </Route>
          <Route path="/admin">
            <ManageProducts />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default AdminDashboard;
