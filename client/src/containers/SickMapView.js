import { connect } from "react-redux";
import { push } from "react-router-redux";
import SickMap from "../components/SickMap";
import {
  updateSliderRef,
  updateSickMarker,
  updateMapReference,
  authCheck,
  updateDocLocations
} from "../actions/profile";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  locations: state.profile.doctors,
  docLocations: state.profile.docLocations,
  sickMap: state.profile.sickMap,
  mapRef: state.profile.mapRef.sick,
  sliderRef: state.profile.mapRef.slider,
  insuranceNo: state.meta.insuranceNo,
  campaignNo: state.meta.campaignNo
});

const mapDispatchToProps = dispatch => ({
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  updateSickMarker: id => () => {
    dispatch(updateSickMarker(id));
  },
  updateMapReference: mapRef => {
    dispatch(updateMapReference(mapRef, "sick"));
  },
  updateDocLocations: locs => {
    dispatch(updateDocLocations(locs));
  },
  updateSliderRef: ref => {
    dispatch(updateSliderRef(ref));
  },
  authCheck: () => {
    dispatch(authCheck());
  }
});

const SickMapView = connect(mapStateToProps, mapDispatchToProps)(SickMap);

export default SickMapView;
