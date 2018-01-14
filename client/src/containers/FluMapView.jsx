import { connect } from "react-redux";
import { push } from "react-router-redux";
import FluMap from "../components/FluMap";
import {
  updateSliderRef,
  updateFluMarker,
  updateMapReference,
  authCheck,
  updateCarLocations
} from "../actions/profile";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  locations: state.profile.pharmacies,
  carLocations: state.profile.carLocations,
  fluMap: state.profile.fluMap,
  mapRef: state.profile.mapRef.flu,
  sliderRef: state.profile.mapRef.slider,
  campaignNo: state.meta.campaignNo,
  insuranceNo: state.meta.campaignNo
});

const mapDispatchToProps = dispatch => ({
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  updateFluMarker: id => () => {
    dispatch(updateFluMarker(id));
  },
  updateMapReference: mapRef => {
    dispatch(updateMapReference(mapRef, "flu"));
  },
  updateSliderRef: ref => {
    dispatch(updateSliderRef(ref));
  },
  authCheck: () => {
    dispatch(authCheck());
  },
  updateCarLocations: pharms => {
    dispatch(updateCarLocations(pharms));
  }
});

const FluMapView = connect(mapStateToProps, mapDispatchToProps)(FluMap);

export default FluMapView;
