import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FunctionComponent = () => (
  <footer className="text-muted">
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="my-5 pt-5 text-muted text-center text-small">
            <p>
              Ein Lockdown-Projekt von{" "}
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a href="https://martinseeler.de" target="_blank">
                Martin Seeler
              </a>
            </p>
            <Link to={"/impressum"}>Impressum</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
