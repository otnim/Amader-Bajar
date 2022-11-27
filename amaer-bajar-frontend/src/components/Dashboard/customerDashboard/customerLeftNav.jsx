import React from "react";
import { Link } from "react-router-dom";

const CustomerLeftNav = () => {
  return (
    <div className="bg-secondary left-nav d-flex flex-column">
      <Link to="/customer/order" className="btn btn-secondary m-1">
        See Orders
      </Link>
      <Link to="/customer/profile" className="btn btn-secondary  m-1">
        Customer Profile
      </Link>
    </div>
  );
};

export default CustomerLeftNav;
