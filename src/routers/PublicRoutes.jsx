import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

const PublicRoutes = ({ isAuthenticated, component: Component, ...rest }) => {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      component={(prop) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...prop} />
      }
    />
  );
};

PublicRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PublicRoutes;
