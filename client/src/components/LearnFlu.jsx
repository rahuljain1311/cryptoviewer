import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import NavbarView from "../containers/NavbarView";
import AskFooterView from "../containers/AskFooterView";
import AppFooter from "./AppFooter";
import barBg from "../static/images/barBg.png";
import iconCare from "../static/images/iconCare.png";

export default class LearnFlu extends Component {
  static propTypes = {
    campaignNo: PropTypes.number.isRequired,
    insuranceNo: PropTypes.number.isRequired,
    campaignInfo: PropTypes.shape({
      description: PropTypes.string,
      symptoms: PropTypes.arrayOf(PropTypes.string),
      whenToSeeADoctor: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    fetchCampaign: PropTypes.func.isRequired,
    routeToUrl: PropTypes.func.isRequired,
    authCheck: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    const { campaignNo, insuranceNo } = this.props;
    this.props.authCheck();
    this.props.fetchCampaign(campaignNo);
    this.props.fetchLearnInfo(campaignNo, insuranceNo);
    window.scrollTo(0, 0);
  };

  render = () => {
    const { campaignInfo, campaignNo, insuranceNo } = this.props;
    const { description, symptoms, whenToSeeADoctor } = campaignInfo;
    return (
      <div>
        <NavbarView backButton msg={"Cough, Flu, & Colds"} />
        <div className="container" style={{ marginTop: "85px" }}>
          <div className="row">
            <h4
              className="text-uppercase"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              What you need to know
            </h4>
            <p
              style={{
                margin: "20px",
                marginTop: "10px",
                marginBottom: "3px",
                fontWeight: "lighter"
              }}
            >
              {description}
            </p>
          </div>
          <div
            className="row"
            style={{
              border: "1px solid rgb(0, 121, 200)",
              borderRadius: "4px",
              margin: "5px",
              backgroundImage: `url(${barBg})`,
              fontWeight: "lighter"
            }}
          >
            <div className="col-xs-12">
              <h5 style={{ fontWeight: "bold" }}>
                Common Cold & Flu Symptoms:
              </h5>
            </div>
            {_.map(symptoms, elem => (
              <div className="col-xs-12">
                <p>
                  <span style={{ marginRight: "5px" }}>
                    <i
                      className="fa fa-circle icon-pat-dblue"
                      aria-hidden="true"
                    />
                  </span>
                  {elem}
                </p>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <h4
              className="text-uppercase"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              When to see a doctor
            </h4>
            <p
              style={{
                margin: "20px",
                marginTop: "10px",
                marginBottom: "3px",
                fontWeight: "lighter"
              }}
            >
              If you have any of the following symptoms, it’s best to see a
              doctor.
            </p>
          </div>
          <div
            className="row"
            style={{
              border: "1px solid rgb(0, 121, 200)",
              borderRadius: "4px",
              margin: "5px",
              backgroundImage: `url(${barBg})`,
              fontWeight: "lighter"
            }}
          >
            {_.map(whenToSeeADoctor, (elem, index) => {
              const docStyle = index === 0 ? { marginTop: "10px" } : {};
              return (
                <div className="col-xs-12" style={docStyle}>
                  <p>
                    <span style={{ marginRight: "5px" }}>
                      <i
                        className="fa fa-circle icon-pat-dblue"
                        aria-hidden="true"
                      />
                    </span>
                    {elem}
                  </p>
                </div>
              );
            })}
          </div>
          <div
            className="row"
            style={{ margin: "5px", marginTop: "15px", marginBottom: "15px" }}
          >
            <button
              onClick={this.props.routeToUrl(
                `/sick/${insuranceNo}/${campaignNo}`
              )}
              className="btn-primary btn-lg btn-block"
            >
              <span>
                <img
                  alt=""
                  style={{
                    verticalAlign: "textTop",
                    position: "relative",
                    top: "-4px",
                    right: "6px"
                  }}
                  src={iconCare}
                />
              </span>Care Options Nearby
            </button>
          </div>
        </div>
        <AskFooterView hideLearn={true} />
        <AppFooter />
      </div>
    );
  };
}
