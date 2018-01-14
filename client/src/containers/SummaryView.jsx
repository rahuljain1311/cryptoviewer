import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchSummaryDetails, authCheck } from "../actions/profile";
import SummaryPage from "../components/Summary";

const mapStateToProps = (state, ownProps) => {
  const { insuranceNo, campaignNo } = ownProps.match.params;
  return {
    summaryDetail: state.profile.summaryDetail,
    insuranceNo,
    campaignNo
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSummaryDetails: (insuranceNo, campaignNo) => {
    dispatch(fetchSummaryDetails(insuranceNo, campaignNo));
  },
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  authCheck: () => {
    dispatch(authCheck());
  }
});

const SummaryView = connect(mapStateToProps, mapDispatchToProps)(SummaryPage);

export default SummaryView;
