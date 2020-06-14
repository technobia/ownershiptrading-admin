// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import last from "lodash/last";
import isArray from "lodash/isArray";
import store from "../store";
import { SET_USER } from "../store/reducers/user";
import localStorage from "src/utils/localStorage";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=") &&
        window.location.search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
        const role = last(get(user, "app_metadata.roles"));
        const domains = get(user, "app_metadata.domains");
        const exitsDomain = localStorage.get("domain", "");
        const currentDomain = exitsDomain
          ? exitsDomain
          : isArray(domains)
            ? domains[0]
            : domains;

        store.dispatch({
          type: SET_USER,
          payload: {
            ...user,
            role,
            currentDomain,
            domains,
          }
        });

        if (!exitsDomain) {
          localStorage.set("domain", currentDomain);
        }

        if (isEmpty(domains)) {
          window.history.replaceState({}, document.title, "/not-allowed");
        }

        // Set token
        const { __raw } = await auth0FromHook.getIdTokenClaims();
        localStorage.set("token", __raw);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => auth0Client.logout({
    returnTo: window.location.origin
  });

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        logout,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export default useAuth0;
