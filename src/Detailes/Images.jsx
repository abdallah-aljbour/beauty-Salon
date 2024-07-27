function Image() {
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2 gap-5 m-8">
        <img
          className="row-start-1 row-end-3 col-start-1 col-end-3 h-full rounded-lg"
          src="https://images.fresha.com/locations/location-profile-images/759914/923355/4ed81c4e-3877-4286-8df3-93256dd468f0.jpg?class=venue-gallery-large"
        />
        <img
          className="row-start-2 row-end-3 col-start-3 col-end-4 rounded-lg"
          src="https://images.fresha.com/locations/location-profile-images/759914/923355/4ed81c4e-3877-4286-8df3-93256dd468f0.jpg?class=venue-gallery-large"
        />
        <img
          className="row-start-1 row-end-2 col-start-3 col-end-4 rounded-lg"
          src="https://images.fresha.com/locations/location-profile-images/759914/923355/4ed81c4e-3877-4286-8df3-93256dd468f0.jpg?class=venue-gallery-large"
        />
      </div>
    </>
  );
}
export default Image;
