import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getProducts, deleteProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import Pagination from "../common/Pagination";

import ProductCard from "../Products/ProductCard";
import { useHistory } from "react-router";

function Home() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, selectCategory] = useState();
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const pageCapacity = 6;

  const filteredProducts =
    selectedCategory && selectedCategory._id
      ? products.filter((p) => p.category._id === selectedCategory._id)
      : products;

  //before pagination we have to sort the products using lodash

  const sortedProducts = _.orderBy(
    filteredProducts,
    [sortColumn.path],
    [sortColumn.order]
  );

  // const paginatedProducts = paginate(products, currentPage, pageCapacity);
  const paginatedProducts = paginate(sortedProducts, currentPage, pageCapacity);

  useEffect(() => {
    async function getData() {
      const { data: loadedProducts } = await getProducts();
      setProducts(loadedProducts);

      const { data: loadedCategories } = await getCategories();
      const newCategories = [
        { _id: "", name: "All Categories" },
        ...loadedCategories,
      ];
      setCategories(newCategories);
    }
    getData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectCategory = (category) => {
    selectCategory(category);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };
  const viewProduct = (productId) => {
    // console.log('Product details', productId);
    history.push(`/products/${productId}`);
  };

  if (products.length === 0) return <p>There is no product in database</p>;

  return (
    <div className="row container-fluid">
      <div className="col-sm-2 mt-2">
        <ListGroup
          items={categories}
          selectedItem={selectedCategory}
          onItemSelect={handleSelectCategory}
        />
      </div>
      <div className="row col-10">
        {paginatedProducts.map((product) => (
          <ProductCard
            viewProduct={viewProduct}
            product={product}
            key={product._id}
          ></ProductCard>
        ))}
      </div>

      <Pagination
        itemsCount={filteredProducts.length}
        pageCapacity={pageCapacity}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
