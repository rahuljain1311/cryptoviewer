import { connect } from "react-redux";
import { push, goBack } from "react-router-redux";
import { logout } from "../actions/admin";
import Navbar from "../components/Navbar";
import { navBarRE } from "../purescript/output/Navbar";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  splashShown: state.meta.splashShown
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  goBack: url => () => {
    dispatch(goBack());
  },
  routeToUrl: url => () => {
    dispatch(push(url));
  },
  logout: () => {
    dispatch(logout());
  }
});

const NavbarView = connect(mapStateToProps, mapDispatchToProps)(navBarRE);

export default NavbarView;
