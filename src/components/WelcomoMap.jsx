import "../styles/WelcomeMap.css";

function WelcomeMap({ focusRef }) {
  return (
    <div className="map" ref={focusRef} tabIndex={-1}>
      Map
    </div>
  );
}

export default WelcomeMap;
