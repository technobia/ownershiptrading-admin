import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dropdown, FormControl, Nav, Navbar } from "react-bootstrap";
import isArray from "lodash/isArray";
import layoutHelpers from "./helpers";
import useAuth0 from "src/hook/useAuth0";
import SingleSelect from "src/components/Form/SingleSelect";
import { bindActionCreators } from "redux";
import { setCurrentDomain } from "src/store/actions/user";
import Logo from "src/components/Logo";
import FavoriteDomain from "./FavoriteDomain";

const LayoutNavbar = (props) => {
  const [me, setMe] = useState({ picture: "", nickname: "", email_verified: false });
  const { isAuthenticated, user } = useAuth0();
  const isRTL = document.documentElement.getAttribute("dir") === "rtl";

  useEffect(() => {
    if (!!user) {
      setMe(user);
    }
  }, [user]);

  const toggleSidenav = (e) => {
    e.preventDefault();
    layoutHelpers.toggleCollapsed()
  };

  const getDomainsOptions = (domains) => domains.map((o) => ({ label: o, value: o }));

  const onChangeDomain = item => props.setCurrentDomain(item.value);

  return (
    <Navbar bg={props.navbarBg} expand="lg" className="layout-navbar align-items-lg-center container-p-x">

      {/* Brand demo (see src/demo.css) */}
      <Navbar.Brand as={NavLink} to="/" className="app-brand demo d-lg-none py-0 mr-4">
        <span className="app-brand-logo demo bg-primary"><Logo /></span>
        <span className="app-brand-text demo font-weight-normal ml-2">Tag Mahal</span>
      </Navbar.Brand>

      {/* Sidenav toggle (see src/demo.css) */}
      {props.sidenavToggle && (
        <Nav className="layout-sidenav-toggle d-lg-none align-items-lg-center mr-auto">
          <Nav.Item as="a" className="nav-link px-0 mr-lg-4" href="#toggle" onClick={toggleSidenav}>
            <i className="ion ion-md-menu text-large align-middle"/>
          </Nav.Item>
        </Nav>
      )}

      <Navbar.Toggle />

      <Navbar.Collapse>
        {/* Divider */}
        <hr className="d-lg-none w-100 my-2" />

        <Nav className="align-items-lg-center">
          {/* Search */}
          <label className="nav-item navbar-text navbar-search-box p-0 active">
            <div className="d-flex align-items-center" style={{minWidth: "250px"}}>
              <span className="mr-1">Domain:</span>
              {isArray(props.domains) ? (
                <SingleSelect
                  options={getDomainsOptions(props.domains)}
                  value={props.currentDomain}
                  isClearable={false}
                  onChange={onChangeDomain}
                />
              ) : (
                <FormControl static value={props.domains} />
              )}
            </div>
          </label>
        </Nav>

        <Nav className="align-items-lg-center ml-auto">
          <div className="mr-2 mt-2 mt-sm-0">
            <FavoriteDomain />
          </div>
          {
            isAuthenticated && (
              <Dropdown as={Nav.Item} className="demo-navbar-user" alignRight={!isRTL}>
                <Dropdown.Toggle as={Nav.Link}>
                  <span className="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
                    <img src={me.picture} className="d-block ui-w-30 rounded-circle" alt="User" />
                    <span className="px-1 mr-lg-2 ml-2 ml-lg-0">{me.nickname}</span>
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item hred="#" as={NavLink} to="/logout">
                    <i className="ion ion-ios-log-out text-danger"/> &nbsp; Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

LayoutNavbar.propTypes = {
  sidenavToggle: PropTypes.bool
};

LayoutNavbar.defaultProps = {
  sidenavToggle: true
};

export default connect(store => ({
  navbarBg: store.theme.navbarBg,
  domains: store.user.domains,
  currentDomain: store.user.currentDomain
}), dispatch => bindActionCreators({
  setCurrentDomain
}, dispatch))(LayoutNavbar)
