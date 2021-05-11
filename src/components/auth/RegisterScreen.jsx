import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startRegisterWithPasswordName } from "../../actions/login";
import { removeError, setErrorAction } from "../../actions/ui";
import { isFormValid } from "../../helpers/isFormValid";
import { useForm } from "../../hooks/useForm";
import { AlertError } from "./AlertError";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formValue, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formValue;

  const { msgError } = useSelector(({ ui }) => ui);
  const formValidate = isFormValid(name, email, password, password2);
  const handleRegister = (e) => {
    e.preventDefault();

    if (typeof formValidate === "boolean") {
      dispatch(removeError());
      dispatch(startRegisterWithPasswordName(email, password, name));
    } else {
      dispatch(setErrorAction(formValidate));
    }
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      {msgError && <AlertError err={msgError} />}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          className="auth__input"
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          className="auth__input"
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
