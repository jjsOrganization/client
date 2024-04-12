import { useNavigate } from 'react-router-dom';
import React from "react";


const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const navigate = useNavigate();

  const handlePrevClick = () => {
    if (currentPage > 1) {
      navigate(`/products/${currentPage - 1}`);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      navigate(`/products/${currentPage + 1}`);
    }
  };

  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }
    } else {
      const leftOffset = Math.max(
        currentPage - Math.floor(maxVisiblePages / 2),
        1
      );
      const rightOffset = Math.min(
        leftOffset + maxVisiblePages - 1,
        totalPages
      );

      for (let i = leftOffset; i <= rightOffset; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }

      if (leftOffset > 1) {
        pageNumbers.unshift(<span key="leftEllipsis">...</span>);
      }

      if (rightOffset < totalPages) {
        pageNumbers.push(<span key="rightEllipsis">...</span>);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && <span onClick={handlePrevClick}>&lt;</span>}

      {renderPageNumbers()}

      {currentPage < totalPages && <span onClick={handleNextClick}>&gt;</span>}
    </div>
  );
};

export default Pagination;
