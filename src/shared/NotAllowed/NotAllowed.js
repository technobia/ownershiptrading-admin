import React from "react";
import styles from "./NotAllowed.module.scss";
import { Button } from "react-bootstrap";
import useAuth0 from "src/hook/useAuth0";

const NotAllowed = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.Container}>
      <div className="text-center">
        <h2 className={styles.Message}>Your account not allow to using system</h2>
        <Button
          variant="success"
          className={styles.button}
          onClick={loginWithRedirect}
        >
          Login with another account
        </Button>
      </div>
    </div>
  );
};

export default NotAllowed;
