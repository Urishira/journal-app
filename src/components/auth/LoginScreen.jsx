import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { loginWithFirebase, loginWithGoogle } from "../../actions/login";
import { setErrorAction } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import { AlertError } from "./AlertError";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formValue, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formValue;
  const { msgError, loading } = useSelector(({ ui }) => ui);
  console.log(loading);

  const handleForm = (e) => {
    e.preventDefault();

    if (validator.isEmail(email) && password.length > 6) {
      dispatch(loginWithFirebase(email, password));
    }
    dispatch(setErrorAction("Account invalid"));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };
  return (
    <>
      <h3 className="auth__title">Login</h3>
      {msgError && <AlertError err={msgError} />}
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="auth__input"
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="auth__input"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-block"
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
