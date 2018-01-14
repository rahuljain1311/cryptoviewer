import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import NavbarView from "../containers/NavbarView";
import MapNavigator from "./MapNavigator";
import MapArea from "./MapArea";
import Carousel from "./Carousel";
import { gmapUrl } from "../helpers/utils";
import { reArrangePharmacies } from "../helpers/utils";

export default class FluMap extends Component {
  static propTypes = {
    updateMapReference: PropTypes.func.isRequired,
    locations: PropTypes.arrayOf({
      latitude: PropTypes.number,
      longitude: PropTypes.number
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      mapRef: undefined
    };
  }

  componentWillUnmount = () => {
    const { props } = this;
    const newLocs = reArrangePharmacies(
      props.locations,
      props.fluMap.currentPharmacy
    );
    props.updateCarLocations(newLocs);
  };

  componentDidMount = () => {
    this.props.authCheck();
  };

  updateMapRef = ref => {
    this.setState({ mapRef: ref });
    this.props.updateMapReference(ref);
    const { locations } = this.props;
    if (_.isNull(ref)) return;
    const { google } = window;
    const latLngs = _.map(
      locations,
      elem => new google.maps.LatLng(elem.latitude, elem.longitude)
    );
    const bound = new google.maps.LatLngBounds(_.head(latLngs));
    _.map(latLngs, elem => {
      bound.extend(elem);
    });
    /* ref.fitBounds(bound); */
  };

  render = () => {
    const { props } = this;
    const { campaignNo, insuranceNo } = props;
    return (
      <div>
        <NavbarView backButton msg={null} />
        <MapNavigator
          msg={"5 places nearby to get free flu shots:"}
          primary="map"
          backRoute={props.routeToUrl(`/pharmacy/${campaignNo}/${insuranceNo}`)}
        />
        <MapArea
          loadingElement={<div />}
          containerElement={
            <div style={{ height: "78vh", marginTop: "22vh" }} />
          }
          mapElement={<div style={{ height: "78vh" }} />}
          locations={props.locations}
          sliderLocations={props.carLocations}
          updateCarLocations={props.updateCarLocations}
          googleMapURL={gmapUrl}
          onMapMounted={this.updateMapRef}
          currentMarker={props.fluMap.currentPharmacy}
          updateCurrentMarker={props.updateFluMarker}
          sliderRef={props.sliderRef}
        />
        <Carousel
          locations={props.carLocations}
          updateCurrentMarker={props.updateFluMarker}
          routeToUrl={props.routeToUrl}
          updateSliderRef={props.updateSliderRef}
        />
      </div>
    );
  };
}
