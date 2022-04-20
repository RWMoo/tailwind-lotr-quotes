import React from "react";
import PropTypes from "prop-types";

const PageLayout = ({ children }) => {
  return <div>{children}</div>;
};

export default PageLayout;

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
