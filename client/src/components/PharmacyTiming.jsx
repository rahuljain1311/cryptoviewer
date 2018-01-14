import React from "react";
import _ from "lodash";
import { sortHours, militaryTimeToStandard } from "../helpers/utils";

export default function PharmacyTimings(props) {
  const { hours } = { ...props };
  let hours1 = _.filter(hours, elem => elem.startTime !== -1);
  hours1 = sortHours(hours1);
  hours1 = _.map(hours1, elem => {
    const newElem = { ...elem };
    newElem.startTime = militaryTimeToStandard(elem.startTime);
    newElem.endTime = militaryTimeToStandard(elem.endTime);
    return newElem;
  });
  return (
    <div className="row">
      <div className="col-xs-2">
        <i className="fa fa-clock-o fa-2x icon-pat-blue" aria-hidden="true" />
      </div>

      <div className="col-xs-5" style={{ marginLeft: "-10px" }}>
        {_.map(hours1, (elem, index) => {
          let style = {};
          if (index === 0) {
            style = {
              fontWeight: "bolder"
            };
          }
          return <p style={style}>{elem.day}</p>;
        })}
      </div>

      <div className="col-xs-5">
        {_.map(hours1, (elem, index) => {
          let style = {};
          if (index === 0) {
            style = {
              fontWeight: "bolder"
            };
          }
          const time = `${elem.startTime}-${elem.endTime}`;
          return <p style={style}>{time}</p>;
        })}
      </div>
    </div>
  );
}
