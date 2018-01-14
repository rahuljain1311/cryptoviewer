import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchPharmacies, authCheck } from "../actions/profile";
import ListView from "../components/ListView";

const mapStateToProps = (state, ownProps) => {
  const campaignNo = ownProps.match.params.campaignNo;
  const insuranceNo = ownProps.match.params.insuranceNo;
  return {
    pharmacies: state.profile.pharmacies,
    insuranceNo,
    campaignNo,
    pharmacyText: state.profile.pharmacyText
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPharmacies: (insuranceNo, campaignNo) => {
    dispatch(fetchPharmacies(insuranceNo, campaignNo));
  },
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  authCheck: () => {
    dispatch(authCheck());
  }
});

const PharmacyView = connect(mapStateToProps, mapDispatchToProps)(ListView);

export default PharmacyView;
