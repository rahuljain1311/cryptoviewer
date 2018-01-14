import React from "react";
import _ from "lodash";
import fluQuestion from "../static/images/fluQuestion.png";
import fluFind from "../static/images/fluFind.png";

export default function SummaryBody(props) {
  const { whatToExpectNow } = props;

  return (
    <div className="container flu-expect">
      <div className="row">
        <div className="col-xs-12 text-center flu-header">
          <p>WHAT TO EXPECT NOW</p>
        </div>
      </div>

      <div className="row info">
        <div className="col-xs-12">
          <ul>
            {_.map(whatToExpectNow, (elem, index) => {
              return <li key={index}>{elem}</li>;
            })}
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 center-block text-center">
          <button className="btn btn-primary">
            <img alt="" src={fluQuestion} style={{ marginRight: "2px" }} />
            Ask Question
          </button>

          <button className="btn btn-primary">
            <img
              alt=""
              src={fluFind}
              style={{ marginTop: "-2px", marginRight: "3px" }}
            />
            Nurse Hotline
          </button>
        </div>
      </div>
    </div>
  );
}
