import React from "react";
import "./ProductCard.css";

function ProductCard({ product, viewProduct }) {
  return (
    <div className="col-md-4 d-flex justify-content-around">
      <div
        onClick={() => viewProduct(product._id)}
        className="m-3 p-3 rounded crp bg-secondary hc"
      >
        <img
          className="rounded"
          src={product.image}
          alt="not found"
          height="250px"
          width="300px"
        />
        <div>
          <div>
            <h4>{product.name}</h4>
            <h6>
              Price {product.price}{" "}
              <span className="taka">&#2547;</span>
            </h6>
          </div>
          <div>
            <button className="cb cb-pink">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
