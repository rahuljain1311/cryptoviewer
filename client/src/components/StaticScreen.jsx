import React from "react";
import PropTypes from "prop-types";
import NavbarView from "../containers/NavbarView";

export default function StaticScreen(props) {
  return (
    <div>
      <NavbarView backButton />
      <img
        alt=""
        className="img-responsive"
        src={props.src}
        onClick={props.onClick}
        style={{ position: "absolute", top: "50px", ...props.style }}
      />
    </div>
  );
}

StaticScreen.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object
};

StaticScreen.defaultProps = {
  onClick: () => {},
  style: {}
};
