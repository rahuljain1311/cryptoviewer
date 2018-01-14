import React, { Component } from "react";
import _ from "lodash";
import Clipboard from "clipboard";

export default class CopyModal extends Component {
  componentDidMount = () => {
    new Clipboard(".copy-clip");
  };

  render = () => {
    const { $ } = window;
    const { props } = this;
    const { protocol, host } = window.location;
    const { expiryTime, expiryUnit, msgType, profile, email, phone } = props;
    let newEmail = _.replace(email, /,/g, "&");
    newEmail = _.replace(newEmail, /\s/g, "");
    let newPhone = _.replace(phone, /,/g, "&");
    newPhone = _.replace(newPhone, /\s/g, "");
    console.log("ff", email, newEmail, phone, newPhone);
    if (_.isEmpty(newEmail)) newEmail = "<insert_email>";
    if (_.isEmpty(newPhone)) newPhone = "<insert_number>";
    let msgNo = 1;
    if (msgType === "summary") msgNo = 2;
    const urlValue =
      protocol +
      "//" +
      host +
      `/api/sms/expiry/${expiryTime}/${expiryUnit}/messageType/${msgNo}/profile/${profile}/numbers/${newPhone}/emails/${newEmail}`;
    return (
      <div
        className="modal fade bs-example-modal-sm"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        id="copy-modal"
      >
        <div
          className="modal-dialog modal-sm"
          role="document"
          style={{ top: "20%" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                <p
                  className="text-center"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  Presentation Link
                </p>
              </h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  value={urlValue}
                  disabled
                  type="text"
                  id="plink"
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col-xs-6">
                  <button
                    type="button"
                    className="btn btn-primary btn-block copy-clip"
                    data-dismiss="modal"
                    data-clipboard-text={urlValue}
                    onClick={() => {}}
                  >
                    Copy
                  </button>
                </div>
                <div className="col-xs-6">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
