import React from "react";
import { Link } from "react-router-dom";
import corona from "./corona.png";

const Header: React.FunctionComponent = () => (
  <nav className="navbar navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img
          src={corona}
          width="30"
          height="30"
          alt="Corona Bingo Icon"
          className="d-inline-block align-top"
        />
        <span className="px-2">Corona Bingo</span>
      </Link>
      <form className="form-inline">
        <Link to="/" className="btn btn-success my-2 my-sm-0">
          Neues Spiel
        </Link>
      </form>
    </div>
  </nav>
);

export default Header;
