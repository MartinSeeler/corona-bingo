import React from "react";
import corona from "./corona.png";

const LoadingSpinner: React.FunctionComponent<{ text: string }> = ({
  text,
}) => (
  <section className="jumbotron">
    <div className="container text-center">
      <h1 className="jumbotron-heading">{text}</h1>
      <p className="lead text-muted">
        <img
          src={corona}
          width={128}
          alt="loading-indicator"
          className="img-fluid rotating"
        />
      </p>
    </div>
  </section>
);

export default LoadingSpinner;
