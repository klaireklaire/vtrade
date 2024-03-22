import ReactPaginate from "react-paginate";
import React from "react";
import { leftArrowPag, rightArrowPag } from "../../Constants";
import { motion } from "framer-motion";

export default function PaginationButtons({
  setCurrentPage,
  currentPage,
  totalPages,
}) {
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };
  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            showNextButton ? (
              <span className="mr-4 flex items-center justify-center">
                {rightArrowPag}
              </span>
            ) : null
          }
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          pageCount={totalPages}
          previousLabel={
            showPrevButton ? (
              <span className="mr-4 flex items-center justify-center">
                {leftArrowPag}
              </span>
            ) : null
          }
          renderOnZeroPageCount={
            <span className="mr-4 flex items-center justify-center">
              {leftArrowPag}
            </span>
          }
          containerClassName="flex items-center justify center mt-8 mb-4"
          pageClassName="block border border-solid rounded-full w-10 h-10 mr-4 hover:bg-black hover:text-white flex items-center justify-center"
          activeClassName="bg-black text-white"
        />
      </div>
    </motion.div>
  );
}
