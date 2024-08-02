function AboutD() {
  return (
    <>
      <h1 className="font-bold text-xl ml-8">About</h1>
      <div className="m-8 grid grid-cols-3 grid-rows gap-5">
        <div className="row-start-1 row-end-2 col-start-1 col-end-3  ">
          <p>
            بيوتي سنتر الأول من نوعه في محافظة العقبة، يقدم تجربة جمال شاملة،
            حيث يتميز بخدمات متنوعة تشمل العناية بالشعر، المكياج الاحترافي،
            تصفيف وتجميل الأظافر، جلسات مساج مريحة، وتجارب حمام تركي / مغربي
            مترفة، بالأضافة إلى خدمات السكر والواكس للعناية بالبشرة.
          </p>
          <br />
          <iframe
            className="row-start-1 row-end-2 col-start-1 col-end-3"
            width="100%"
            height="500rem"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.528025898094!2d35.0037932246183!3d29.530113475186628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150070366ddcf20d%3A0x92f8776b678e59bd!2sAqaba%20Gateway!5e0!3m2!1sar!2sjo!4v1722096949650!5m2!1sar!2sjo"
            title="Leen Beauty"
          ></iframe>
        </div>
        <div className="row-start-1 row-end-2 col-start-3 col-end-4 border sticky top-0 z-50 h-30 h-96">
          <p className="font-bold text-4xl p-5 ">Name Salon Like This</p>
          <p className="font-bold  p-5  "> Rating: 4.5</p>
          <button
            type="button"
            class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96 ml-5 "
          >
            Book Now{" "}
          </button>{" "}
          <div className="border-t-2 mt-10">
            <p className="mt-5">
              <span className="text-green-600 ml-4 ">Open </span> until 7:00 PM
            </p>
            <p className="ml-4 mt-5">
              Aqaba <br />
              <span className="text-blue-500 ">Get directions </span>
            </p>
          </div>
        </div>
        <div className="grid cols-3 grid-rows gap-5">
          <h1 className="font-bold text-xl ">Opening Time</h1>
          <p className="row-start-2 row-end-3 col-start-1 col-end-2">Friday</p>
          <span className="row-start-2 row-end-3 col-start-2 col-end-3">
            10:00 AM - 8:00 PM
          </span>
          <p className="row-start-3 row-end-4 col-start-1 col-end-2">
            Saturday
          </p>
          <span className="row-start-3 row-end-4 col-start-2 col-end-3">
            10:00 AM - 8:00 PM
          </span>
          <p className="row-start-4 row-end-5 col-start-1 col-end-2">Sunday</p>
          <span className="row-start-4 row-end-5 col-start-2 col-end-3">
            10:00 AM - 8:00 PM
          </span>
          <p className="row-start-5 row-end-6 col-start-1 col-end-2">Monday</p>
          <span className="row-start-5 row-end-6 col-start-2 col-end-3">
            10:00 AM - 8:00 PM
          </span>
          <p className="row-start-6 row-end-7 col-start-1 col-end-2">Tuesday</p>
          <span className="row-start-6 row-end-7 col-start-2 col-end-3">
            10:00 AM - 8:00 PM
          </span>
          <p className="row-start-7 row-end-8 col-start-1 col-end-2">
            Wednesday
          </p>
          <span className="row-start-7 row-end-8 col-start-2 col-end-3">
            10:00 AM - 8:00 PM
          </span>
          <p className="row-start-8 row-end-9 col-start-1 col-end-2">
            Thursday
          </p>
          <span className="row-start-8 row-end-9 col-start-2 col-end-3">
            10:00 AM - 8:00 PM
          </span>
        </div>
      </div>
    </>
  );
}
export default AboutD;
