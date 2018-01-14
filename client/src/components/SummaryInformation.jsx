import React from "react";

export default function SummaryInformation(props) {
  const { alert } = props;

  return (
    <div className="container flu-find">
      <div className="row">
        <div className="col-xs-12">
          <p>{alert}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <button
            className="btn btn-primary btn-block"
            onClick={props.routeToUrl("/pharmacy")}
          >
            <i
              className="fa fa-search"
              aria-hidden="true"
              style={{
                marginRight: "3px",
                position: "relative",
                bottom: "1px"
              }}
            />
            Find flu shots near me
          </button>
        </div>
      </div>
    </div>
  );
}
