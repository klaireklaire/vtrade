import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function NewPost(props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-48">
      <h6 class="text-light-black font-mulish text-xl font-bold tracking-[0.1px]">
        How can we help you?
      </h6>
      <div className="flex flex-row mt-6">
        <button
          className="w-[272px] h-[130px] text-center font-mulish text-light-black text-[22px] leading-6 font-semibold leading-6 tracking-[0.1px] mr-8 pl-16 pr-16 pt-8 pb-8 border-black border-solid border-2 rounded-3xl"
          onClick={() => {
            navigate("/post/offer");
          }}
        >
          POST
        </button>
        <button
          className="w-[272px] h-[130px] text-center font-mulish text-light-black text-[22px] leading-6 font-semibold leading-6 tracking-[0.1px] mr-8 pl-16 pr-16 pt-8 pb-8 border-black border-solid border-2 rounded-3xl"
          onClick={() => {
            navigate("/post/request");
          }}
        >
          REQUEST
        </button>
      </div>
    </div>
  );
}
