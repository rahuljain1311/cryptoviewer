import { connect } from "react-redux";
import { push } from "react-router-redux";
import {
  fetchDoctors,
  updatePcpScheduledTime,
  bookPcpAppointment,
  authCheck
} from "../actions/profile";
import { updateBasicProfile } from "../actions/meta";
import Sick from "../components/Sick";

const mapStateToProps = (state, ownProps) => {
  let { insuranceNo, campaignNo } = ownProps.match.params;
  insuranceNo = parseInt(insuranceNo, 10);
  campaignNo = parseInt(campaignNo, 10);
  return {
    insuranceNo,
    campaignNo,
    doctors: state.profile.doctors,
    pcpScheduled: state.profile.pcpScheduled,
    doctorText: state.profile.doctorText
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDoctors: (insuranceNo, campaignNo) => {
    dispatch(fetchDoctors(insuranceNo, campaignNo));
  },
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  bookPcpAppointment: doctorNo => () => {
    dispatch(bookPcpAppointment(doctorNo));
  },
  updatePcpScheduledTime: doctorNo => time => {
    dispatch(updatePcpScheduledTime(doctorNo, time));
  },
  authCheck: () => {
    dispatch(authCheck());
  },
  updateBasicProfile: (insuranceNo, campaignNo) => {
    dispatch(updateBasicProfile(insuranceNo, campaignNo));
  }
});

const SickView = connect(mapStateToProps, mapDispatchToProps)(Sick);

export default SickView;
