// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import "./NavBar.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/assets/index.css";
import { Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import history from "../utils/history";
import UserScoreField from "./UserScoreField"

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  /*const [fixed, setFixed] = useState("top");*/
  //const location = useLocation();

  // render navbar not fixed on map page, so elements don't render under it
 /* useEffect(() => {
    if (location.pathname.startsWith("/map/")) {
      setFixed("");
    }
  }, [location]);*/

  const findLongLat = async place_id => {
    geocodeByPlaceId(place_id)
      .then(results => {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const addr = "/map/" + lat + "/" + lng + "/16";
        history.push(addr);
      })
      .catch(error => console.error(error));
  };

  return (
    <Navbar className = "fixed-top" fill variant="customdark"  expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Button variant="customorange" className="mr-sm-2" href="/">
          Home
        </Button>
        <GooglePlacesAutocomplete
          onSelect={({ place_id }) => findLongLat(place_id)}
        />
        {isAuthenticated && (
          <UserScoreField></UserScoreField>
        )}
        {!isAuthenticated && (
          <Button variant="customorange" onClick={() => loginWithRedirect({})}>
            Log in
          </Button>
        )}
        {isAuthenticated && (
          <Button variant="customorange" onClick={() => logout()}>
            Log out
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
