import { connect } from "react-redux";
import { push } from "react-router-redux";
import { authCheck, fetchCampaign } from "../actions/profile";
import { fetchLearnInfo } from "../actions/admin";
import LearnFlu from "../components/LearnFlu";

const mapStateToProps = (state, ownProps) => {
  const { campaignNo, insuranceNo } = ownProps.match.params;
  const { campaignInfo } = state.profile;
  return {
    campaignNo,
    insuranceNo,
    campaignInfo,
    ...ownProps
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCampaign: campaignNo => {
    dispatch(fetchCampaign(campaignNo));
  },
  fetchLearnInfo: (campaignNo, insuranceNo) => {
    dispatch(fetchLearnInfo(campaignNo, insuranceNo));
  },
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  authCheck: () => {
    dispatch(authCheck());
  }
});

const LearnFluView = connect(mapStateToProps, mapDispatchToProps)(LearnFlu);

export default LearnFluView;
