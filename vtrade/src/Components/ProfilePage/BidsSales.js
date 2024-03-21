import React from "react";
import PaginationButtons from "./PaginationButtons";
import Loader from "../Loader";
import FetchData from "./FetchData";
import { useNavigate } from "react-router-dom";

export default function BidsSales() {
  const navigate = useNavigate();
  const menu = [
    { id: "id", text: "OFFER ID" },
    { id: "status", text: "STATUS" },
    { id: "date", text: "DATE" },
    { id: "amount", text: "AMOUNT" },
    { id: "from", text: "FROM" },
    { id: "action", text: "ACTION" },
  ];

  const getPaddingClass = (id) => {
    console.log(id);
    switch (id) {
      case "id":
        return "px-4";
      case "status":
        return "px-4";
      case "date":
        return "px-10";
      case "amount":
        return "px-4";
      case "from":
        return "pl-8";
      case "action":
        return "px-20";
      default:
        return "px-3";
    }
  };
  const getWidthStyle = (id) => {
    switch (id) {
      case "id":
        return { width: "10%" };
      case "status":
        return { width: "20%" };
      case "date":
        return { width: "15%" };
      case "amount":
        return { width: "25%" };
      case "from":
        return { width: "20%" };
      case "action":
        return { width: "10%" };
      default:
        return { width: "auto" };
    }
  };

  const salesData = [
    {
      id: 1,
      status: "Completed",
      date: "2024-01-30",
      amount: "$100",
      from: "User1",
      action: "View",
    },
    {
      id: 2,
      status: "Pending",
      date: "2024-01-29",
      amount: "$150",
      from: "User2",
      action: "View",
    },
  ];

  const { loading, pages, totalPages, currentPage, setCurrentPage } =
    FetchData();
  const handleItemClick = (item) => {
    navigate(`/Product/${item.category}`, { state: { id: item.id } });
  };

  console.log(loading);
  return (
    <div>
      {false ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center items-start border-2  mb-10  w-[868px]">
          <div>
            <p className="px-8 py-4 uppercase font-mulish font-bold text-sm text-black">
              Sales History
            </p>
          </div>
          <div className="w-full">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 font-mulish font-medium text-xsm">
                  {menu.map((item) => (
                    <th
                      key={item.id}
                      //   style={getWidthStyle(item.id)}
                      className={`${getPaddingClass(item.id)} py-2 mb-2 `}
                    >
                      {item.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id}>
                    {menu.map((item) => (
                      <td
                        key={`${sale.id}-${item.id}`}
                        // style={getWidthStyle(item.id)}
                        className={`py-4 ${getPaddingClass(item.id)}`}
                      >
                        {sale[item.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="items-center">
            <PaginationButtons
              totalPages={1}
              currentPage={0}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
