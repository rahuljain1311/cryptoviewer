import { connect } from "react-redux";
import _ from "lodash";
import { push } from "react-router-redux";
import PharmacyDetail from "../components/PharmacyDetail";
import {
  updateScheduledTime,
  bookAppointment,
  authCheck
} from "../actions/profile";

const mapStateToProps = (state, ownProps) => {
  const pharmacyId = ownProps.match.params.pharmacyNo;
  const pharmacyNo = parseInt(pharmacyId, 10);
  let pharmacy = null;
  pharmacy = _.filter(
    state.profile.pharmacies,
    elem => elem.pharmacyNo === pharmacyNo
  );
  if (!_.isEmpty(pharmacy)) pharmacy = _.head(pharmacy);
  let scheduled = null;
  scheduled = _.filter(
    state.profile.scheduled,
    elem => elem.pharmacyNo === pharmacyNo
  );
  if (!_.isEmpty(scheduled)) scheduled = _.head(scheduled);
  return {
    pharmacyNo,
    pharmacy,
    schedule: scheduled
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  updateScheduledTime: pharmacyNo => time => {
    dispatch(updateScheduledTime(pharmacyNo, time));
  },
  bookAppointment: pharmacyNo => () => {
    dispatch(bookAppointment(pharmacyNo));
  },
  authCheck: () => {
    dispatch(authCheck());
  }
});

const PharmacyDetailView = connect(mapStateToProps, mapDispatchToProps)(
  PharmacyDetail
);

export default PharmacyDetailView;
