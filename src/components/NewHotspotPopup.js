import { Popup } from "react-map-gl";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const HotspotPopup = props => {

  const { isAuthenticated, loginWithRedirect, logout} = useAuth0();

  return (
    <Popup
      tipSize={5}
      anchor="bottom"
      closeButton={false}
      offsetTop={-30}
      longitude={props.longitude}
      latitude={props.latitude}
    >
      <Card border="warning" style={{ width: "11rem" }}>
        <Card.Body>
          <>
            <style type="text/css">
              {`
              .btn-orange {
              background-color: #e8630a;
              color: white;
              }
            `}
            </style>
          </>
            <Button variant="orange" onClick = {() => props.openModal()}>
              Create Hotspot
            </Button>
        </Card.Body>
      </Card>
    </Popup>
  );
};

export default HotspotPopup;
