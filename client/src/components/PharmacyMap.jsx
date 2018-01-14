import { compose } from "recompose";
import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    <Marker
      position={{ lat: props.latitude, lng: props.longitude }}
      icon={{ url: props.icon }}
    />
  </GoogleMap>
));

export default MapWithAMarker;
