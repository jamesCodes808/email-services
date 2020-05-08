import React, { Component } from "react";
import userService from "../../services/userService";
import swal from "sweetalert";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Form, Label, Button } from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      registerForm: {
        email: "",
        password: "",
        passwordConfirm: "",
        roleId: 0,
      },
    };
  }

  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ style: { display: "none" } });
      }.bind(this),
      1000
    );
  }

  onRegisterSuccess = () => {
    swal(
      "Register Success",
      "Please confirm your account using the email you registered with",
      "success"
    );
  };

  simplifyErrorForUser = (error) => {
    if (error === "The field RoleId must be between 1 and 3.") {
      error = "You Must Select an Account Type";
    } else if (error.includes("Violation of UNIQUE KEY constraint")) {
      error = "That Email Address is already Associated with Another User";
    }
    return error + "\n";
  };

  onRegisterError = (error) => {
    let errorMessages = "";
    for (error of error.response.data.errors) {
      errorMessages += this.simplifyErrorForUser(error);
    }
    swal("Register Error", errorMessages, "error");
  };

  handleSubmit = (formData, { setSubmitting }) => {
    setSubmitting(true);
    userService
      .registerUser({
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        roleId: parseInt(formData.roleId),
      })

      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
    setSubmitting(false);
  };

  render() {
    let style = this.state.style;
    const background = require("../../assets/images/auth-layer.png");

    return (
      <div>
        {/* Loader starts */}
        <div className="loader-wrapper" style={style}>
          <div className="loader bg-white">
            <div className="line" />
            <div className="line" />
            <div className="line" />
            <div className="line" />
            <h4>
              Have a great day at work today <span>&#x263A;</span>
            </h4>
          </div>
        </div>
        {/* Loader ends */}

        {/*page-wrapper Start*/}
        <div className="page-wrapper">
          <div className="container-fluid">
            {/*sign up page start*/}
            <div className="authentication-main">
              <div className="row">
                <div className="col-md-4 p-0">
                  <div
                    className="auth-innerleft"
                    style={{ backgroundImage: "url(" + background + ")" }}
                  >
                    <div className="text-center">
                      <img
                        //src={require("../../assets/images/logo-auth.gif")}
                        src={
                          "https://yt3.ggpht.com/a/AATXAJzEIlfg9WtR3MakgFZoyVEFqXSsw6x4ORv_qg=s288-c-k-c0xffffffff-no-rj-mo"
                        }
                        className="logo-login"
                        alt=""
                      />
                      <hr />
                      <div className="social-media">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <i className="fa fa-facebook" aria-hidden="true" />
                          </li>
                          <li className="list-inline-item">
                            <i
                              className="fa fa-google-plus"
                              aria-hidden="true"
                            />
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-twitter" aria-hidden="true" />
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-instagram" aria-hidden="true" />
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-rss" aria-hidden="true" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Formik
                  enableReinitialize={true}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().required("Required"),
                    password: Yup.string().required("Required"),
                    passwordConfirm: Yup.string().required("Required"),
                    roleId: Yup.string().required("Required"),
                  })}
                  initialValues={this.state.registerForm}
                  onSubmit={this.handleSubmit}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      handleSubmit,
                      isValid,
                      isSubmitting,
                    } = props;
                    return (
                      <Form
                        onSubmit={handleSubmit}
                        className={"col-md-8 pt-4 theme-form"}
                        action="/"
                      >
                        <div className="col-md-8 p-0">
                          <div className="auth-innerright">
                            <div className="authentication-box">
                              <h3 className="text-center">NEW USER</h3>
                              <h6 className="text-center">
                                Enter your Username and Password For Login or
                                Signup
                              </h6>
                              <div className="card mt-4 p-4">
                                <div className="form-row">
                                </div>
                                <div className="form-group">
                                  <Label>Email</Label>
                                  <Field
                                    name="email"
                                    type="text"
                                    values={values.email}
                                    placeholder="Example@email.com"
                                    autoComplete="off"
                                    className={
                                      errors.email && touched.email
                                        ? "form-control error-form"
                                        : "form-control"
                                    }
                                  />
                                  {errors.email && touched.email && (
                                    <span
                                      className="input-feedback"
                                      style={{ color: "red" }}
                                    >
                                      {errors.email}
                                    </span>
                                  )}
                                </div>
                                <div className="form-group">
                                  <Label>Password</Label>
                                  <Field
                                    name="password"
                                    type="password"
                                    values={values.password}
                                    placeholder="**********"
                                    autoComplete="off"
                                    className={
                                      errors.password && touched.password
                                        ? "form-control error-form"
                                        : "form-control"
                                    }
                                  />
                                  {errors.password && touched.password && (
                                    <span
                                      className="input-feedback"
                                      style={{ color: "red" }}
                                    >
                                      {errors.password}
                                    </span>
                                  )}
                                </div>
                                <div className="form-group">
                                  <Label>Confirm Password</Label>
                                  <Field
                                    name="passwordConfirm"
                                    type="password"
                                    values={values.passwordConfirm}
                                    placeholder="**********"
                                    autoComplete="off"
                                    className={
                                      errors.passwordConfirm &&
                                        touched.passwordConfirm
                                        ? "form-control error-form"
                                        : "form-control"
                                    }
                                  />
                                  {errors.passwordConfirm &&
                                    touched.passwordConfirm && (
                                      <span
                                        className="input-feedback"
                                        style={{ color: "red" }}
                                      >
                                        {errors.passwordConfirm}
                                      </span>
                                    )}
                                </div>
                                <div className="form-group">
                                  <Label>Select Account Type</Label>
                                  <Field
                                    name="roleId"
                                    component="select"
                                    values={values.roleId}
                                    label="RoleId"
                                    className={
                                      errors.roleId && touched.roleId
                                        ? "form-control error-form"
                                        : "form-control"
                                    }
                                    as="select"
                                  >
                                    <option value="">Select One</option>
                                    <option value="2">Individual</option>
                                    <option value="3">Business</option>
                                  </Field>
                                  {errors.roleId && touched.roleId && (
                                    <span
                                      className="input-feedback"
                                      style={{ color: "red" }}
                                    >
                                      {errors.roleId}
                                    </span>
                                  )}
                                </div>
                                <div className="form-row">
                                  <div className="col-sm-3">
                                    <Button
                                      type="submit"
                                      disabled={!isValid || isSubmitting}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                  <div className="col-sm-8">
                                    <div className="text-left mt-2 m-l-20">
                                      Are you already user?&nbsp;&nbsp;
                                      <a
                                        href="login.html"
                                        className="btn-link text-capitalize"
                                      >
                                        Login
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-divider" />
                                <div className="social mt-3">
                                  <div className="form-row">
                                    <div className="col-sm-4">
                                      <button className="btn social-btn btn-fb mb-2">
                                        Facebook
                                      </button>
                                    </div>
                                    <div className="col-sm-4">
                                      <button className="btn social-btn btn-twitter mb-2">
                                        Twitter
                                      </button>
                                    </div>
                                    <div className="col-sm-4">
                                      <button className="btn social-btn btn-google mb-2">
                                        Google +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>

              {/*sign up page Ends*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
