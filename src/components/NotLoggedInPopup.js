import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal"

const NotLoggedInPopup = props => {
    return(
        <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You are not logged in!
            </Modal.Body>
        </Modal>
    );
}

export default NotLoggedInPopup;