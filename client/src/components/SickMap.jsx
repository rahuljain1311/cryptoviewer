import React, { Component } from "react";
import _ from "lodash";
import NavbarView from "../containers/NavbarView";
import MapNavigator from "./MapNavigator";
import MapArea from "./MapArea";
import Carousel from "./Carousel";
import { reArrangeDoctors, gmapUrl } from "../helpers/utils";

export default class SickMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRef: undefined
    };
  }

  componentDidMount = () => {
    this.props.authCheck();
  };

  componentWillUnmount = () => {
    const { props } = this;
    const newLocs = reArrangeDoctors(
      props.locations,
      props.sickMap.currentDoctor
    );
    props.updateDocLocations(newLocs);
  };

  updateMapRef = ref => {
    this.setState({ mapRef: ref });
    this.props.updateMapReference(ref);
    const { locations } = this.props;
    console.log("nova", ref, locations);
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
    ref.fitBounds(bound);
    console.log("fit", ref.fitBounds, latLngs);
  };

  render = () => {
    const { props } = this;
    const { insuranceNo, campaignNo } = props;

    return (
      <div>
        <NavbarView backButton msg={null} />
        <MapNavigator
          msg={"5 Care options nearby:"}
          primary={"map"}
          backRoute={props.routeToUrl(`/sick/${insuranceNo}/${campaignNo}`)}
        />
        <MapArea
          loadingElement={<div />}
          containerElement={
            <div style={{ height: "78vh", marginTop: "22vh" }} />
          }
          sliderLocations={props.docLocations}
          mapElement={<div style={{ height: "78vh" }} />}
          locations={props.locations}
          googleMapURL={gmapUrl}
          onMapMounted={this.updateMapRef}
          currentMarker={props.sickMap.currentDoctor}
          updateCurrentMarker={props.updateSickMarker}
          sliderRef={props.sliderRef}
        />
        <Carousel
          locations={props.docLocations}
          updateCurrentMarker={props.updateSickMarker}
          updateSliderRef={props.updateSliderRef}
        />
      </div>
    );
  };
}
