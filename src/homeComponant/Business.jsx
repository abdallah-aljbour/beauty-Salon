function Business() {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        <div className="row-start-1 row-end-2 m-8">
          <p className="m-8  	font-bold text-4xl">
            Supercharge your business for free with the Jordan top booking
            platform for salons .
          </p>
          <button
            type="button"
            class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96 ml-7"
          >
            See More{" "}
          </button>{" "}
        </div>
        <img
          className="h-full w-full col-start-2 col-end-3 row-start-1 row-end-2"
          src="https://th.bing.com/th/id/R.eac371ec7aa57b3f559726cc9cefb3e1?rik=wF7ePy6u7S%2b9Xw&pid=ImgRaw&r=0"
          alt=""
        />
      </div>
    </>
  );
}
export default Business;
