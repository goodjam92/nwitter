import React from "react";
import { authService } from "../firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";
import nwitLogo from "../logo192.png";

const Auth = () => {
  const onSocialCilck = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <div className="logoContainer">
        <img className="appLogo" src={nwitLogo} alt="none" />
      </div>
      <AuthForm />
      <div className="authBtns">
        <button className="authBtn" name="google" onClick={onSocialCilck}>
          Continue with Google
        </button>
        <button className="authBtn" name="github" onClick={onSocialCilck}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
