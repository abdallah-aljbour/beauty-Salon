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
                src="https://images.fresha.com/locations/location-profile-images/383330/1106136/4f93f71a-769f-4a45-9dd6-3087ee17a44a.jpg?class=width-small"
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
                src="https://images.fresha.com/locations/location-profile-images/383330/1106136/4f93f71a-769f-4a45-9dd6-3087ee17a44a.jpg?class=width-small"
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
                src="https://images.fresha.com/locations/location-profile-images/383330/1106136/4f93f71a-769f-4a45-9dd6-3087ee17a44a.jpg?class=width-small"
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
    </>
  );
}
export default Section3;
