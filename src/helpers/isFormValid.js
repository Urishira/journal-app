import validator from "validator";

export const isFormValid = (name, email, password, password2) => {
  if (name.trim() === 0) {
    return "set name please";
  } else if (!validator.isEmail(email)) {
    return "email is not valid";
  } else if (password !== password2 || password.length < 6) {
    return "Password should be greater than to 6 characters and should be equal to password one ";
  } else {
    return true;
  }
};
