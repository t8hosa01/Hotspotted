import React, { useState, useEffect } from "react";
import "./frontpage.css";
import "./footer.css";
import { Toast } from "react-bootstrap";
import img from "../map.png";
import { Button } from "react-bootstrap";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";


import qs from "qs"

const Frontpage = props => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [showErrorMessage, setShowErrorMessage ] = useState(false)
    const [errorMessage, setErrorMessage ] = useState("Testi")

    useEffect(() => {
        const parsedError = qs.parse(props.location.search, {ignoreQueryPrefix: true},).error_description
        if (parsedError != undefined) {
            setShowErrorMessage(true)
            setErrorMessage(parsedError)
        }
      }, []);

    return (
        <div className="container-fluid px-0 containerStylingFP">
            <div className="jumbotron jumbotronLuokka text-secondary">
                <h1 className = "display-4">
                    HotSpotted
                </h1>
                <p>
                    By students, for students.
                </p>
                <div className = "img">
                    <img src = {img} width = "900" height = "460"/>
                </div>
                <p>
                    App made for students where you can find and create hotspots of interesting sights, restaurants, bars etc. 
                    You can search hotspots by typing on the search bar. You can see all the hotspots but to be able to create hotspot and comment on them you have to be logged in.

                </p>
                {!isAuthenticated && (
                 <Button variant="customorange" onClick={() => loginWithRedirect({})}>
                   Try now!
                </Button>
                )}
            </div>
            <footer className="footerLuokka text-secondary">
                <p className = "mb-0">Frontend: Riina, Miikka, Samuli & Sami</p>
                <p className = "mb-0">Backend: Mike, Kim, Wesley & Shane</p>
                <p className = "mb-0"><strong><Link to="/admin">Admin login</Link></strong></p>
            </footer>
            <Toast
                show={showErrorMessage}
                onClose={() => {setShowErrorMessage(false)}}
                style ={{
                    position:'absolute',
                    top:70,
                    right:10
                }}>
                <Toast.Header className = "errorMessageStyling">
                    <strong className="mr-auto">Error message</strong>
                </Toast.Header>
                <Toast.Body className = "errorMessageStyling text-secondary">{errorMessage}</Toast.Body>
            </Toast>
        </div>
    );

};
export default Frontpage;