import React, { useEffect } from "react";
import { useBackendAPI } from "../../utils/backendAPI";
import { Container, Jumbotron, Row, Col, Badge } from "react-bootstrap";
import "../frontpage.css";
import "./OverviewPage.css";
import OpeningHoursTable from "./Hotspot/OpeningHoursTable";
import HotspotContainer from "./Hotspot/HotspotContainer";
import NearbyHotspots from "./NearbyHotspots";
import CommentContainer from "./Comments/CommentContainer";


const OverviewPage = (props) => {
  const { selectedHotspot, getHotspotWithSlug } = useBackendAPI();

  useEffect(() => {
    getHotspotWithSlug(props.match.params.slug);
  }, [props.match.params.slug]);

  if (!selectedHotspot) {
    return <div> loading...</div>;
  }

  if (selectedHotspot)
    return (
      <Container className = "containerStyling">
        <Jumbotron className="custombg-primary text-center border-custom jumbotronStyleOP text-secondary">
          <h1 className="display-4">{selectedHotspot.name}</h1>
          <p>
            <Badge variant="secondary">{selectedHotspot.category}</Badge>{" "}
            {selectedHotspot.description}
          </p>
        </Jumbotron>
        <Row>
          <Col
            className="custombg-primary hotspotInfo-container rounded border-custom"
            md={8}
          >
            <HotspotContainer hotspotInfo={selectedHotspot} />
          </Col>
          <Col
            className="custombg-primary openingHours-container rounded border-custom"
            md={{ span: 3, offset: 1 }}
          >
            <OpeningHoursTable openingHours={selectedHotspot.openingHours} />
          </Col>
        </Row>
        <Row>
          <Col
            className="custombg-primary hotspotComments-container rounded border-custom"
            md={8}
          >
            <CommentContainer
              slug={props.match.params.slug}
              comments={selectedHotspot.comments}
            />
          </Col>
          <Col
            className=" custombg-primary nearbyHotspots-container rounded border-custom"
            md={{ span: 3, offset: 1 }}
          >
            <NearbyHotspots currentHotspot={selectedHotspot.slug} location={selectedHotspot.location} />
          </Col>
        </Row>
      </Container>
    );
};
export default OverviewPage;
