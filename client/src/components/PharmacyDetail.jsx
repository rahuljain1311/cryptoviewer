import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import classNames from "classnames";
import { timeDifference, isOpen, timeClass } from "../helpers/utils";
import NavbarView from "../containers/NavbarView";
import SinglePharmacy from "./SinglePharmacy";
import ScheduleModal from "./ScheduleModal";
import AppFooter from "./AppFooter";

const { $ } = window;

export default class PharmacyDetail extends Component {
  componentDidMount = () => {
    this.props.authCheck();
  };

  render = () => {
    const { props } = this;
    const { pharmacy, schedule, bookAppointment, updateScheduledTime } = props;
    const {
      name,
      pharmacyNo,
      isFree,
      isWalkIn,
      distance,
      waitTime,
      address,
      phone,
      hours,
      latitude,
      longitude,
      homepage,
      waitText,
      telNumber,
      googleMap
    } = pharmacy;

    const { scheduled, time } = schedule;

    const timeLevel = timeClass(waitTime.end);
    const timeDiff = timeDifference(moment(time));
    let apDay = `on ${moment(time).format("MMM Do")}.`;
    if (timeDiff > 0 && timeDiff <= 24) apDay = "Today";
    if (timeDiff > 24 && timeDiff <= 48) apDay = "Tomorrow";
    const appointment = `Appointment scheduled for ${moment(time).format(
      "hh:mm A"
    )} ${apDay}`;
    const open = isOpen(hours);

    return (
      <div>
        <NavbarView backButton />
        <div className="container">
          <div className="row pharmacy-detail">
            <div className="row pharmacy-status">
              <div className="col-xs-12">
                <p>
                  <span className="text-left clinic-name">{`${pharmacyNo}. ${name}`}</span>
                  <span className="pull-right clinic-status">
                    {isFree ? "FREE" : ""}
                  </span>
                </p>
              </div>
            </div>

            <div className="row pharmacy-distance">
              <div className="col-xs-6">
                <i
                  className="fa fa-map-marker fa-2x icon-pat-grey"
                  aria-hidden="true"
                />

                <span>
                  {" "}
                  {` ${_.round(distance.value, 2)}`} {" miles"}
                </span>
              </div>

              <div className="col-xs-6 text-right">
                <i
                  className="fa fa-blind fa-walk fa-2x icon-pat-grey"
                  aria-hidden="true"
                />

                <span>{isWalkIn ? " Walk-In" : ""}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <i
                  className="fa fa-clock-o fa-2x icon-pat-grey"
                  aria-hidden="true"
                />
                <span className="text-left">
                  {open === true ? " Open now" : " Closed"}
                </span>
                {open === true && (
                  <span className="pull-right text-right">
                    Approx. wait time:
                    <span
                      className={timeLevel}
                    >{` ${waitTime.start} - ${waitTime.end} mins`}</span>
                  </span>
                )}
              </div>
            </div>

            {open === true && (
              <div className={classNames("row", { collapse: scheduled })}>
                <div className="col-xs-12">
                  <p className="pull-right">{waitText}</p>
                </div>
              </div>
            )}

            <div className={classNames("row", { collapse: !scheduled })}>
              <div className="col-xs-1" style={{ color: "#ACB0B2" }}>
                <i className="fa fa-calendar-o fa-2x" aria-hidden="true" />
              </div>
              <div className="col-xs-11">
                <p style={{ lineHeight: "26px" }}>{appointment}</p>
              </div>
            </div>

            <div
              className="row pharmacy-detail-cta"
              style={{ marginTop: "10px" }}
            >
              <div className="col-xs-12">
                <div className=" btn-group btn-group-justified">
                  <div className="btn-group p2">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        (document.location.href = `tel:${telNumber}`)}
                    >
                      <i
                        className="fa fa-phone fa-lg"
                        aria-hidden="true"
                        style={{ paddingRight: "6px" }}
                      />
                      Call
                    </button>
                  </div>

                  <div className="btn-group p2">
                    <button
                      onClick={() => window.open(googleMap, "_blank")}
                      className="btn btn-primary"
                    >
                      <i
                        className="fa fa-map-marker fa-lg"
                        aria-hidden="true"
                        style={{ paddingRight: "6px" }}
                      />
                      Directions
                    </button>
                  </div>

                  <div className="btn-group p2">
                    <button
                      onClick={() => {
                        $("#sched-modal").modal("show");
                      }}
                      className="btn btn-primary"
                    >
                      <i
                        className="fa fa-calendar fa-lg"
                        aria-hidden="true"
                        style={{ paddingRight: "6px" }}
                      />
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <SinglePharmacy
          address={address}
          phone={phone}
          name={name}
          hours={hours}
          latitude={latitude}
          longitude={longitude}
          pharmacyNo={pharmacyNo}
          homepage={homepage}
        />
        <hr />
        <AppFooter />
        <ScheduleModal
          bookAppointment={bookAppointment(pharmacyNo)}
          updateScheduledTime={updateScheduledTime(pharmacyNo)}
          date={time}
          routeToUrl={props.routeToUrl(`/wallet/${pharmacyNo}`)}
        />
      </div>
    );
  };
}
