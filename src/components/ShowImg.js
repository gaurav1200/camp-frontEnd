const ShowImg = (props) => {
  return (
    <img
      className="img-fluid"
      alt=""
      src={props.campground.images[0].url}
      width="300"
      height="100"
    />
  );
};
export default ShowImg;
