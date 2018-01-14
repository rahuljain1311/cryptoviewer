import { connect } from "react-redux";
import { push } from "react-router-redux";
import {
  adminValidationReset,
  adminValidationFailure,
  fetchProfiles,
  updateAdminInput,
  sendMessage,
  sentSMSFailed,
  updateSubmitted
} from "../actions/admin";
import Admin from "../components/Admin";

const { $ } = window;

const mapStateToProps = (state, ownProps) => {
  const { admin } = state;
  const { profiles, adminInput } = admin;
  return {
    isAdmin: admin.isAdmin,
    profiles,
    ...adminInput
  };
};

const mapDispatchToProps = dispatch => ({
  routeToLogin: () => {
    dispatch(push("/login"));
  },
  fetchProfiles: () => {
    dispatch(fetchProfiles());
  },
  updateAdminInput: field => e => {
    dispatch(updateAdminInput(field, e.target.value));
  },
  adminValidationReset: () => {
    dispatch(adminValidationReset());
  },
  adminValidationFailure: (field, msg) => {
    dispatch(adminValidationFailure(field, msg));
  },
  sendMessage: (
    insuranceNo,
    messageType,
    mobile,
    email,
    eunit,
    etime,
    campaignNo,
    customizedName
  ) => {
    dispatch(
      sendMessage(
        insuranceNo,
        messageType,
        mobile,
        email,
        eunit,
        etime,
        campaignNo,
        customizedName
      )
    );
  },
  sentSMSFailed: value => {
    /* $(".close").alert("close"); */
    dispatch(sentSMSFailed(value));
  },
  updateSubmitted: value => {
    /* $(".close").alert("close"); */
    dispatch(updateSubmitted(value));
  }
});

const AdminView = connect(mapStateToProps, mapDispatchToProps)(Admin);

export default AdminView;
