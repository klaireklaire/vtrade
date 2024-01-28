import React from "react";
import { MENU_ITEMS } from "../../Constants";
import { Navigate, useNavigate } from "react-router-dom";

export default function CategoryScroll() {
  const handelMenuItemClick = (id) => {
    console.log(`Clicked on ${id}`);
    navigate(id);
  };

  const navigate = useNavigate();

  return (
    <div>
      <a className="text-light-black font-mulish text-xl font-bold tracking-[0.1px]">
        What would you like to find?
      </a>
      <div className="flex flex-row overflow-x-auto scrollbar-none pt-8 items-center">
        {MENU_ITEMS.map((menuItems) => (
          <button
            className="w-[272px] h-[8rem] mr-6 border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 flex items-center justify-center inline-block px-3 text-lg text-slate-800 font-mulish font-bold"
            href={`/${menuItems.id}`}
            onClick={() => handelMenuItemClick(menuItems.id)}
          >
            {menuItems.text}
          </button>
        ))}
      </div>
    </div>
  );
}
