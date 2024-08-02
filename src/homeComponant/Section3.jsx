import { Link } from "react-router-dom";
function Section3() {
  return (
    <>
      <h1 className="bg-white m-10 italic font-black">Trending</h1>
      <div className="flex m-10 justify-between">
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://images.fresha.com/locations/location-profile-images/383330/1106136/4f93f71a-769f-4a45-9dd6-3087ee17a44a.jpg?class=width-small"
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
                src="https://images.fresha.com/locations/location-profile-images/157303/1045326/9a9a49d7-563a-4d23-b6af-23e7a7c7857c.jpg?class=gallery-modal-large&dpr=2&watermark=true"
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
                src="https://images.fresha.com/locations/location-profile-images/640046/1357903/b5f1641d-0847-4b66-b16d-f5ad11010352-LavenderSpa-JO-AmmanGovernorate-Amman-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true"
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
                src="https://images.fresha.com/locations/location-profile-images/83389/1731721/8f92ec15-f822-4143-a839-49601f9101b1.jpg?class=gallery-modal-large&dpr=2&watermark=true"
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
    </>
  );
}
export default Section3;
