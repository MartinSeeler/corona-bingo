import React from "react";
import corona from "./corona.png";

const LoadingSpinner: React.FunctionComponent = () => (
  <div className="row">
    <div className="col-4 offset-4">
      <img
        src={corona}
        alt="loading-indicator"
        className="img-fluid rotating"
      />
    </div>
  </div>
);

export default LoadingSpinner;
