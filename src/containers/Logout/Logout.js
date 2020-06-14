import { useEffect } from "react";
import useAuth0 from "../../hook/useAuth0";
import { connect } from "react-redux";

const Logout = (props) => {
  const { logout } = useAuth0();

  useEffect(() => {
    props.exit();
    logout();
    localStorage.clear();
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, dispatch => ({
  exit: () => dispatch({ type: "LOGOUT" })
}))(Logout);
