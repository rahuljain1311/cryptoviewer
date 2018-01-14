import { connect } from "react-redux";
import { push } from "react-router-redux";
import { authCheck, fetchFamilyProfile, fetchRisks } from "../actions/profile";
import { updateSplashInfo, updateBasicProfile } from "../actions/meta";
import LandingPage from "../components/LandingPage";

const mapStateToProps = (state, ownProps) => ({
  insuranceNo: ownProps.match.params.insuranceNo,
  campaignNo: ownProps.match.params.campaignNo,
  profile: state.profile.profile,
  risks: state.profile.risks,
  callToActions: state.profile.callToActions,
  splashShown: state.meta.splashShown
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchFamilyProfile: (insuranceNo, campaignNo) => {
    dispatch(fetchFamilyProfile(insuranceNo, campaignNo));
  },
  fetchRisks: (insuranceNo, campaignNo) => {
    dispatch(fetchRisks(insuranceNo, campaignNo));
  },
  updateSplashInfo: status => {
    dispatch(updateSplashInfo(status));
  },
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  updateBasicProfile: (insuranceNo, campaignNo) => {
    dispatch(updateBasicProfile(insuranceNo, campaignNo));
  },
  authCheck: () => {
    dispatch(authCheck());
  }
});

const LandingPageView = connect(mapStateToProps, mapDispatchToProps)(
  LandingPage
);

export default LandingPageView;
