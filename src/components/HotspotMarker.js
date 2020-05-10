import Logo from "../logo.png";
import React from 'react'

const HotspotMarker = props => {
  const size = 30;

  return (
    <div>
      <img
        src={Logo}
        width={size}
        height={size}
        style={{
          cursor: "pointer",
          fill: "#d00",
          stroke: "none",
          transform: `translate(${-size / 2}px,${-size}px)`
        }}
        onClick={() => props.handler(props.slug)}
      ></img>
    </div>
  );
};

export default HotspotMarker;
