import React from "react";
import PaginationButtons from "./PaginationButtons";
import Loader from "../Loader";
import FetchData from "./FetchData";
import { useNavigate } from "react-router-dom";
import none from "../../Assets/none.png";

export default function Listing() {
  const navigate = useNavigate();

  const { loading, pages, totalPages, currentPage, setCurrentPage } =
    FetchData();
  const handleItemClick = (item) => {
    navigate(`/Product/${item.category}`, { state: { id: item.id } });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center items-center border-2 p-8 mb-10 w-[868px]">
          <div className="grid grid-cols-3 gap-4">
            {pages.map((page, i) => {
              return (
                <div>
                  <div
                    key={i}
                    className="flex flex-col border-black border-solid border h-80 w-64 my-2 cursor-pointer"
                    onClick={() => handleItemClick(page)}
                  >
                    <div className="flex flex-col justify-between">
                      <div>
                        {page.image1 ? (
                          <img
                            className="object-cover h-60 w-64"
                            src={page.image1}
                            alt={`Listing photo`}
                          />
                        ) : (
                          <img
                            className="object-cover h-60 w-64"
                            src={none}
                            alt={`Listing photo`}
                          />
                        )}
                      </div>
                      <div className="border border-gray-200"></div>
                      <div className="mt-2 mb-3 ml-2 flex flex-col items-start">
                        {page.title && (
                          <div
                            className={`text-light-black font-mulish text-basePlus font-bold truncate tracking-[0.1px] `}
                          >
                            {page.title}
                          </div>
                        )}
                        {page.price !== null && page.price > 0 ? (
                          <p className="text-gray-400 font-mulish text-sm font-bold tracking-[0.1px]">
                            ${page.price}
                          </p>
                        ) : (
                          <p className="text-gray-400 font-mulish text-sm font-bold tracking-[0.1px]">
                            ${page.minprice} ~ ${page.maxprice}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <PaginationButtons
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
