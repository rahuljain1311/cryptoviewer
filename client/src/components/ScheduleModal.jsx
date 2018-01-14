import React from "react";
import moment from "moment";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import appleWallet from "../static/images/appleWallet.png";

export default function ScheduleModal(props) {
  const { $ } = window;
  return (
    <div
      className="modal fade bs-example-modal-sm"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      id="sched-modal"
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
                Schedule
              </p>
            </h4>
          </div>
          <div className="modal-body">
            <div className="input-group">
              <span className="input-group-addon">
                <span
                  className="glyphicon glyphicon-calendar"
                  aria-hidden="true"
                />
              </span>
              <DateTime
                defaultValue={moment(props.date).toDate()}
                dateFormat="MM/DD/YYYY"
                timeFormat="hh:mm A"
                inputProps={{ readOnly: true }}
                onChange={time => {
                  props.updateScheduledTime(parseInt(time.format("x"), 10));
                }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <div className="row">
              <div className="col-xs-6">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  data-dismiss="modal"
                  onClick={props.bookAppointment}
                >
                  Ok
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
              {props.showWallet && (
                <div className="row">
                  <div className="col-xs-6 col-xs-offset-3">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{ border: "0", backgroundColor: "white" }}
                      onClick={() => {
                        $("#sched-modal").modal("hide");
                        props.routeToUrl();
                      }}
                    >
                      <img
                        className="img-responsive"
                        alt=""
                        src={appleWallet}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ScheduleModal.defaultProps = {
  showWallet: true
};
