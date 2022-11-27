import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { payBill } from "../../services/paymentService";
import { getProduct } from "../../services/productService";
import { stripeKey } from "../../config.json";
import { getCurrentUser } from "../../services/authService";
import { Link } from "react-router-dom";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});

  let productQuantity = Number(quantity) < 1 ? 1 : Number(quantity);
  let location = useLocation();
  let history = useHistory();

  const user = getCurrentUser();

  // if (user && user.userType === "customer") {
  //   setCustomerDetails({
  //     _id: user._id,
  //     name: user.name,
  //     phone: user.phone,
  //     email: user.email,
  //   });
  // }

  useEffect(() => {
    async function getData() {
      const result = await getProduct(id);
      setProduct(result.data);
    }
    getData();
  }, [id]);

  useEffect(() => {
    setProductDetails({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: productQuantity,
    });
  }, [product, productQuantity]);
  // console.log(user);

  const handleQuantity = (isIncrease) => {
    if (isIncrease) {
      if (Number(quantity) > 24) return;
      setQuantity(Number(quantity) + 1);
      // console.log(quantity);
    } else {
      if (Number(quantity) > 1) {
        setQuantity(Number(quantity) - 1);
      } else {
        setQuantity(1);
      }

      // console.log(quantity);
    }
  };
  const handleGetQuantity = (e) => {
    const currentValue = Number(e.currentTarget.value);
    if (currentValue > 25) return;
    if (currentValue > 0) {
      setQuantity(currentValue);
    } else {
      setQuantity("");
    }
  };

  const handlePay = async (token) => {
    console.log("token", token);
    console.log("product details in frontend", productDetails);

    try {
      if (user && user.userType === "customer") {
        const response = await payBill({
          token,
          productDetails,
          customerDetails: user,
          // customerDetails,
        });

        const { orderSavedToDb, paymentDone } = response.data;
        if (orderSavedToDb && paymentDone) {
          alert("Ordered Placed");
          history.replace("/customer");
          console.log("payment done");
          console.log("Payment Response ", response);
        }
      }
    } catch (ex) {
      console.log(ex);
      alert("something is wrong");
    }
  };
  // console.log(product);

  return (
    <div className="container-fluid">
      <h1 className="d-flex justify-content-center my-4">Checkout Page</h1>
      <hr />
      {product.name && (
        <div className="row">
          <div className="d-flex h-100 justify-content-center align-items-center col-md-6">
            <img src={product.image} alt="" />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <h4>Category : {product.category.name}</h4>
            <h4>
              Price {product.price} <span className="taka">&#2547;</span>
            </h4>
            <p>Details : {product.details}</p>

            <div className="flex col-md-5 d-flex">
              <span
                className="btn btn-success fs-5 mx-1"
                onClick={() => handleQuantity(false)}
              >
                -
              </span>
              <span>
                <input
                  type="number"
                  size="2"
                  min="1"
                  max="20"
                  name="quantity"
                  // defaultValue={orderDetails.quantity}
                  value={quantity}
                  onChange={handleGetQuantity}
                  className="form-control mt-1"
                />
              </span>
              <span
                className="btn btn-success fs-5 mx-1"
                onClick={() => handleQuantity(true)}
              >
                +
              </span>

              {user ? (
                <StripeCheckout
                  // disabled={user ? "disabled" : null}
                  disabled={user && user.userType === "admin" ? true : false}
                  stripeKey={stripeKey}
                  token={handlePay}
                  amount={Math.round(
                    (productDetails.price * productDetails.quantity * 100) /
                      85.79
                  )}
                  name={productDetails.name}
                  image="https://i.ibb.co/8ztWc1p/logo-amader-bajar.png"
                  billingAddress
                  // shippingAddress
                ></StripeCheckout>
              ) : (
                <Link
                  className="btn btn-success"
                  to={{
                    pathname: "/login",
                    state: { from: location },
                  }}
                >
                  Buy Now
                </Link>
              )}
            </div>
            <h2>
              <span className="badge bg-secondary my-2 taka">
                Total price: {productDetails.price * productDetails.quantity} &#2547;
              </span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductDetails;
