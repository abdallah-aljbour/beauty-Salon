import { Link } from "react-router-dom";
function Section1() {
  return (
    <>
      <h1 className="bg-white m-10 italic font-black">Recommended</h1>
      <div className="flex m-10 justify-between  ">
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://images.fresha.com/locations/location-profile-images/304101/1616537/dd2dd420-fc6a-4a3c-bb28-32113481af82-HobsHairandNailBar-GB-England-Weymouth-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true"
                alt=""
              />
            </Link>
          </div>
          <div class="p-6 border shadow-lg">
            <p class="text-black font-bold"> Beauty Salon</p>
            <p class="text-black  font-bold">Rating : 4.5</p>
            <p class="text-black  opacity-35">Amman , Khalda</p>
            <div></div>
          </div>
        </div>
        <div class="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link to="/Detailes/Detailes">
              <img
                class="rounded-t-lg"
                src="https://images.fresha.com/locations/location-profile-images/562229/1876790/e3b459a8-8637-4dbd-ac0d-ba17722500c1-TheAestheticsBaeClinic-Winchester-GB-England-Winchester-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true"
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
                src="https://images.fresha.com/locations/location-profile-images/705165/1017239/5bd5e5b7-3da2-4606-baf5-c04a868f9a00.jpg?class=gallery-modal-large&dpr=2&watermark=true"
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
                src="https://images.fresha.com/locations/location-profile-images/1192113/1706133/b3fac289-3038-4902-8428-bb05f8059d51-LeenBeautyCenter-JO-AqabaGovernorate-Aqaba-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true"
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
export default Section1;
