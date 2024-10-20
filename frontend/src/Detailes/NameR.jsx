// function Name() {
//   return (
//     <>
//       <div className="m-8 mt-7">
//         <p className=" font-bold text-2xl ">Name Salon Like This </p>
//         <div className="space-x-3">
//           <span className="font-bold ">Rating 3.5</span>{" "}
//           <span className="opacity-80">
//             • Open until 8:00 PM • Aqaba Gateway, Aqaba{" "}
//             <span className="text-blue-800"> Get directions</span>
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Name;
function Name({ salonName, rating, openingTime, closingTime, location }) {
  return (
    <div className="m-8 mt-7">
      <p className="font-bold text-2xl">{salonName}</p>
      <div className="space-x-3">
        <span className="font-bold">Rating {rating}</span>
        <span className="opacity-80">
          • Open until {closingTime} • {location}{" "}
          <span className="text-blue-800"> Get directions</span>
        </span>
      </div>
    </div>
  );
}

export default Name;
