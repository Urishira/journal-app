import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

const PublicRoutes = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(prop) =>
        !isAuthenticated ? <Component {...prop} /> : <Redirect to="/" />
      }
    />
  );
};

PublicRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PublicRoutes;
