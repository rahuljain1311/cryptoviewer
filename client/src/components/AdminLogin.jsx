import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import _ from "lodash";
import { validateEmail, checkStatus, hostDomain } from "../helpers/utils";
import NavbarView from "../containers/NavbarView";
import { updateAdmin } from "../actions/admin";

class AdminLogin extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      userError: false,
      email: "",
      password: ""
    };
  }

  onStaticChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  login = () => {
    const { email, password } = this.state;
    const { dispatch } = this.props;
    this.setState({ loginError: false, userError: false });
    if (_.isEmpty(email) || !validateEmail(email)) {
      this.setState({ userError: true });
      return;
    }
    fetch(`${hostDomain}/api/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(checkStatus)
      .then(() => {
        dispatch(updateAdmin(true));
        dispatch(push("/admin"));
      })
      .catch(e => {
        this.setState({ loginError: true });
      });
  };

  render = () => (
    <div>
      <NavbarView />
      <div className="container" style={{ marginTop: "30vh" }}>
        <div className="col-md-4 col-md-offset-4">
          <div>
            <div
              className={classNames("form-group", {
                "has-error": this.state.userError === true
              })}
            >
              <label htmlFor="userEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="userEmail"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onStaticChange("email")}
              />
              {this.state.userError && (
                <span className="help-block">Invalid Email</span>
              )}
            </div>
            <div
              className={classNames("form-group", {
                "has-error": this.state.loginError === true
              })}
            >
              <label htmlFor="userPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="userPassword"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onStaticChange("password")}
              />
              {this.state.loginError && (
                <span className="help-block">Invalid password.</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-default"
              onClick={this.login}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  dispatch: item => {
    dispatch(item);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
