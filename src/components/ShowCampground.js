import CampgroundSevices from "../services/CampgroundSevices";
import UserService from "../services/UserService";
import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AuthServices from "../services/AuthServices";
import { useSelector, useDispatch } from "react-redux";
import { camp, massage, user } from "../store/index";
import ReviewForm from "./ReviewForm";
import EditDeleteButton from "./EditDeleteButton";
import ShowReviews from "./ShowReviews";
import Navbar from "./Navbar";
import Carousel from "react-bootstrap/Carousel";
import mapboxgl from "mapbox-gl";
import {
  Row,
  Col,
  Container,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Flash from "../message/Flash";
import Footer from "./Footer";

const ShowCampground = (props) => {
  const campground = useSelector((state) => state.camp.campground);
  const userAuthor = useSelector((state) => state.user.user);
  console.log(campground);
  const params = useParams();
  const campgroundId = params.campgroundId;
  console.log(campgroundId);
  const dispatch = useDispatch();
  const currentUser = AuthServices.getCurrentUser();
  console.log(currentUser);
  useEffect(() => {
    CampgroundSevices.getById(campgroundId)
      .then((result) => {
        dispatch(camp.setLoading(true));
        console.log(result);
        dispatch(camp.setCamp(result.data));
        dispatch(camp.setAuthor(result.data.author));

        dispatch(camp.setLoading(false));
      })

      .catch((error) => {
        console.log(error);
        if (!AuthServices.getCurrentUser) {
          dispatch(massage.setMassage("You have to Login Firts"));
          dispatch(massage.setIsError(true));
          dispatch(massage.setIsSuccses(false));
          <Navigate to="/auth/signin" />;
        }
      });
  }, []);
  useEffect(() => {
    if (campground.author !== undefined && currentUser) {
      UserService.getUserById(campground.author)
        .then((result) => {
          dispatch(user.setUser(result.data));
        })
        .catch((error) => console.log(error));
    }
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZmlyc3RtYWNoaW5lIiwiYSI6ImNreW81ajVpaDIzNnMyb3FvNDl5NHI4OW0ifQ._ef0bLUVOyJUG6icdrYeyg";
    // "pk.eyJ1IjoiZmlyc3RtYWNoaW5lIiwiYSI6ImNreW81ajVpaDIzNnMyb3FvNDl5NHI4OW0ifQ._ef0bLUVOyJUG6icdrYeyg";
    // "pk.eyJ1IjoiZmlyc3RtYWNoaW5lIiwiYSI6ImNreWJrYm1wMjBnOGQyeG84bmswZXh5d3UifQ.KUcXutatVB9TmWj0xczf3Q";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 5, // starting zoom
    });

    new mapboxgl.Marker()
      .setLngLat([-74.5, 40])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>campground.title</h3><p>campground.city</p>`
        )
      )
      .addTo(map);
  }, [campground.author]);

  return (
    <div>
      <Navbar />
      <Flash />

      <Container>
        <Row>
          <Col>
            <Carousel>
              {campground.images === undefined ||
                (campground.images.length == 0 && (
                  <Carousel.Item>
                    <img
                      className="d-block w-100 img-fluid"
                      src="https://res.cloudinary.com/firstmachine/image/upload/v1642241421/YelpCamp/fmhrca8n70wtj4ewo8by.png"
                      alt="First slide"
                      height="50%"
                    />
                  </Carousel.Item>
                ))}
              {campground.images &&
                campground.images.map((img, i) => (
                  <Carousel.Item key={i}>
                    <div style={{ height: "400px" }}>
                      <img
                        className="d-block w-100 img-fluid"
                        src={img.url}
                        alt="First slide"
                        height="50%"
                      />
                    </div>
                  </Carousel.Item>
                ))}
            </Carousel>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{campground.title} </Card.Title>
                <Card.Text> {campground.description} </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem className="text-muted">
                  {campground.city}, {campground.state}, {campground.country}
                </ListGroupItem>
                <ListGroupItem>
                  Submitted by {userAuthor.username}
                </ListGroupItem>
                <ListGroupItem>${campground.price} per night</ListGroupItem>
              </ListGroup>

              {currentUser &&
              (userAuthor.id === currentUser.id ||
                currentUser.roles[0] === "ROLE_ADMIN") ? (
                <Card.Body>
                  <EditDeleteButton campgroundId={campgroundId} />

                  <Link
                    className="btn btn-primary mt-3"
                    to={"/campgrounds/" + campgroundId + "/images/manage"}
                  >
                    Manage Image
                  </Link>
                </Card.Body>
              ) : (
                ""
              )}

              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
          </Col>

          <Col>
            <div id="map"></div>
            {currentUser && <ReviewForm campgroundId={campgroundId} />}

            {campground.reviews && campground.reviews.length > 0
              ? campground.reviews.map((review, i) => (
                  <ShowReviews
                    review={review}
                    key={i}
                    campgroundId={campgroundId}
                  />
                ))
              : ""}
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};
export default ShowCampground;
