import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchLearnInfo } from "../actions/admin";
import AskFooter from "../components/AskFooter";

const mapStateToProps = (state, ownProps) => {
  const { meta, profile } = state;
  const { campaignNo, insuranceNo } = meta;
  const { description, link } = profile.learnDetail;
  return {
    hideLearn: false,
    description,
    link,
    campaignNo,
    insuranceNo
  };
};

const mapDispatchToProps = dispatch => ({
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  fetchLearnInfo: (campaignNo, insuranceNo) => {
    dispatch(fetchLearnInfo(campaignNo, insuranceNo));
  }
});

const AskFooterView = connect(mapStateToProps, mapDispatchToProps)(AskFooter);

export default AskFooterView;
