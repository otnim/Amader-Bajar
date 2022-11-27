import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import CategoryTable from "./categoryTable";
import _ from "lodash";
import { Link } from "react-router-dom";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

  useEffect(() => {
    async function getData() {
      const { data: loadedCategories } = await getCategories();

      setCategories(loadedCategories);
    }
    getData();
  }, []);

  const sortedCategories = _.orderBy(
    categories,
    [sortColumn.path],
    [sortColumn.order]
  );

  const handleDelete = async (category) => {
    // console.log("This category will be deleted" + category._id);
    // console.log(category);
    alert("Deleting category will create problem for managing Products")
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  if (sortedCategories.length === 0)
    return <p>There is no Categories in database</p>;

  return (
    <div>
      <h1>This is categories manage Table</h1>
      <Link to="/admin/category/new" className="btn btn-primary">Add New Category</Link>

      <CategoryTable
        categories={sortedCategories}
        onDelete={handleDelete}
        onSort={handleSort}
        sortColumn={sortColumn}
      />
    </div>
  );
};

export default ManageCategory;
