import React, { useEffect } from "react";
import "./app.scss";
import { preloadAuth, preloadDatabase, useFirebaseApp } from "reactfire";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Impressum from "./views/impressum.view";
import firebase from "firebase";
import AuthenticatedRoutes from "./components/auth-routes.component";
import Header from "./components/header.component";
import Footer from "./components/footer.component";

const preloadSDKs = (firebaseApp: any) => {
  return Promise.all([
    preloadDatabase({ firebaseApp }),
    preloadAuth({ firebaseApp }),
  ]);
};

function App() {
  const firebaseApp = useFirebaseApp();
  useEffect(() => {
    firebaseApp
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => preloadSDKs(firebaseApp));
  });
  return (
    <Router>
      <Header />
      <main role="main" className="container">
        <Switch>
          <Route path="/about" component={Impressum} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/" component={AuthenticatedRoutes} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
