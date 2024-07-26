"use client";
import { useState, useEffect } from "react";

const useGapiScript = () => {
  const [gapiLoaded, setGapiLoaded] = useState(false);

  useEffect(() => {
    const loadGapiScript = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        if (typeof window !== "undefined" && window.gapi) {
          window.gapi.load("client:auth2", () => {
            setGapiLoaded(true);
          });
        }
      };
      document.body.appendChild(script);
    };

    loadGapiScript();
  }, []);

  return gapiLoaded;
};

export default function Dashboard() {
  const [isGoogleApiInit, setIsGoogleApiInit] = useState(false);
  const [isGoogleInit, setIsGoogleInit] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const gapiLoaded = useGapiScript();

  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  useEffect(() => {
    if (gapiLoaded) {
      const initGApiClient = async () => {
        await window.gapi.client.init({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        setIsGoogleApiInit(true);
        const authInstance = window.gapi.auth2.getAuthInstance();
        // console.log(`authInstance from useEffect ${authInstance}`);
        if (authInstance.isSignedIn.get()) {
          setAccessToken(
            authInstance.currentUser.get().getAuthResponse().access_token
          );
        }
        setIsGoogleInit(true);
      };

      initGApiClient();
    }
  }, []);

  const handleSignIn = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signIn().then((user) => {
      setAccessToken(user.getAuthResponse().access_token);
    });
  };

  return (
    <div>
      <div>
        <button onClick={handleSignIn}>Sign in with Google</button>
        {isGoogleInit && <div>Google API Initialized</div>}
      </div>
    </div>
  );
}
