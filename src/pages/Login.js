import "./Login.css"

import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import googlePng from "../assets/google-logo 1.png"
import logo from "../assets/musicLogo.png";

import { signInWithGoogleRedirect, auth } from "../config/firebase-config";
import { getRedirectResult } from "firebase/auth";
import { vaildateUser } from '../features/authSlice'
import { useEffect, useState } from "react";

import CircularProgress from '@mui/material/CircularProgress';

function LoadingLogin() {

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <CircularProgress sx={{ color: "#FFFFFF", width: "5rem" }} />
    </div>
  );
}

const LoginProcess = () => {

  return (
    <div className="showing-event">
      <h1 style={{ textAlign: "center", color: "#FFFFFF" }} >Processing...</h1>
    </div>
  )
}

const ErrorDisplay = ({ errorMsg }) => {

  return (
    <div className="showing-event">
      <h1 style={{ textAlign: "center", color: "#FFFFFF" }} >{errorMsg}</h1>
    </div>
  )
}


export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, isAuth, error } = useSelector((state) => state.auth);
  const [loginProcess, setLoginProcess] = useState(false || window.localStorage.getItem("loginProcess"))

  const loginWithGoogle = async () => {
    console.log("signInWithGoogleRedirect working");
    setLoginProcess(true);
    window.localStorage.setItem("loginProcess", true);
    try {
      await signInWithGoogleRedirect();
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("Woriking getRedirectResult");
        }
      }).catch((error) => {
        console.log(error);
      });

  }, [])

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((result) => {
      if (result) {
        const token = result.accessToken;
        dispatch(vaildateUser(token));
      }
    })
    return () => unSubscribe();
  }, [dispatch])


  useEffect(() => {
    if (isAuth === true) {
      window.localStorage.removeItem("loginProcess");
      navigate("/");
    }

    if (status === "loading" || status === "failed") {
      setLoginProcess(false);
    }
  }, [status, isAuth, navigate])


  return (
    <div className="loginContainer">



      {loginProcess && < LoginProcess />}
      {status === "failed" && < ErrorDisplay errorMsg={error} />}

      {status === "loading" ? (< LoadingLogin />) : (
        <div className="loginContainer-items">

          <div>
            <img src={logo} alt="logo" width={150} />
            <h3>Welcome to Play On <br /> music stremming application <br />
              To play songs login with google account. </h3>
          </div>

          {!loginProcess &&
            <Button onClick={loginWithGoogle} sx={{ backgroundColor: "#0E0E0E", border: "1px solid #FFFFFF", borderRadius: "30px", ":hover": { backgroundColor: "#282828" } }} variant="contained" startIcon={<img src={googlePng} alt="logo" />}>
              Continue with Google
            </Button>
          }
        </div>
      )}

    </div>
  );


}
