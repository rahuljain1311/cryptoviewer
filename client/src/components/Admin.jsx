import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import _ from "lodash";
import { validPhoneNumber } from "../helpers/utils";
import NavbarView from "../containers/NavbarView";
import CopyModal from "./CopyModal";

const { $ } = window;

export default class Admin extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    routeToLogin: PropTypes.func.isRequired,
    fetchProfiles: PropTypes.func.isRequired,
    updateAdminInput: PropTypes.func.isRequired,
    adminValidationFailure: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    insuranceNo: PropTypes.number.isRequired,
    msgType: PropTypes.string.isRequired,
    onProgress: PropTypes.bool.isRequired,
    validation: PropTypes.shape({
      email: PropTypes.bool,
      emailMsg: PropTypes.string
    }).isRequired,
    profiles: PropTypes.arrayOf({
      insuranceNo: PropTypes.number,
      firstName: PropTypes.string,
      campaignNo: PropTypes.number,
      campaignName: PropTypes.string
    }).isRequired
  };

  componentDidMount = () => {
    if (this.props.isAdmin === false) {
      this.props.routeToLogin();
    } else {
      this.props.fetchProfiles();
    }
    /* this.props.fetchProfiles();*/
  };

  sendMessage = () => {
    const {
      email,
      phone,
      insuranceNo,
      msgType,
      expiryUnit,
      expiryTime,
      campaignNo
    } = this.props;
    this.props.sentSMSFailed(false);
    let messageType = 1;
    if (msgType === "alert") messageType = 1;
    else messageType = 2;
    this.props.sendMessage(
      insuranceNo,
      messageType,
      phone,
      email,
      expiryUnit,
      expiryTime,
      campaignNo
    );
  };

  render = () => {
    const {
      email,
      phone,
      insuranceNo,
      msgType,
      expiryUnit,
      expiryTime,
      profile,
      validation,
      onProgress,
      apiFailed,
      apiSuccess
    } = this.props;
    return (
      <div>
        <NavbarView menu />
        <div className="container" style={{ marginTop: "66px" }}>
          <div>
            {apiSuccess && (
              <div
                className="alert alert-success alert-dismissible"
                role="alert"
                id="sms-success"
              >
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => this.props.updateSubmitted(false)}
                >
                  <span
                    onClick={() => this.props.updateSubmitted(false)}
                    aria-hidden="true"
                  >
                    &times;
                  </span>
                </button>
                <strong>Success!</strong> Message sent successfully.
              </div>
            )}

            {apiFailed && (
              <div
                className="alert alert-danger alert-dismissible"
                id="sms-failure"
                role="alert"
              >
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => this.props.sentSMSFailed(false)}
                >
                  <span
                    onClick={() => this.props.sentSMSFailed(false)}
                    aria-hidden="true"
                  >
                    &times;
                  </span>
                </button>
                <strong>Failed!</strong> Message not sent.
              </div>
            )}

            <div className="form-group">
              <label htmlFor="profile">Persona</label>
              <select
                className="form-control"
                id="profile"
                onChange={this.props.updateAdminInput("insuranceNo")}
                value={this.props.insuranceNo}
              >
                {_.map(this.props.profiles, elem => (
                  <option key={elem.insuranceNo} value={elem.insuranceNo}>
                    {elem.firstName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="profile">Customized Name</label>
              <input
                value={this.props.customizedName}
                onChange={this.props.updateAdminInput("customizedName")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="campaign">Campaign</label>
              <select
                className="form-control"
                id="campaign"
                onChange={this.props.updateAdminInput("campaignNo")}
                value={this.props.campaignNo}
              >
                {_.map(this.props.profiles, elem => (
                  <option key={elem.campaignNo} value={elem.campaignNo}>
                    {elem.campaignName}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={classNames("form-group", {
                "has-error": validation.phone === false
              })}
            >
              <label htmlFor="phone">Phone number</label>
              <textarea
                className="form-control"
                id="phone"
                rows="3"
                placeholder="Enter phone numbers separated by commas e.g.: +19173064974, +13134050771"
                onChange={this.props.updateAdminInput("phone")}
              />
              {validation.phone === false && (
                <span className="help-block">{validation.phoneMsg}</span>
              )}
            </div>
            <div
              className={classNames("form-group", {
                "has-error": validation.email === false
              })}
            >
              <label htmlFor="email">Email</label>
              <textarea
                className="form-control"
                rows="3"
                id="email"
                placeholder="Enter email separated by commas e.g.: abc_xyz@mckinsey.com, xyz_abc@mckinsey.com"
                onChange={this.props.updateAdminInput("email")}
              />
              {validation.email === false && (
                <span className="help-block">{validation.emailMsg}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="expiry">Expiry time Unit</label>
              <select
                className="form-control"
                value={this.props.expiryUnit}
                onChange={this.props.updateAdminInput("expiryUnit")}
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="expiry">Expiry time Value</label>
              <input
                value={this.props.expiryTime}
                onChange={this.props.updateAdminInput("expiryTime")}
                type="number"
                min="1"
                step="1"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Message type</label>
              <div className="radio">
                <label>
                  <input
                    onChange={this.props.updateAdminInput("msgType")}
                    type="radio"
                    name="msgType"
                    value="alert"
                    checked={this.props.msgType === "alert"}
                  />
                  Alert Message
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    onChange={this.props.updateAdminInput("msgType")}
                    type="radio"
                    name="msgType"
                    value="summary"
                    checked={this.props.msgType === "summary"}
                  />
                  Summary Message
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 col-xs-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={this.sendMessage}
                  disabled={onProgress === true}
                >
                  {onProgress === true ? "Sending.." : "Send"}
                </button>
              </div>
              <div className="col-md-3 col-xs-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={() => {
                    $("#copy-modal").modal("show");
                  }}
                >
                  Generate Link
                </button>
              </div>
            </div>
          </div>
        </div>
        <CopyModal
          expiryTime={expiryTime}
          expiryUnit={expiryUnit}
          msgType={msgType}
          profile={insuranceNo}
          email={email}
          phone={phone}
        />
      </div>
    );
  };
}
