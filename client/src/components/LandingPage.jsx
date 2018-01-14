import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import classNames from "classnames";
import NavbarView from "../containers/NavbarView";
import NotifyMessage from "./NotifyMessage";
import iconMedical from "../static/images/iconMedical.png";
import iconSick from "../static/images/iconSick.png";
import iconLearn from "../static/images/iconLearn.png";
import LandingNavLink from "./LandingNavLink";
import SplashScreen from "./SplashSreen";
import { getRoute } from "../helpers/utils";

const { $ } = window;

export default class LandingPage extends Component {
  static propTypes = {
    splashShown: PropTypes.bool.isRequired,
    insuranceNo: PropTypes.number.isRequired,
    campaignNo: PropTypes.number.isRequired,
    risks: PropTypes.arrayOf(PropTypes.string).isRequired,
    profile: PropTypes.shape({
      greeting: PropTypes.string
    }).isRequired,
    updateSplashInfo: PropTypes.func.isRequired,
    fetchFamilyProfile: PropTypes.func.isRequired,
    fetchRisks: PropTypes.func.isRequired,
    routeToUrl: PropTypes.func.isRequired,
    updateBasicProfile: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    document.body.style.backgroundColor = "rgb(92, 169, 220)";
    const url = window.location.pathname;
    let { insuranceNo, campaignNo } = this.props;
    if (url !== "/") {
      let paths = _.drop(url.split("/"), 1);
      if (paths.length === 2) {
        paths = _.map(paths, x => parseInt(x, 10));
        insuranceNo = _.head(paths);
        campaignNo = _.head(_.tail(paths));
      } else {
        /* Invalid url */
        /* todo: Redirect to invalid page */
      }
    }
    this.props.authCheck();
    this.props.fetchFamilyProfile(insuranceNo, campaignNo);
    this.props.fetchRisks(insuranceNo, campaignNo);
    this.props.updateBasicProfile(insuranceNo, campaignNo);
  };

  componentDidMount = () => {
    const { splashShown } = this.props;
    if (splashShown === false) {
      $("#second").fadeIn(3000, () => {
        $("#second").addClass("collapse");
        $("#second").removeAttr("style");
        $("#first").fadeIn("slow");
        this.props.updateSplashInfo(true);
      });
    }
  };

  componentWillUnmount = () => {
    document.body.style.backgroundColor = "#f6fcff";
  };

  render = () => {
    const {
      profile,
      risks,
      insuranceNo,
      campaignNo,
      callToActions
    } = this.props;
    const msg = profile.greeting;

    const notifyMsgs = risks;
    const navIcons = [iconMedical, iconSick, iconLearn];

    return (
      <div>
        <div
          className={classNames({ collapse: !this.props.splashShown })}
          id="first"
        >
          <NavbarView msg={msg} />

          {_.map(notifyMsgs, (elem, index) => (
            <NotifyMessage msg={elem} index={index} key={index} />
          ))}
          {_.map(callToActions, (elem, index) => (
            <LandingNavLink
              icon={navIcons[index]}
              msg={elem.description}
              index={index}
              key={`${index}-nav`}
              url={elem.link}
              routeToUrl={this.props.routeToUrl(getRoute(elem.link))}
            />
          ))}
        </div>
        <SplashScreen />
      </div>
    );
  };
}
