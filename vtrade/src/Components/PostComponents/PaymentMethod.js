import React from "react";
import { selectedSvg, unselectedSvg } from "../../Constants";

export default function PaymentMethod({ type, method, handlePaymentMethod }) {
  return (
    <div className="flex flex-row mr-6">
      <div
        className="cursor-pointer"
        name="method"
        value={type}
        onClick={() => handlePaymentMethod(type)}
      >
        {method === type ? selectedSvg : unselectedSvg}
      </div>
      <label
        name="method"
        value={type}
        onClick={() => handlePaymentMethod(type)}
        className="select-none inline-flex cursor-pointer items-center text-gray-700 ml-2 text-primary bg-white font-mulish text-base font-normal tracking-wide"
      >
        {type}
      </label>
    </div>
  );
}
