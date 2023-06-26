import { bcrypt } from "../../deps.js";
import { validasaur } from "../../deps.js";
import * as userService from "../../services/userService.js";

const validationRules = {
  email: [validasaur.isEmail, validasaur.required],
  password: [validasaur.minLength(4), validasaur.required],
};

const getUserData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    email: params.get("email"),
    password: params.get("password"),
  }
}

const registerUser = async ({ request, response, render }) => {
  const data = await getUserData(request);

  const check = await userService.findUserByEmail(data.email);
  if (check.length > 0) {
    data.error = "An account already exists with this email.";
    render("registration.eta", data);
    return
  }

  const [passes, errors] = await validasaur.validate(data, validationRules);

  if (!passes) {
    data.errors = errors;
    render("registration.eta", data);
    return
  } else {
    await userService.addUser(
      data.email,
      await bcrypt.hash(data.password),
    );
    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta", {email: ""});
};

export { registerUser, showRegistrationForm };