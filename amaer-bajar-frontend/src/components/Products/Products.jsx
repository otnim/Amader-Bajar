import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/productService";

function Products() {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      const result = await getProducts();
      setProducts(result.data);
    }
    getData();
  }, []);

  const viewProduct = (productId) => {
    // console.log('Product details', productId);
    history.push(`/products/${productId}`);
  };

  return (
    <div>
      <hr />
      <div className="row container-fluid">
        {products.map((product) => (
          <ProductCard
            viewProduct={viewProduct}
            product={product}
            key={product._id}
          ></ProductCard>
        ))}
      </div>

      {/* <ul>
                {products.map(product => <li key={product._id}>{product.name}</li>)}
            </ul> */}
    </div>
  );
}

export default Products;
