import React from "react";
import corona from "./corona.png";

const LoadingSpinner: React.FunctionComponent<{ text: string }> = ({
  text,
}) => (
  <>
    <div className="row text-center pt-5">
      <div className="col-4 offset-4 col-sm-2 offset-sm-5">
        <img
          src={corona}
          alt="loading-indicator"
          className="img-fluid rotating"
        />
      </div>
    </div>
    <div className="row text-center">
      <div className="col">
        <h1 className="jumbotron-heading">{text}</h1>
      </div>
    </div>
  </>
);

export default LoadingSpinner;
