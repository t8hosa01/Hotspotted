import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useBackendAPI } from "../utils/backendAPI";
import { useAuth0 } from "../react-auth0-spa";

const UserScoreField = () => {
    const { findUserScore, userScore } = useBackendAPI();
    const { user } = useAuth0();
    const [ userScoreFound, setUserScoreFound ] = useState(false);

    useEffect(() => {
        setUserScoreFound(false)
        console.log(user)
        findUserScore();
      }, [user]);

      useEffect(() => {
          if (userScore > -1) {
            setUserScoreFound(true)
          }
      }, [userScore])

    return (
    <div style={{fontSize: "2rem"}}>
        {userScoreFound && (
        <span className="fa-layers fa-lg">
            <i className="fas fa-star" style={{color: 'yellow'}}></i>
            <span className="fa-layers-text" data-fa-transform="shrink-11 right-1 down-1" style={{fontWeight:800}}>{userScore}</span>
        </span>
        )}
    </div>
    )
};

export default UserScoreField;