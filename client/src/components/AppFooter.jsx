import React from "react";
import appStore from "../static/images/appStore.png";

export default function AppFooter() {
  return (
    <div className="container app-footer">
      <div className="row">
        <div className="col-xs-7" style={{ fontSize: "9px" }}>
          The
          <strong>&nbsp;ACME Insurance Member App&nbsp;</strong>helps you make
          the most of no-cost preventative care for your family.
        </div>

        <div className="col-xs-5">
          <img alt="" src={appStore} className="img-responsive" />
        </div>
      </div>
    </div>
  );
}
