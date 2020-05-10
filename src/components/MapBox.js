import React, { useState, useEffect } from "react";
import { useBackendAPI } from "../utils/backendAPI";
import { useGoogleAPI } from "../utils/googleAPI";
import MapGL, { Marker, Popup } from "react-map-gl";
import { Row, Col } from "react-bootstrap";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAuth0 } from "../react-auth0-spa";
import HotspotMarker from "./HotspotMarker";
import HotspotPopup from "./HotspotPopup";
import NewHotspotPopup from "./NewHotspotPopup";
import SideBar from "./MapPage/SideBar";
import history from "../utils/history";
import HotspotCreation from "./HotspotCreation";
import NotLoggedInPopup from "./NotLoggedInPopup";

const Map = (props) => {
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: window.innerHeight,
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  const [initState, setInitState] = useState(true);

  const {
    updateHotSpots,
    hotSpots,
    hotspotCategories,
    hotSpotUpdateStatus,
    setHotSpotUpdateStatus,
    checkHotSpotRange,
  } = useBackendAPI();

  const { storeLocation, findNearbyPlaces } = useGoogleAPI();

  useEffect(() => {
    updateViewportFromCoordinates(
      props.match.params.lat,
      props.match.params.lng,
      props.match.params.zoom
    );
  }, [props.match.params.lat, props.match.params.lng, props.match.params.zoom]);

  const updateViewportFromCoordinates = (lat, lng, zoom) => {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    zoom = parseFloat(zoom);
    if (!(isNaN(lat) || isNaN(lng))) {
      if (lat < 90 && lat > -90) {
        setViewPort({ ...viewport, latitude: lat, longitude: lng, zoom: zoom });
      }
    }
  };

  const _onViewportChange = (viewport) => {
    if (clickLocation) {
      setClickLocation([]);
    }
    setSelectedMarker();
    setRender(false);
    if (initState) {
      setInitState(false);
    } else {
      const addr =
        "/map/" +
        viewport.latitude +
        "/" +
        viewport.longitude +
        "/" +
        viewport.zoom;
      history.push(addr);
    }
  };

  const [render, setRender] = useState(false);
  const [data, setData] = useState();
  const [markers, setMarkers] = useState();
  const [clickLocation, setClickLocation] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState();
  const [show, setShow] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleClose = () => {
    setShow(false);
    setClickLocation([]);
    updateHotSpots(viewport);
  };

  const handleShow = (props) => {
    findNearbyPlaces();
    setShow(true);
  };

  const onClickMap = (e) => {
    const [longitude, latitude] = e.lngLat;
    setSelectedMarker();
    setRender(false);
    if (clickLocation.length > 0) {
      setClickLocation([]);
    } else {
      setClickLocation((clickLocation) => [
        ...clickLocation,
        { longitude, latitude },
      ]);
      storeLocation(longitude, latitude);
    }
    console.log(clickLocation);
  };

  const _onClickMarker = (clickedMarker) => {
    if (clickedMarker === selectedMarker) {
      //if user clicks same marker again
      setSelectedMarker("");
      setRender(false);
      return;
    }

    setSelectedMarker(clickedMarker);
    setClickLocation([]);

    if (!render) {
      setRender(true);
    }
  };

  const loadMarkers = () => {
    console.log(data);
    setMarkers(
      data.map((spot) => {
        return (
          <div>
            <Marker
              key={spot.slug}
              latitude={parseFloat(spot.location.latitude)}
              longitude={parseFloat(spot.location.longitude)}
            >
              <HotspotMarker handler={_onClickMarker} slug={spot.slug} />
            </Marker>
            {render && spot.slug == selectedMarker && (
              <HotspotPopup
                longitude={parseFloat(spot.location.longitude)}
                latitude={parseFloat(spot.location.latitude)}
                name={spot.name}
                description={spot.description}
                slug={spot.slug}
              />
            )}
          </div>
        );
      })
    );
  };

  useEffect(() => {
    checkHotSpotRange(viewport);
  }, [viewport]);

  useEffect(() => {
    if (hotSpotUpdateStatus) {
      setHotSpotUpdateStatus(false);
      updateHotSpots(viewport);
    }
  }, [hotSpotUpdateStatus]);

  useEffect(() => {
    setData(hotSpots);
  }, [hotSpots]);

  useEffect(() => {
    if (data) {
      loadMarkers();
    }
  }, [selectedMarker, render, data]);

  return (
    <div className="container-fluid">
      <Row>
        <Col md={2} className="px-0">
          <SideBar viewport={viewport}/>
        </Col>
        <div className="col-md-9 ml-sm-auto col-lg-10 px-0">
          <MapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/t8hosa01/ck6q8al1o1ty61io620yyt0o1"
            onViewportChange={_onViewportChange}
            onClick={() => setRender(false)}
            onClick={onClickMap}
          >
            {!isAuthenticated && (
              <NotLoggedInPopup
                show={show}
                onHide={handleClose}
              ></NotLoggedInPopup>
            )}
            {isAuthenticated && (
              <HotspotCreation
                lngLat={clickLocation}
                show={show}
                onHide={handleClose}
              ></HotspotCreation>
            )}

            {clickLocation.map((m, i) => (
              <NewHotspotPopup
                {...m}
                key={i}
                openModal={handleShow}
              ></NewHotspotPopup>
            ))}

            {clickLocation.map((m, i) => (
              <Marker {...m} key={i}>
                <HotspotMarker handler={_onClickMarker}></HotspotMarker>
              </Marker>
            ))}

            {markers}
          </MapGL>
        </div>
      </Row>
    </div>
  );
};

export default Map;
