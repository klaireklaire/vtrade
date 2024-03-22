import apiClient from "../../Services/apiClient";
import { useState, useEffect } from "react";

export default function FetchData() {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const page = Math.min(currentPage + 1, totalPages);
  //     };
  //     fetchData();
  //   });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data, error } = await apiClient.getListings();
        const result = data.listings.slice(0, 6);
        setPages(result);
        setTotalPages(5); //calculate how many this would be
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getProducts();
  }, [currentPage]);

  return {
    loading,
    pages,
    totalPages,
    currentPage,
    setCurrentPage,
  };
}
