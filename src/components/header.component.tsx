import React from "react";
import { Link } from "react-router-dom";

const Header: React.FunctionComponent = () => (
  <header className="container pb-4">
    <h1>
      <Link to="/">Corona Bingo</Link>
    </h1>
  </header>
);

export default Header;
