import React from "react";

const Pagination = ({ currentPage, totalPages, onNextPage }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="grid grid-cols-2 gap-4">
      {pages.map((page) => (
        <button
          key={page}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onNextPage(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
