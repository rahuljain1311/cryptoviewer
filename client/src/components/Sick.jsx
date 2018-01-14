import React, { Component } from "react";
import _ from "lodash";
import Pharmacy from "./Pharmacy";
import AppFooter from "../components/AppFooter";
import AskFooterView from "../containers/AskFooterView";
import MapNavigator from "./MapNavigator";
import NavbarView from "../containers/NavbarView";

export default class Sick extends Component {
  componentDidMount = () => {
    const { insuranceNo, campaignNo } = this.props;
    this.props.authCheck();
    this.props.fetchDoctors(insuranceNo, campaignNo);
    this.props.updateBasicProfile(insuranceNo, campaignNo);
  };

  render = () => {
    const { insuranceNo, campaignNo } = this.props;
    return (
      <div>
        <NavbarView backButton msg={null} />
        <MapNavigator
          msg={this.props.doctorText}
          primary="list"
          mapRoute={this.props.routeToUrl("/map/sick")}
        />
        <div className="container list-view">
          <br />
          {_.map(this.props.doctors, elem => (
            <Pharmacy
              key={elem.doctorNo}
              index={elem.doctorNo}
              name={elem.name}
              waitTime={elem.waitTime}
              isFree={null}
              cost={elem.cost}
              distance={elem.distance}
              isWalkIn={elem.isWalkIn}
              hours={elem.hours}
              telNumber={elem.telNumber}
              googleMap={elem.googleMap}
              isPCP={elem.isPCP}
              routeToUrl={() => {}}
              routeToChat={this.props.routeToUrl(
                "/videochat/${camaignNo}/${insuranceNo}"
              )}
              bookPcpAppointment={this.props.bookPcpAppointment}
              updatePcpScheduledTime={this.props.updatePcpScheduledTime}
              pcpScheduled={this.props.pcpScheduled}
              isVideoAvailable={elem.isVideoAvailable}
            />
          ))}
        </div>
        <AskFooterView />
        <AppFooter />
      </div>
    );
  };
}
