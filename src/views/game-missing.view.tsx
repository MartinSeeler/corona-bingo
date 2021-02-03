import React from "react";
import { Redirect } from "react-router-dom";

const GameMissingView: React.FunctionComponent = () => <Redirect to={"/"} />;

export default GameMissingView;
