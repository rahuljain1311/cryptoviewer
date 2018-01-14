import React, { Component } from "react";
import NavbarView from "../containers/NavbarView";
import SummaryHeader from "./SummaryHeader";
import SummaryBody from "./SummaryBody";
import SummaryInformation from "./SummaryInformation";
import AppFooter from "./AppFooter";
import { appFooterRE } from "../purescript/output/AppFooter";
import { summaryHeader } from "../purescript/output/SummaryHeader";
import { summaryBody } from "../purescript/output/SummaryBody";
import { summaryInformation } from "../purescript/output/SummaryInformation";
import { summaryFooter } from "../purescript/output/SummaryFooter";
import { ire } from "../purescript/output/Utils.Helpers";

export default class SummaryPage extends Component {
  componentDidMount = () => {
    const { insuranceNo, campaignNo } = this.props;
    this.props.authCheck();
    this.props.fetchSummaryDetails(insuranceNo, campaignNo);
  };

  render = () => {
    const {
      coverage,
      youOwe,
      landingPageGreeting,
      whatToExpectNow,
      alert
    } = this.props.summaryDetail;
    const { insuranceNo, campaignNo } = this.props;
    const homeUrl = `/profile/${insuranceNo}/${campaignNo}`;

    return (
      <div>
        <NavbarView msg={null} />
        {summaryHeader({ coverage, youOwe, landingPageGreeting })}
        <hr className="flu-hr" />
        {summaryBody({ whatToExpectNow })}
        {summaryInformation({ alert, routeToUrl: this.props.routeToUrl })}
        {ire}
        <hr className="only-border-hr" />
        {summaryFooter({
          routeToUrl: this.props.routeToUrl,
          insuranceNo,
          campaignNo
        })}
        {appFooterRE}
      </div>
    );
  };
}
