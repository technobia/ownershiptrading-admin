import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "src/vendor/libs/react-toastify/react-toastify.scss";

const CloseButton = ({ closeToast }) => (
  <button
    className="Toastify__close-button"
    type="button"
    aria-label="close"
    onClick={closeToast}>&times;</button>
);

export const NotificationContext = React.createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const defaultOptions = {
    position: "top-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  };

  const handleShow = (message, type) => toast(message, {
    type,
    ...defaultOptions
  });

  const isRTL = document.documentElement.getAttribute("dir") === "rtl";

  return (
    <NotificationContext.Provider
      value={{
        showSuccess: (msg) => handleShow(msg, "success"),
        showError: (msg) => handleShow(msg, "error")
      }}
    >
      {children}
      <ToastContainer
        autoClose={5000}
        newestOnTop
        closeButton={<CloseButton />}
        rtl={isRTL}
      />
    </NotificationContext.Provider>
  );
};

export default useNotification;
