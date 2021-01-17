import React from "react";
import { AuthCheck, SuspenseWithPerf } from "reactfire";
import CreateUser from "./create-user.component";
import { Route, Switch } from "react-router-dom";
import CreateGame from "./create-game.component";
import GameView from "../views/game.view";
import LoadingSpinner from "./loading.component";
import { ToastContainer } from "react-toastify";

const AuthenticatedRoutes: React.FunctionComponent = () => (
  <SuspenseWithPerf
    traceId={"firebase-user-create"}
    fallback={<LoadingSpinner text={"Spiel wird geladen..."} />}
  >
    <AuthCheck fallback={<CreateUser />} requiredClaims={false}>
      <Switch>
        <Route path="/" exact component={CreateGame} />
        <Route path="/:gameId" component={GameView} />
      </Switch>
    </AuthCheck>
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
    />
  </SuspenseWithPerf>
);

export default AuthenticatedRoutes;
