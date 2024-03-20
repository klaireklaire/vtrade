import React from "react";

export default function Listing() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6; // Change this to the actual total number of pages

  const handleNextPage = (page) => {
    setCurrentPage(page);
    // Add logic to navigate to the next page
  };

  return (
    <div className="border border-gray-300">
      {/* Content of your app */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
      />
    </div>
  );
}
