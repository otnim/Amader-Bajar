import React from "react";
import Joi from "joi";
import Form from "../common/form";
import { register } from "../../services/userService";
import auth from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    errors: {},
  };

  schema = Joi.object({
    name: Joi.string().min(3).max(255).required().label("Name"),
    email: Joi.string().min(3).max(255).required().label("Email"),
    phone: Joi.string().min(6).max(20).required().label("Phone"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  });

  doSubmit = async () => {
    console.log(this.state.data);
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      // this.props.history.push("/");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="log mt-5 d-flex align-items-center justify-content-center">
        <div className="col-sm-3 col-md-4 cb-cool p-4 rounded">
          <h2>User Registration form</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email Address", "email")}
            {this.renderInput("phone", "Phone", "number")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
