import React from "react";

function Categories() {
  return (
    <div>
      <div class="flex flex-col bg-white m-auto p-auto">
<h1
        class="flex py-5 lg:px-[6rem] md:px-10 px-5 md:mx-20 font-bold text-xl text-slate-800 font-mulish"
      >
        What would you like to find?
      </h1>

      {/* Category Card Scroll */}
      <div
        class="flex overflow-x-scroll pb-10 hide-scroll-bar"
      >
        <div
          class="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 "
        >
          {/* Category Card */}
          <a href="#" class="inline-block px-3">
            <div
              class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center"
            >
              <div class="text-lg text-slate-800 font-mulish font-bold">
              Housing
              </div>
            </div>
          </a>

          <a href="#" class="inline-block px-3">
            <div
              class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center"
            >
              <div class="text-lg text-slate-800 font-mulish font-bold">
              Goods
              </div>
            </div>
          </a>

          <a href="#" class="inline-block px-3">
            <div
              class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center"
            >
              <div class="text-lg text-slate-800 font-mulish font-bold">
              Jobs
              </div>
            </div>
          </a>

          <a href="#" class="inline-block px-3">
            <div
              class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center"
            >
              <div class="text-lg text-slate-800 font-mulish font-bold">
              Personals
              </div>
            </div>
          </a>

          <a href="#" class="inline-block px-3">
            <div
              class="w-[17rem] h-[8rem] border-2 border-slate-800 max-w-xs overflow-hidden rounded-3xl bg-white hover:bg-slate-100 duration-300 transition-colors flex items-center justify-center"
            >
              <div class="text-lg text-slate-800 font-mulish font-bold">
              Service
              </div>
            </div>
          </a>

        </div>
      </div>
</div>
    </div>
  )
}

export default Categories;
