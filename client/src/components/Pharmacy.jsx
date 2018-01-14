import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";
import _ from "lodash";
import { costColor, isOpen, timeClass, timeDifference } from "../helpers/utils";
import ScheduleModal from "./ScheduleModal";
import { pcp } from "../purescript/output/Pharmacy.Pcp";
import { cost } from "../purescript/output/Pharmacy.Cost";
import { distance, booking } from "../purescript/output/Pharmacy.Booking";
import { timing } from "../purescript/output/Pharmacy.Timing";
import { schedule } from "../purescript/output/Pharmacy.Schedule";
import { contact } from "../purescript/output/Pharmacy.Contact";
import { dirUI } from "../purescript/output/Pharmacy.Direction";

const { $ } = window;

export default function Pharmacy(props) {
  let timeLevel = null;
  if (!_.isUndefined(props.waitTime)) timeLevel = timeClass(props.waitTime.end);
  const open = isOpen(props.hours);
  const { time, scheduled } = props.pcpScheduled;
  const timeDiff = timeDifference(moment(time));
  let apDay = `on ${moment(time).format("MMM Do")}.`;
  if (timeDiff > 0 && timeDiff <= 24) apDay = "Today";
  if (timeDiff > 24 && timeDiff <= 48) apDay = "Tomorrow";
  const appointment = `Appointment scheduled for ${moment(time).format(
    "hh:mm A"
  )} ${apDay}`;
  const pcpTruth = props.isPCP && props.overridePCP;
  const { isPCP, isFree, name, index } = props;
  return (
    <div className="row pharmacy" style={props.style}>
      <div className="row pharmacy-status" onClick={props.routeToUrl}>
        {pcp({ isPCP, isFree, name, index })}
      </div>
      {cost({ cost: props.cost })}
      <div className="row pharmacy-distance" onClick={props.routeToUrl}>
        {distance({ distance: props.distance })}
        {booking({ isWalkIn: props.isWalkIn })}
      </div>

      <div className="row" onClick={props.routeToUrl}>
        <div className="col-xs-12">
          <i className="fa fa-clock-o fa-2x icon-pat-grey" aria-hidden="true" />
          <span
            className="text-left"
            style={{ position: "relative", top: "-4px" }}
          >
            {open === true ? " Open now" : " Closed"}
          </span>

          {!(props.waitTime.start === -1) &&
            open === true && (
              <p
                className="pull-right text-right"
                style={{ position: "relative", top: "4px" }}
              >
                Approx. wait time:
                <span className={timeLevel}>{` ${props.waitTime.start} - ${props
                  .waitTime.end} mins`}</span>
              </p>
            )}

          {props.isVideoAvailable && (
            <div className="pull-right text-right" onClick={props.routeToChat}>
              <span className="fa-stack fa-lg">
                <i
                  className="fa fa-circle fa-stack-2x icon-pat-dblue"
                  aria-hidden="true"
                />
                <i
                  className="fa fa-video-camera fa-stack-1x fa-inverse"
                  aria-hidden="true"
                />
              </span>
              <span className="icon-pat-dblue">Video chat</span>
            </div>
          )}
        </div>
      </div>

      {props.isPCP === true && (
        <div
          className={classNames("row", {
            collapse: !scheduled
          })}
        >
          <div className="col-xs-1" style={{ color: "#ACB0B2" }}>
            <i className="fa fa-calendar-o fa-2x" aria-hidden="true" />
          </div>
          <div className="col-xs-11">
            <p style={{ lineHeight: "26px" }}>{appointment}</p>
          </div>
        </div>
      )}

      {contact({
        telNumber: props.telNumber,
        googleMap: props.googleMap,
        isPCP: props.isPCP,
        overridePCP: props.overridePCP
      })}

      {dirUI({
        telNumber: props.telNumber,
        googleMap: props.googleMap,
        isPCP: props.isPCP,
        overridePCP: props.overridePCP
      })}

      {props.isPCP === true && (
        <ScheduleModal
          bookAppointment={props.bookPcpAppointment(props.index)}
          updateScheduledTime={props.updatePcpScheduledTime(props.index)}
          date={props.pcpScheduled.time}
          showWallet={false}
          routeToUrl={() => {}}
        />
      )}
    </div>
  );
}

Pharmacy.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isFree: PropTypes.bool.isRequired,
  distance: PropTypes.shape({
    value: PropTypes.number,
    unit: PropTypes.string
  }).isRequired,
  isWalkIn: PropTypes.bool.isRequired,
  waitTime: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    unit: PropTypes.string
  }).isRequired,
  hours: PropTypes.arrayOf(
    PropTypes.shape({
      startTime: PropTypes.number,
      endTime: PropTypes.number,
      day: PropTypes.string
    })
  ).isRequired,
  cost: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    unit: PropTypes.string
  }),
  isPCP: PropTypes.bool,
  style: PropTypes.object,
  overridePCP: PropTypes.bool,
  isVideoAvailable: PropTypes.bool.isRequired,
  routeToChat: PropTypes.func.isRequired
};

Pharmacy.defaultProps = {
  cost: null,
  isPCP: false,
  style: {},
  pcpScheduled: {
    time: null
  },
  overridePCP: true,
  isVideoAvailable: false,
  routeToChat: () => {}
};
