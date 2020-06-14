import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Sidenav from 'src/vendor/libs/sidenav'
import Logo from "src/components/Logo";
import layoutHelpers from './helpers'

class LayoutSidenav extends Component {
  layoutSidenavClasses() {
    let bg = this.props.sidenavBg

    if (this.props.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
      bg = bg
        .replace(' sidenav-dark', '')
        .replace(' sidenav-light', '')
        .replace('-darker', '')
        .replace('-dark', '')
    }

    return `bg-${bg} ` + (
      this.props.orientation !== 'horizontal'
        ? 'layout-sidenav'
        : 'layout-sidenav-horizontal container-p-x flex-grow-0'
    )
  }

  toggleSidenav(e) {
    e.preventDefault()
    layoutHelpers.toggleCollapsed()
  }

  isMenuActive(url) {
    return this.props.location.pathname.indexOf(url) === 0
  }

  isMenuOpen(url) {
    return this.props.location.pathname.indexOf(url) === 0 && this.props.orientation !== 'horizontal'
  }

  render() {
    return (
      <Sidenav orientation={this.props.orientation} className={this.layoutSidenavClasses()}>
        {/* Brand demo (see src/demo.css) */}
        {this.props.orientation !== 'horizontal' && (
          <React.Fragment>
            <div className="app-brand demo">
              <span className="app-brand-logo demo bg-primary"><Logo /></span>
              <Link to="/" className="app-brand-text demo sidenav-text font-weight-normal ml-2">Tag Mahal</Link>
              <a href="#toggle" className="layout-sidenav-toggle sidenav-link text-large ml-auto" onClick={this.toggleSidenav}>
                <i className="ion ion-md-menu align-middle"/>
              </a>
            </div>
            <Sidenav.Divider className="mt-0" />
          </React.Fragment>
        )}

        {/* Inner */}
        <div className={`sidenav-inner ${this.props.orientation !== 'horizontal' ? 'py-1' : ''}`}>
          <Sidenav.RouterLink exact to="/" icon="ion ion-ios-speedometer">Dashboard</Sidenav.RouterLink>
          <Sidenav.RouterLink
            exact
            to="/tags"
            icon="ion ion-ios-pricetags"
            active={this.props.match.path.includes("/tags")}
          >
            Tags
          </Sidenav.RouterLink>
          <Sidenav.RouterLink exact to="/media" icon="ion ion-md-cloud-upload">Media</Sidenav.RouterLink>
          <Sidenav.RouterLink exact to="/report" icon="ion ion-ios-list-box">Report</Sidenav.RouterLink>
          <Sidenav.RouterLink exact to="/links" icon="ion ion-ios-pulse">Links</Sidenav.RouterLink>
        </div>
      </Sidenav>
    )
  }
}

LayoutSidenav.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal'])
}

LayoutSidenav.defaultProps = {
  orientation: 'vertical'
}

export default connect(store => ({
  sidenavBg: store.theme.sidenavBg
}))(LayoutSidenav)
