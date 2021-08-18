import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { startRegisterWithPasswordName } from '../../redux/actions/login';
import { removeError } from '../../redux/actions/ui';
import { userSchema } from '../../validations/UserValidation';
import { AlertError } from './AlertError';

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const isValid = await userSchema.isValid(formValue);
    console.log(isValid);
    if (isValid) {
      dispatch(removeError());
      dispatch(startRegisterWithPasswordName(email, password, name));
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
