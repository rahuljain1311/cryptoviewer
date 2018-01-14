import React from "react";

export default function SummaryHeader(props) {
  const { coverage, youOwe, landingPageGreeting } = props;

  return (
    <div className="container flu-summary">
      <div className="row">
        <div className="col-xs-12 text-center flu-header">
          <p>FLU PREVENTION SUMMARY</p>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 text-center lighter">
          <p>{landingPageGreeting}</p>
        </div>
      </div>

      <div className="container plan-summary">
        <div className="row">
          <div className="col-xs-8 flu-subheader">
            <p>Your plan should cover:</p>
          </div>

          <div className="col-xs-4 amount">{coverage}</div>
        </div>

        <div className="row">
          <div className="col-xs-8 flu-subheader">
            <p>You owe:</p>
          </div>

          <div className="col-xs-4 amount">{youOwe}</div>
        </div>
      </div>
    </div>
  );
}
