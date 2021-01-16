import React, { useEffect } from "react";
import { useAuth } from "reactfire";
import LoadingSpinner from "./loading.component";

const CreateUser: React.FunctionComponent<{}> = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.signInAnonymously().then(
      (f) => console.log("Signin", f),
      (err) => console.log("Err", err)
    );
  });
  return <LoadingSpinner text={"Neuer Spieler wird angelegt..."} />;
};

export default CreateUser;
