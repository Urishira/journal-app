import React from "react";

export const AlertError = ({ err }) => {
  return (
    <>
      <p className="auth__alert-error">{err}</p>
    </>
  );
};
