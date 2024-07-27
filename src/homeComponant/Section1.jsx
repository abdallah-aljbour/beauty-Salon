import { Link } from "react-router-dom";
function Section1() {
  return (
    <>
      <h1 className="bg-white m-10 italic font-black">Recommended</h1>
      <div className="flex m-10 justify-between ">
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://cdn1.treatwell.net/images/view/v2.i5059481.w720.h480.x57F4036F/"
                alt=""
              />
            </Link>
          </div>
          <div class="p-6 border shadow-lg">
            <p class="text-black">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div></div>
          </div>
        </div>
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://cdn1.treatwell.net/images/view/v2.i5059481.w720.h480.x57F4036F/"
                alt=""
              />
            </Link>
          </div>
          <div class="p-6 border shadow-lg">
            <p class="text-black">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://cdn1.treatwell.net/images/view/v2.i5059481.w720.h480.x57F4036F/"
                alt=""
              />
            </Link>
          </div>
          <div class="p-6 border shadow-lg">
            <p class="text-black">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://cdn1.treatwell.net/images/view/v2.i5059481.w720.h480.x57F4036F/"
                alt=""
              />
            </Link>
          </div>
          <div class="p-6 border shadow-lg">
            <p class="text-black">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="flex m-10 justify-between">
        <div class="max-w-sm rounded overflow-hidden shadow-lg ">
          <img
            class="w-full"
            src="https://cdn1.treatwell.net/images/view/v2.i5059481.w720.h480.x57F4036F/"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>

          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg ">
          <img
            class="w-full"
            src="https://cdn1.treatwell.net/images/view/v2.i5059481.w720.h480.x57F4036F/"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg ">
          <img
            class="w-full"
            src="https://cdn1.treatwell.net/images/view/v2.i5059481.w720.h480.x57F4036F/"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
}
export default Section1;
