import React, { useEffect } from "react";
import { useAuth } from "reactfire";

const CreateUser: React.FunctionComponent<{}> = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.signInAnonymously().then(
      (f) => console.log("Signin", f),
      (err) => console.log("Err", err)
    );
  });
  return <div>Hello Create User</div>;
};

export default CreateUser;
