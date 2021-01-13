import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FunctionComponent = () => (
  <footer className="container pt-4">
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <p>
          Ein Lockdown-Projekt
          <br />
          von{" "}
          <a href="https://martinseeler.de" target="_blank">
            Martin Seeler
          </a>
        </p>
        <Link to={"/impressum"}>Impressum</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
