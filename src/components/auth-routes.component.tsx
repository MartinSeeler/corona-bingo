import React from "react";
import { AuthCheck, SuspenseWithPerf } from "reactfire";
import CreateUser from "./create-user.component";
import { Route, Switch } from "react-router-dom";
import CreateGame from "./create-game.component";
import GameView from "../views/game.view";
import LoadingSpinner from "./loading.component";

const AuthenticatedRoutes: React.FunctionComponent = () => (
  <SuspenseWithPerf
    traceId={"firebase-user-create"}
    fallback={<LoadingSpinner />}
  >
    <AuthCheck fallback={<CreateUser />} requiredClaims={false}>
      <Switch>
        <Route path="/" exact component={CreateGame} />
        <Route path="/:gameId" component={GameView} />
      </Switch>
    </AuthCheck>
  </SuspenseWithPerf>
);

export default AuthenticatedRoutes;
