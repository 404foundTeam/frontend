import React, { useEffect, useRef } from "react";

const { kakao } = window;

const Map = () => {
  const container = useRef(null);

  useEffect(() => {
    const position = new kakao.maps.LatLng(35.114513, 129.039346);
    const options = {
      center: position,
      level: 3,
    };

    new kakao.maps.Map(container.current, options);
  }, []);

  return <div ref={container} style={{ width: "700px", height: "400px" }} />;
};

export default Map;
