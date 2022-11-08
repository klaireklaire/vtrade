import React from "react";

function Categories() {
  return (
    <div>
      <body>
        <div class="container px-4 flex-grow w-full py-4 sm:py-16 mx-auto px-0">
          <div class="mx-auto w-full md:w-4/5 px-4">
            <div class="container my-1">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-3xl font-medium">
                  What would you like to find?
                </h2>
                <div>
                  <button class="cursor-pointer text-xl mx-1 text-indigo-600 font-bold"></button>
                  <button class="cursor-pointer text-xl mx-1 text-indigo-600 font-bold"></button>
                </div>
              </div>
              <div
                id="scrollContainer"
                class="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start"
              >
                <div class="flex justify-between items-center mr-4 border rounded-lg">
                  <a href="#" class="space-y-4">
                    <div class="px-10 py-3">
                      <div class="text-lg leading-6 font-medium space-y-1">
                        <h3 class="font-bold text-gray-800 text-3xl mb-2">
                          Housing
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="flex justify-between items-center mr-4 border rounded-lg">
                  <a href="#" class="space-y-4">
                    <div class="px-10 py-3">
                      <div class="text-lg leading-6 font-medium space-y-1">
                        <h3 class="font-bold text-gray-800 text-3xl mb-2">
                          Clothes
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="flex justify-between items-center mr-4 border rounded-lg">
                  <a href="#" class="space-y-4">
                    <div class="px-10 py-3">
                      <div class="text-lg leading-6 font-medium space-y-1">
                        <h3 class="font-bold text-gray-800 text-3xl mb-2">
                          Services
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="flex justify-between items-center mr-4 border rounded-lg">
                  <a href="#" class="space-y-4">
                    <div class="px-10 py-3">
                      <div class="text-lg leading-6 font-medium space-y-1">
                        <h3 class="font-bold text-gray-800 text-3xl mb-2">
                          Activities
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="flex justify-between items-center mr-4 border rounded-lg">
                  <a href="#" class="space-y-4">
                    <div class="px-10 py-3">
                      <div class="text-lg leading-6 font-medium space-y-1">
                        <h3 class="font-bold text-gray-800 text-3xl mb-2">
                          Other
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Categories;
