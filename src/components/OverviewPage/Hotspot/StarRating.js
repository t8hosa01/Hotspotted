import React, { useState, useEffect } from "react";
import "./HotspotRating.css";

const Star = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

export const StarRating = (props) => {
  const [starsSelected, selectStar] = useState(0);

  useEffect(() => {
    if (starsSelected > 0) {
      props.onChange(starsSelected);
    }
  }, [starsSelected]);

  return (
    <div className="star-rating">
      {[...Array(props.totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => {
            selectStar(i + 1);
          }}
        />
      ))}
    </div>
  );
};

