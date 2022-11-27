import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

function Pagination({ itemsCount, pageCapacity, currentPage, onPageChange }) {
  const pagesCount = Math.ceil(itemsCount / pageCapacity);
  if (pagesCount === 1) return null;

  //creating arrays with lodash
  //[1, 2, 3].map()
  const pages = _.range(1, pagesCount + 1); //here 1 is for(0+1)

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageCapacity: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
