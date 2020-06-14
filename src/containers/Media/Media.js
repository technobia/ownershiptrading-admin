import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const Media = (props) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (props.domains.length) {
      setUrl(`http://files.${props.currentDomain}/files#`);
    } else {
      setUrl(`http://${props.currentDomain}/files#`);
    }
    // eslint-disable-next-line
  }, [props.currentDomain]);

  return (
    <>
      <h4 className="font-weight-bold">Media</h4>
      <iframe src={url} frameBorder="0" width="100%" height="500px" title={url}/>
    </>
  )
};

export default connect(state => ({
  currentDomain: state.user.currentDomain,
  domains: state.user.domains
}))(Media);
