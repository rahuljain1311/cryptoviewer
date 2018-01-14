import { connect } from "react-redux";
import { push } from "react-router-redux";
import StaticWallet from "../components/StaticWallet";
import { authCheck } from "../actions/profile";
import StaticVideoChat from "../components/StaticVideoChat";
import StaticVideoCall from "../components/StaticVideoCall";

const mapStateToProps = (state, ownProps) => {
  const { pharmacyNo } = ownProps.match.params;
  return {
    pharmacyNo
  };
};

const mapDispatchToProps = dispatch => ({
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  authCheck: () => {
    dispatch(authCheck());
  }
});

const StaticWalletView = connect(mapStateToProps, mapDispatchToProps)(
  StaticWallet
);

export const StaticVideoCallView = connect(mapStateToProps, mapDispatchToProps)(
  StaticVideoCall
);
export const StaticVideoChatView = connect(mapStateToProps, mapDispatchToProps)(
  StaticVideoChat
);

export default StaticWalletView;
