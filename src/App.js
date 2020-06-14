import React, { useEffect } from "react";
import Router from "./shared/Router";

import "./vendor/styles/bootstrap.scss";
import "./vendor/styles/appwork.scss";
import "./vendor/styles/theme-corporate.scss";
import "./vendor/styles/colors.scss";
import "./vendor/styles/uikit.scss";
import "./App.scss";
import useAuth0 from "./hook/useAuth0";
import Loader from "./shared/Loader";
import { NotificationProvider } from "./hook/useNotification";
import { ModalProvider } from "./hook/useModal";

const App = () => {
  const { isAuthenticated, loading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      loginWithRedirect();
    }
    // eslint-disable-next-line
  }, [loading]);

  return loading ? <Loader /> : (
    <NotificationProvider>
      <ModalProvider>
        <Router />
      </ModalProvider>
    </NotificationProvider>
  );
};

export default App;
