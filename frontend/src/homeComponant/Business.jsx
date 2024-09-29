import { Link } from "react-router-dom";
function Business() {
  return (
    <>
      <p className="m-10 italic font-black">For Business</p>
      <div className="grid grid-cols-2 grid-rows-1 gap-5 ">
        <div className="row-start-1 row-end-2 m-8">
          <p className="m-8  	font-bold text-4xl">
            Supercharge your business for free with the Jordan top booking
            platform for salons .<br /> <br /> Log in now and manage your site
            with ease
          </p>
          <Link to="/signinRegister/signin">
            <button
              type="button"
              class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96 ml-7"
            >
              Log in as admin{" "}
            </button>{" "}
          </Link>
        </div>

        <img
          className="h-full w-full col-start-2 col-end-3 row-start-1 row-end-2 "
          src="https://i.pinimg.com/564x/86/1f/40/861f40338bc442eab6d996dd6b1822e9.jpg"
          alt=""
        />
      </div>
    </>
  );
}
export default Business;
