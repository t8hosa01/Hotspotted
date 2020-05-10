import React, { useState, useEffect } from "react";
import {
  Image,
  Row,
  Button,
  InputGroup,
  FormControl,
  Modal,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useBackendAPI } from "../../../utils/backendAPI";

const PostComment = (props) => {
  const {
    createHotspotComment,
    hotSpotCommentCreationResolved,
    getHotspotWithSlug,
    selectedHotspot,
  } = useBackendAPI();
  const [commentText, setCommentText] = useState("");
  const [commentFile, setCommentFile] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [verificationResolved, setVerificationResolved] = useState(false);

  useEffect(() => {
    setVerificationPending(false);
    setShowVerificationModal(false);
    setVerificationResolved(false);
  }, [selectedHotspot]);

  const _onTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const _onfileChange = (e) => {
    console.log(e.target.files[0]);
    setCommentFile(e.target.files[0]);
  };

  //TODO: style input button
  // check if comment gets posted
  // empty comment data after post
  const _postComment = () => {
    createHotspotComment(commentFile, props.slug, commentText);
    setCommentText("");
    setVerificationPending(true);
    setShowVerificationModal(true);
  };

  useEffect(() => {
    if (
      hotSpotCommentCreationResolved &&
      hotSpotCommentCreationResolved.status == 200
    ) {
      setVerificationPending(false);
      setVerificationResolved(true);
    }
  }, [hotSpotCommentCreationResolved]);

  const _closeVerificationModal = () => {
    setVerificationPending(false);
    setShowVerificationModal(false);
    setVerificationResolved(false);
    getHotspotWithSlug(props.slug);
  };

  return (
    <Row>
      <InputGroup>
        <Image
          className="post-user-img"
          src={props.userPicture}
          rounded
        ></Image>
        <div className="comment-details">
          <p className="comment-info">Commenting as {props.userName}</p>
          <FormControl
            onChange={_onTextChange}
            className="post-form rounded"
            as="textarea"
            rows="2"
          />
        </div>
        <label
          className={`upload-button text-center ${
            commentFile == null ? "" : "file-selected"
          }`}
        >
          ...
          <input type="file" id="file-upload" onChange={_onfileChange} />
        </label>
        <Button
          variant="post-button"
          onClick={_postComment}
          className="post-button"
        >
          post
        </Button>
      </InputGroup>

      <Modal
        show={showVerificationModal}
        onHide={_closeVerificationModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sending comment..</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {verificationPending && (
            <Spinner animation="border" role="status">
              {" "}
            </Spinner>
          )}

          {verificationResolved && (
            <Alert variant="success">Comment successfully posted.</Alert>
          )}
        </Modal.Body>
      </Modal>
    </Row>
  );
};

export default PostComment;
