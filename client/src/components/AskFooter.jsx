import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { getRoute } from "../helpers/utils";
import fluQuestion from "../static/images/fluQuestion.png";

export default class AskFooter extends Component {
  componentDidMount() {
    const { campaignNo, insuranceNo } = this.props;
    this.props.fetchLearnInfo(campaignNo, insuranceNo);
  }

  render() {
    const { hideLearn } = this.props;
    const routeUrl = getRoute(this.props.link);
    return (
      <div className="container pharmacy-flu-help">
        <div className="row">
          <div
            className={classNames("col-xs-12 text-center", { hide: hideLearn })}
            onClick={this.props.routeToUrl(routeUrl)}
          >
            <p>
              {this.props.description}
              <span
                className="glyphicon glyphicon-menu-right right-arrow"
                aria-hidden="true"
              />
            </p>
          </div>

          <div className="col-xs-12 text-center">
            <p>Unsure about your symptoms?</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 center-block text-center">
            <button
              className="btn btn-primary"
              onClick={this.props.routeToUrl(routeUrl)}
            >
              <img alt="" src={fluQuestion} />
              Ask Question
            </button>

            <button
              className="btn btn-primary"
              onClick={this.props.routeToUrl(routeUrl)}
            >
              <i className="fa fa-phone fa-lg" aria-hidden="true" />
              Nurse Hotline
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AskFooter.propTypes = {
  routeToUrl: PropTypes.func.isRequired,
  hideLearn: PropTypes.bool
};

AskFooter.defaultProps = {
  hideLearn: false
};
