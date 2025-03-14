import React, { useEffect } from "react";
import { Spinner } from "reactstrap";

const Spinners = ({ setLoading }) => {
  return (
    <div id="loader-container" style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
      <div className="position-absolute translate-middle top-50 start-50 loading-overlay">
        <Spinner animation="border" color="dark" />
      </div>
    </div>
  );
};

export default Spinners;
