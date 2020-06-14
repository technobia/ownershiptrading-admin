import React, { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import cs from "classnames";
import localStorage from "src/utils/localStorage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setCurrentDomain } from "src/store/actions/user";

const DropdownItem = ({ children, className }) => (<div className={cs("dropdown-item", className)}>{children}</div>);

const FavoriteDomain = (props) => {
  const favoriteDomains = localStorage.getObject("favorite-domains", []);
  const [domains, setDomains] = useState([]);
  const [favorite, setFavorite] = useState(favoriteDomains);
  const [title, setTitle] = useState("+ Add favorite domain");

  useEffect(() => {
    const _domains = props.domains.filter(item => !favorite.includes(item));
    setDomains(_domains);
    // eslint-disable-next-line
  }, [favorite]);

  useEffect(() => {
    if (favorite.includes(props.currentDomain)) {
      setTitle(props.currentDomain);
    } else {
      setTitle("+ Add favorite domain")
    }
    // eslint-disable-next-line
  }, [props.currentDomain, favorite]);

  const handleAddDomain = (domain) => {
    if (!favorite.includes(domain)) {
      const _favorite = [...favorite];
      _favorite.push(domain);
      _favorite.sort();
      setFavorite(_favorite);
      localStorage.setObject("favorite-domains", _favorite);
    }
  };

  const handleRemoveDomain = (domain) => {
    const _favorite = favorite.filter(item => item !== domain);
    setFavorite(_favorite);
    localStorage.setObject("favorite-domains", _favorite);
  };

  const handleSelectFavoriteDomain = (domain) => props.setCurrentDomain(domain);

  return (
    <div className="d-flex align-items-center">
      <span className="text-muted mr-2 d-none d-sm-inline-block">Favorite domain:</span>
      <DropdownButton variant="outline-success" title={title} className="dropdown-toggle-hide-arrow" alignRight>
        {favorite.map(item => (
          <Dropdown.Item as={DropdownItem} key={item} className="d-inline-flex align-items-center justify-content-between bg-transparent text-body">
            <div className="cursor-pointer" onClick={() => handleSelectFavoriteDomain(item)}>{item}</div>
            <Button size="sm" variant="outline-danger icon-btn borderless" className="ml-3" onClick={() => handleRemoveDomain(item)}>
              <i className="ion ion-md-remove-circle-outline" />
            </Button>
          </Dropdown.Item>
        ))}

        <div className="dropdown-toggle">
          <Dropdown.Item><span className="text-primary">Add new domain</span></Dropdown.Item>
          <div className="dropdown-menu dropdown-menu-right" style={{ maxHeight: "calc(36px * 10 + 10px)", overflow: "auto" }}>
            {domains.length ? domains.map((item) => (
              <Dropdown.Item key={item} onClick={() => handleAddDomain(item)}>{item}</Dropdown.Item>
            )) : (
              <Dropdown.Item className="text-muted bg-transparent">Empty result</Dropdown.Item>
            )}
          </div>
        </div>
      </DropdownButton>
    </div>
  )
};

export default connect(
  state => ({
    currentDomain: state.user.currentDomain,
    domains: state.user.domains,
  }), dispatch => bindActionCreators({
    setCurrentDomain
  }, dispatch)
)(FavoriteDomain);
