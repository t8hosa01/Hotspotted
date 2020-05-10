import React, { useState, useEffect } from "react";
import { Image, Row } from "react-bootstrap";

const Comment = (props) => {
  const [thumbnail, setThumbnail] = useState("");
  const [hasPicture, setHasPicture] = useState(false);

  const thumbnailParams = "w_90,h_90/";
  //TODO: better string formatting/searching for baseUrl
  //      style thumbnail in right place

  useEffect(() => {
    if (props.commentImage) {
      setHasPicture(true);
      generateThumbnailUrl();
    }
  }, []);

  const generateThumbnailUrl = () => {
    const baseUrl = props.commentImage.imageUrl.slice(0, 49);
    const fileUrl = props.commentImage.imageUrl.slice(49);
    const thumb = baseUrl + thumbnailParams + fileUrl;
    setThumbnail(thumb);
    //console.log("base url: " + baseUrl);
    //console.log("file url: " + fileUrl);
  };

  return (
    <Row className="userComment">
      <Image className="user-img" src={props.userPicture} rounded></Image>
      <div className="comment-details">
        <p className="comment-info">
          {props.userName} on {props.createdAt}
        </p>
        <p className="comment-text">{props.commentText}</p>
      </div>
      {hasPicture && thumbnail && (
        <Image
          onClick={() => props._onClick(props.commentImage.imageUrl,props.userName)}
          src={thumbnail}
          className="comment-picture"
        ></Image>
      )}
    </Row>
  );
};

export default Comment;
