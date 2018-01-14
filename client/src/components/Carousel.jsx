import React, { Component } from "react";
import _ from "lodash";
import Slider from "react-slick";
import Pharmacy from "./Pharmacy";

export default class Carousel extends Component {
  componentDidMount = () => {
    const ref = this.refs.slider;
    this.props.updateSliderRef(ref);
  };

  render = () => {
    const { props } = this;
    /* let slideNo = 1;
     * if (_.has(props, "fluMap")) {
     *   slideNo = props.fluMap.currentPharmacy;
     * }
     * if (_.has(props, "sickMap")) {
     *   slideNo = props.sickMap.currentDoctor;
     * }
     * console.log("va", slideNo);*/
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (oldIndex, newIndex) => {
        let id = null;
        if (_.has(_.head(props.locations), "doctorNo"))
          id = props.locations[newIndex].doctorNo;
        else id = props.locations[newIndex].pharmacyNo;
        props.updateCurrentMarker(id)();
        /* console.log("indexs", oldIndex, newIndex, doctorNo); */
      }
    };

    return (
      <Slider {...settings} ref="slider">
        {_.map(props.locations, elem => {
          let id = null;
          let routeUrl = null;
          if (_.has(elem, "doctorNo")) {
            id = elem.doctorNo;
            routeUrl = () => {};
          } else {
            id = elem.pharmacyNo;
            routeUrl = props.routeToUrl(`/pharmacy/${id}`);
          }
          return (
            <div>
              <Pharmacy
                style={{ margin: "10px" }}
                key={id}
                index={id}
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
                routeToUrl={routeUrl}
                bookPcpAppointment={() => {}}
                updatePcpScheduledTime={() => {}}
                pcpScheduled={() => {}}
                overridePCP={false}
              />
            </div>
          );
        })}
      </Slider>
    );
  };
}
