import React, { useState, useEffect } from "react";
import { Modal, Button, Image } from "react-bootstrap";

const ViewCommentImage = (props) => {
  const [image, setImage] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    setImage(props.url);
    setUsername(props.username);
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Uploaded by {username}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image fluid src={image}></Image>
      </Modal.Body>
      {/*<Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>*/}
    </Modal>
  );
};

export default ViewCommentImage;
