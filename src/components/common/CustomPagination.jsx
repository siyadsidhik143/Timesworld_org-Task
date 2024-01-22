import React from "react";
import Pagination from "react-paginate";
const CustomPagination = ({ totalPages, onPageChange }) => {
  const handlePageClick = data => {
    const { selected } = data;
    onPageChange(selected);
  };
  return (
    <Pagination
      pageCount={totalPages}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      previousLabel={<i className="fa-solid fa-chevron-left"></i>}
      nextLabel={<i className="fa-solid fa-chevron-right"></i>}
      className="pagination pagination-lg"
      activeClassName="active"
      pageLinkClassName="page-link"
      activeLinkClassName="page-item active"
      pageClassName="page-item"
      previousClassName="prev-arrow"
      nextClassName="next-arrow"
    />
  );
};

export default CustomPagination;
