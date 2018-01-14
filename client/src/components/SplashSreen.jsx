import React from "react";
import classNames from "classnames";
import splash from "../static/images/splash.png";

export default function SplashScreen() {
  return (
    <div id="second" className={classNames({ collapse: true })}>
      <div className={classNames("container splash", {})}>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <img alt="splash" className="img-responsive" src={splash} />
          </div>
        </div>
      </div>
    </div>
  );
}
