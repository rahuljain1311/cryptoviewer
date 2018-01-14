import React from "react";
import _ from "lodash";
import { gmapUrl } from "../helpers/utils";
import MapWithAMarker from "./PharmacyMap";
import PharmacyTimings from "./PharmacyTiming";
import marker1 from "../static/images/markers/marker1.png";
import marker2 from "../static/images/markers/marker2.png";
import marker3 from "../static/images/markers/marker3.png";
import marker4 from "../static/images/markers/marker4.png";
import marker5 from "../static/images/markers/marker5.png";

const iconMapping = [
  {
    pharmacyNo: 1,
    icon: marker1
  },
  {
    pharmacyNo: 2,
    icon: marker2
  },
  {
    pharmacyNo: 3,
    icon: marker3
  },
  {
    pharmacyNo: 4,
    icon: marker4
  },
  {
    pharmacyNo: 5,
    icon: marker5
  }
];

export default function SinglePharmacy(props) {
  let icon = _.filter(
    iconMapping,
    elem => elem.pharmacyNo === props.pharmacyNo
  );
  if (_.isEmpty(icon)) icon = marker1;
  else icon = _.head(icon).icon;

  return (
    <div className="container pharmacy-detail-info">
      <div className="row">
        <div className="col-xs-7">
          <div className="row">
            <div className="col-xs-12">
              <p style={{ fontWeight: "bold" }}>{props.name} Details</p>
            </div>
          </div>

          <div className="row mB5">
            <div className="col-xs-2">
              <i
                className="fa fa-map-marker fa-2x icon-pat-blue"
                aria-hidden="true"
              />
            </div>

            <div className="col-xs-10">
              <p>{props.address}</p>
            </div>
          </div>

          <div className="row mB5">
            <div className="col-xs-2">
              <i
                className="fa fa-globe fa-2x icon-pat-blue"
                aria-hidden="true"
              />
            </div>

            <div className="col-xs-10">
              <p>{props.homepage}</p>
            </div>
          </div>

          <div className="row mB5">
            <div className="col-xs-2">
              <i
                className="fa fa-phone fa-2x icon-pat-blue"
                aria-hidden="true"
              />
            </div>

            <div className="col-xs-10">
              <p>{props.phone}</p>
            </div>
          </div>
        </div>

        <div className="col-xs-5">
          <MapWithAMarker
            googleMapURL={gmapUrl}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `132px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            latitude={props.latitude}
            longitude={props.longitude}
            icon={icon}
          />
        </div>
      </div>
      <PharmacyTimings hours={props.hours} />
    </div>
  );
}
