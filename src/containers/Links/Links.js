import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import ListTableView from "./components/ListTableView";
import { bindActionCreators } from "redux";
import { getTags } from "src/store/actions/tags";
import { setLinkListViewMode } from "src/store/actions/links";
import ListGridView from "./components/ListGridView";

const Links = (props) => {
  useEffect(() => {
    props.getTags();
    // eslint-disable-next-line
  }, [props.currentDomain]);

  const onChangeViewMode = (mode) => props.setLinkListViewMode(mode);

  const onRedirectToReport = (tag) => props.history.push({
    pathname: "/report",
    search: `?tag=${tag.tag_id}`
  });

  return (
    <>
      <h4 className="font-weight-bold d-flex justify-content-between align-items-center">
        Links
        <ToggleButtonGroup
          type="radio"
          name="checkboxGroup"
          value={props.viewMode}
          onChange={onChangeViewMode}
        >
          <ToggleButton value="list"><i className="ion ion-ios-menu" /></ToggleButton>
          <ToggleButton value="grid"><i className="ion ion-md-apps" /></ToggleButton>
        </ToggleButtonGroup>
      </h4>
      {props.viewMode === "list" ? (
        <ListTableView
          onRedirectToReport={onRedirectToReport}
        />
      ) : (
        <ListGridView
          onRedirectToReport={onRedirectToReport}
        />
      )}
    </>
  )
};

export default connect(
  state => ({
    currentDomain: state.user.currentDomain,
    viewMode: state.links.viewMode,
  }),
  dispatch => bindActionCreators({
    getTags,
    setLinkListViewMode
  }, dispatch)
)(Links);
