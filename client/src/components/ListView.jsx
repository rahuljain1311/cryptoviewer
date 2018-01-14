import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import NavbarView from "../containers/NavbarView";
import AskFooterView from "../containers/AskFooterView";
import AppFooter from "../components/AppFooter";
import MapNavigator from "./MapNavigator";
import Pharmacy from "./Pharmacy";

export default class ListView extends Component {
  static propTypes = {
    campaignNo: PropTypes.number.isRequired,
    insuranceNo: PropTypes.number.isRequired,
    doctorText: PropTypes.string.isRequired,
    pharmacies: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        isFree: PropTypes.bool.isRequired,
        isWalkIn: PropTypes.bool.isRequired,
        distance: PropTypes.shape({
          value: PropTypes.number,
          unit: PropTypes.string
        }).isRequired,
        waitTime: PropTypes.shape({
          start: PropTypes.number,
          end: PropTypes.number,
          unit: PropTypes.string
        }).isRequired,
        telNumber: PropTypes.number,
        googleMap: PropTypes.string,
        hours: PropTypes.arrayOf(
          PropTypes.shape({
            startTime: PropTypes.number,
            endTime: PropTypes.number,
            day: PropTypes.string
          })
        ).isRequired
      })
    ).isRequired,
    fetchPharmacies: PropTypes.func.isRequired,
    routeToUrl: PropTypes.func.isRequired,
    authCheck: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    const { campaignNo, insuranceNo } = this.props;
    this.props.authCheck();
    this.props.fetchPharmacies(insuranceNo, campaignNo);
  };

  render = () => {
    const { pharmacies, pharmacyText } = this.props;

    return (
      <div>
        <NavbarView backButton msg={null} />
        <MapNavigator
          msg={pharmacyText}
          primary="list"
          mapRoute={this.props.routeToUrl("/map/flu")}
        />

        <div className="container list-view">
          <br />

          {_.map(pharmacies, (elem, index) => (
            <Pharmacy
              key={elem.pharmacyNo}
              index={index + 1}
              name={elem.name}
              isFree={elem.isFree}
              distance={elem.distance}
              isWalkIn={elem.isWalkIn}
              waitTime={elem.waitTime}
              googleMap={elem.googleMap}
              telNumber={elem.telNumber}
              hours={elem.hours}
              routeToUrl={this.props.routeToUrl(`/pharmacy/${elem.pharmacyNo}`)}
            />
          ))}
        </div>

        <AskFooterView />

        <AppFooter />
      </div>
    );
  };
}
