import { Link } from "react-router-dom";
function Section2() {
  return (
    <>
      <h1 className="bg-white m-10 italic font-black">Offers</h1>
      <div className="flex m-10 justify-between">
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://images.fresha.com/locations/location-profile-images/505822/1876986/cf879775-8f1f-4286-9bb6-9bab6c11f459-WowBeautyLab-CY-Limassol-Limassol-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true"
                alt=""
              />
            </Link>
          </div>
          <div class="p-6 border shadow-lg">
            <p class="text-black font-bold"> Beauty Salon</p>
            <p class="text-black  font-bold">Rating : 4.5</p>
            <p class="text-black  opacity-35">Amman , Khalda</p>
          </div>
        </div>
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://images.fresha.com/locations/location-profile-images/714144/1671943/303368ca-a5a4-4406-8f7f-3c171dbce692-TheHouseoftheButcher-CY-Limassol-Limassol-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true"
                alt=""
              />
            </Link>
          </div>
          <div class="p-6 border shadow-lg">
            <p class="text-black font-bold"> Beauty Salon</p>
            <p class="text-black  font-bold">Rating : 4.5</p>
            <p class="text-black  opacity-35">Amman , Khalda</p>
          </div>
        </div>
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://images.fresha.com/locations/location-profile-images/192414/1575720/29242bdf-0f6d-45e8-91ff-9cbf9fcb6c0b.jpg?class=gallery-modal-large&dpr=2&watermark=true"
                alt=""
              />
            </Link>
          </div>
          <div class="p-6 border shadow-lg">
            <p class="text-black font-bold"> Beauty Salon</p>
            <p class="text-black  font-bold">Rating : 4.5</p>
            <p class="text-black  opacity-35">Amman , Khalda</p>
          </div>
        </div>
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://images.fresha.com/locations/location-profile-images/96147/1576745/356a55a5-04e6-436a-abf4-b74b86237398-SuensoSpa-CY-Limassol-Limassol-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true"
                alt=""
              />
            </Link>
          </div>
          <div class="p-6 border shadow-lg">
            <p class="text-black font-bold"> Beauty Salon</p>
            <p class="text-black  font-bold">Rating : 4.5</p>
            <p class="text-black  opacity-35">Amman , Khalda</p>
          </div>
        </div>
      </div>
      {/* <div className="flex m-10 justify-between">
        <div class="max-w-sm rounded overflow-hidden shadow-lg ">
          <img
            class="w-full"
            src="https://images.fresha.com/locations/location-profile-images/759914/923355/4ed81c4e-3877-4286-8df3-93256dd468f0.jpg?class=venue-gallery-large"
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
            src="https://images.fresha.com/locations/location-profile-images/759914/923355/4ed81c4e-3877-4286-8df3-93256dd468f0.jpg?class=venue-gallery-large"
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
            src="https://images.fresha.com/locations/location-profile-images/759914/923355/4ed81c4e-3877-4286-8df3-93256dd468f0.jpg?class=venue-gallery-large"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">Name</p>
            <p class="text-gray-700 text-base">Rating</p>
            <p class="text-gray-700 text-base">Location</p>
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
export default Section2;
