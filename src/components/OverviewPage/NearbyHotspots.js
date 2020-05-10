import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Form } from "react-bootstrap";
import axios from "axios";
import "./NearbyHotspots.css";
import { useBackendAPI } from "../../utils/backendAPI";
import { calculateDistance } from './distance'

const NearbyHotspots = (props) => {
  const [nearbyHotspots, setNearbyHotspots] = useState();
  const [hotspotList, mapHotspotList] = useState();
  const { selectedHotspot } = useBackendAPI();

  const searchRange = 3000;
  let hasNearbyPlaces = true;

  useEffect(() => {
    getNearbyHotspots(props.location.longitude, props.location.latitude);
  }, []);

  useEffect(() => {
    if (nearbyHotspots) {
      _mapNearbyHotspots();
    }
  }, [nearbyHotspots, selectedHotspot]);

  const getNearbyHotspots = async (lng, lat) => {
    const address =
      process.env.REACT_APP_API_ROOT +
      "/hotspot/search?longitude=" +
      lng +
      "&latitude=" +
      lat +
      "&range=" +
      searchRange;

    const response = await axios.get(address).then((response) => {
      //console.log(response.data);
      setNearbyHotspots(response.data);
    });
  };

  const _mapNearbyHotspots = () => {
    mapHotspotList(
      nearbyHotspots
        .filter(function (spot) {
          // Filter current hotspot showing in nearby-hotspot list
          if (spot.slug === props.currentHotspot) {
            return false;
          }
          return true;
        })
        .slice(0, 5)
        // Show max. 5 hotspots in list
        .map(function (spot) {
          return (
            <NearbyListItem
              slug={spot.slug}
              name={spot.name}
              category={spot.category}
              distance={calculateDistance(
                selectedHotspot.location.latitude,
                selectedHotspot.location.longitude,
                spot.location.latitude,
                spot.location.longitude
              )}
            />
          );
        })
    );
  };

  if (nearbyHotspots && nearbyHotspots.length == 1) {
    // Check for 1 because data always contains current hotspot
    hasNearbyPlaces = false;
  }

  return (
    <div>
      <div className="nearby-header text-center">
        <a>Nearby hotspots</a>
      </div>

      {!hasNearbyPlaces && (
        <div className="hotspot-item text-center">No nearby places.</div>
      )}

      {hasNearbyPlaces && (
        <div className="nearby-list">
          <ul>{hotspotList}</ul>
        </div>
      )}
    </div>
  );
};

const NearbyListItem = (props) => {
  return (
    <li>
      <div className="hotspot-item text-center">
        <Link to={"/hotspot/" + props.slug}>
          <a>{props.name}</a>
        </Link>
        <br></br>
        <Badge variant="secondary">{props.category}</Badge>
        <small> {props.distance}</small>
      </div>
    </li>
  );
};

export default NearbyHotspots;
