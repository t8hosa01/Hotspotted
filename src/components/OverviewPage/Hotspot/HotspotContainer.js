import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HotspotContainer.css";
import HotspotRating from "./HotspotRating.js";
import HotspotActions from "./HotspotActions.js";

const HotspotContainer = (props) => {
  const parseLocalTime = (timeString) => {
    return timeString.slice(0, 10) + " " + timeString.slice(11, 19);
  };

  const creationDate = parseLocalTime(props.hotspotInfo.createdAt);

  return (
    <div className="cont">
      <div className="hotspot-header">
        <div>
          <a>{props.hotspotInfo.name}</a>
        </div>
      </div>
      <div className="hotspot-info">
        <div className="hotspot-address">
          <ul>
            <li>
              <i className="hotspot-details-icon fas fa-map-marker-alt"></i>{" "}
              {props.hotspotInfo.address.address}
              {","} {props.hotspotInfo.address.postalCode}{" "}
              {props.hotspotInfo.address.city}
            </li>
            <li>
              <i class="hotspot-details-icon fas fa-flag"></i>
              {props.hotspotInfo.address.country}
            </li>
          </ul>
          <div className="hotspot-creator-info">
            Created by {props.hotspotInfo.creator.nickname} <br />
            <small>{creationDate}</small>
          </div>
          <div className="hotspot-link">
            <Link
              to={
                "/map/" +
                props.hotspotInfo.location.latitude +
                "/" +
                props.hotspotInfo.location.longitude +
                "/16"
              }
            >
              <Button className="view-button" variant="customorange">
                Show on map
              </Button>
            </Link>
          </div>
        </div>
        <HotspotRating
          ratingAverage={props.hotspotInfo.ratingAverage}
          ratings={props.hotspotInfo.ratings}
          slug={props.hotspotInfo.slug}
        />
        <HotspotActions hotspotData={props.hotspotInfo} />
      </div>
    </div>
  );
};

export default HotspotContainer;
