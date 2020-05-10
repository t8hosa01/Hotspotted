import { Popup } from "react-map-gl";
import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import "./HotspotPopup.css";

const HotspotPopup = (props) => {
  return (
    <Popup
      tipSize={5}
      closeButton={false}
      longitude={props.longitude}
      latitude={props.latitude}
      offsetTop={-30}
    >
      <Card style={{ width: "15rem" }}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Link to={"/hotspot/" + props.slug}>
            <Button variant="customorange">Overview</Button>
          </Link>
        </Card.Body>
      </Card>
    </Popup>
  );
};

export default HotspotPopup;
