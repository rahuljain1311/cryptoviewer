import React from "react";
import _ from "lodash";
import { compose } from "recompose";
import {
  withScriptjs,
  Marker,
  withGoogleMap,
  GoogleMap
} from "react-google-maps";
import marker1 from "../static/images/markers/marker1.png";
import marker2 from "../static/images/markers/marker2.png";
import marker3 from "../static/images/markers/marker3.png";
import marker4 from "../static/images/markers/marker4.png";
import marker5 from "../static/images/markers/marker5.png";
import unmarker1 from "../static/images/markers/unmarker1.png";
import unmarker2 from "../static/images/markers/unmarker2.png";
import unmarker3 from "../static/images/markers/unmarker3.png";
import unmarker4 from "../static/images/markers/unmarker4.png";
import unmarker5 from "../static/images/markers/unmarker5.png";
import { reArrangePharmacies } from "../helpers/utils";

const iconMapping = [
  {
    pharmacyNo: 1,
    icon: unmarker1
  },
  {
    pharmacyNo: 2,
    icon: unmarker2
  },
  {
    pharmacyNo: 3,
    icon: unmarker3
  },
  {
    pharmacyNo: 4,
    icon: unmarker4
  },
  {
    pharmacyNo: 5,
    icon: unmarker5
  }
];

const unselectedIcon = _.zipObject(_.range(1, 6), [
  marker1,
  marker2,
  marker3,
  marker4,
  marker5
]);

function getIcon(item, currentDoctor) {
  let id = 1;
  if (_.has(item, "doctorNo")) id = item.doctorNo;
  else id = item.pharmacyNo;
  const icon = _.filter(iconMapping, elem => elem.pharmacyNo === id);
  if (id !== currentDoctor) return _.head(icon).icon;
  return unselectedIcon[currentDoctor];
}

function getCenter(locations, id) {
  const locs = _.filter(locations, elem => {
    if (_.has(elem, "doctorNo")) return elem.doctorNo === id;
    return elem.pharmacyNo === id;
  });
  if (_.isEmpty(locs)) return {};
  const loc = _.head(locs);
  return {
    lat: loc.latitude,
    lng: loc.longitude
  };
}

function getSliderIndex(locations, id) {
  return _.findIndex(locations, elem => {
    if (_.has(elem, "doctorNo")) return elem.doctorNo === id;
    return elem.pharmacyNo === id;
  });
}

const MapArea = compose(withScriptjs, withGoogleMap)(props => (
  <GoogleMap
    defaultZoom={13}
    ref={props.onMapMounted}
    center={getCenter(props.locations, props.currentMarker)}
  >
    {_.map(props.locations, elem => (
      <Marker
        icon={{ url: getIcon(elem, props.currentMarker) }}
        position={{ lat: elem.latitude, lng: elem.longitude }}
        onClick={() => {
          let id = null;
          if (_.has(elem, "doctorNo")) id = elem.doctorNo;
          else id = elem.pharmacyNo;
          props.updateCurrentMarker(id)();
          const index = getSliderIndex(props.sliderLocations, id);
          props.sliderRef.slickGoTo(index);
        }}
      />
    ))}
  </GoogleMap>
));

export default MapArea;
