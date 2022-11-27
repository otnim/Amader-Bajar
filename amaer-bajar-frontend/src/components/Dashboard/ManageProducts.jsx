import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getProducts, deleteProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import Pagination from "../common/Pagination";
import ProductsTable from "./ProductsTable";

function ManageProducts() {
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

  const handleDelete = async (product) => {
    const originalProducts = products;
    const newProducts = products.filter((p) => p._id !== product._id);
    setProducts(newProducts);

    try {
      await deleteProduct(product._id);
    } catch (ex) {
      console.log("Something happen unexpected in deleting movies " + ex);
      setProducts(originalProducts); //reverse the UI
    }
  };

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

  if (products.length === 0) return <p>There is no product in database</p>;

  return (
    <div className="row container-fluid">
      <div className="col-sm-3 mt-2">
        <ListGroup
          items={categories}
          selectedItem={selectedCategory}
          onItemSelect={handleSelectCategory}
        />
      </div>

      <div className="col-md-8">
        <p>Total products in database {products.length}</p>

        <ProductsTable
          products={paginatedProducts}
          onDelete={handleDelete}
          onSort={handleSort}
          sortColumn={sortColumn}
        />

        <Pagination
          itemsCount={filteredProducts.length}
          pageCapacity={pageCapacity}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ManageProducts;
