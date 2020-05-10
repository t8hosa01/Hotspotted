import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useBackendAPI } from "../../../utils/backendAPI";
import { StarRating } from "./StarRating";
import { useAuth0 } from "../../../react-auth0-spa";

const HotspotRating = (props) => {
  const {isAuthenticated } = useAuth0();

  const {
    rateHotspot,
    rateHotSpotResolved,
    getHotspotWithSlug,
    selectedHotspot,
  } = useBackendAPI();

  const [ratingSent, setRatingSent] = useState(false);

  const [ratingCount, setRatingCount] = useState(0);
  const [userRating, setUserRating] = useState();
  const [hasRatings, setHasRatings] = useState(false);

  useEffect(() => {
    if (props.ratings) setRatingCount(props.ratings.length);
    if (props.ratings.length > 0) {
      setHasRatings(true);
    }
  }, []);

  useEffect(() => {
    setRatingSent(false);
  }, [selectedHotspot]);

  const _handleChange = (starsSelected) => {
    setUserRating(starsSelected);
  };

  const _rateHotspot = () => {
    const rating = {
      rating: userRating,
    };
    setRatingSent(true);
    rateHotspot(rating, props.slug);
  };

  useEffect(() => {
    if (
      ratingSent &&
      rateHotSpotResolved &&
      rateHotSpotResolved.status == 200
    ) {
      getHotspotWithSlug(props.slug);
    }
  }, [rateHotSpotResolved]);

  return (
    <div className="hotspot-rating">
      <div className="rating-header text-center">Ratings</div>
      <div className="avg-rating"></div>
      {hasRatings && (
        <a>
          Average rating: {props.ratingAverage}
          <i className="rating-details-icon fas fa-star"></i>{" "}
        </a>
      )}
      {!hasRatings && <a>No ratings yet.</a>}
      {isAuthenticated ? (
      <div className="rating-actions">
        <StarRating onChange={_handleChange} totalStars={5} />
        <Button onClick={_rateHotspot} variant="" className="rate-button">
          rate
        </Button>
      </div>) : (<p>You must be logged in to rate hotspots.</p>)}
      <div className="rated-by">
        {hasRatings && (
          <a>
            Rated by {ratingCount} student{ratingCount > 1 ? "s" : ""}
          </a>
        )}
      </div>
    </div>
  );
};

export default HotspotRating;
