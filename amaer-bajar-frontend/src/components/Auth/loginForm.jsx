import React from "react";
import Joi from "joi";
import Form from "../common/form";
import auth from "../../services/authService";
import "./loginForm.css";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string().min(3).max(255).required().label("Email"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  });

  doSubmit = async () => {
    try {
      // const path = this.props.location.state.from.pathname;
      // console.log(path);
      const { data } = this.state;
      await auth.login(data.email, data.password);
      // this.props.history.push('/');
      // window.location = path || "/";
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
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
      <div className="log d-flex align-items-center justify-content-center">
        <div className="col-sm-3 col-md-4 cb-cool p-4 rounded">
          <h2>User Login form</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email Address", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
