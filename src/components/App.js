import React, { useEffect, useState } from "react";
import Page from "./Router";
import { authService } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, {
              displayName: user.displayName,
            }),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <Page
          isLoggedIn={Boolean(userObj)}
          refreshUser={refreshUser}
          userObj={userObj}
        />
      ) : (
        "Initializeing..."
      )}
    </>
  );
}

export default App;
