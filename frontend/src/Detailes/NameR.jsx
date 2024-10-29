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
