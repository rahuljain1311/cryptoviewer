import { push } from "react-router-redux";
import _ from "lodash";
import {
  ADMIN_VALIDATION_RESET,
  ADMIN_VALIDATION_FAILURE,
  UPDATE_ADMIN_PROFILES,
  SENT_SMS_PROGRESS,
  UPDATE_ADMIN_INPUT,
  UPDATE_SUBMITTED,
  UPDATE_ADMIN,
  SEND_SMS_FAILED,
  SENT_SMS_FINISHED,
  UPDATE_LEARN_INFO,
  LOGOUT
} from "../actions/types";
import { checkStatus, hostDomain } from "../helpers/utils";
const { $ } = window;

export function didLogout() {
  return {
    type: LOGOUT
  };
}

export function updateAdminProfiles(data) {
  return {
    type: UPDATE_ADMIN_PROFILES,
    data
  };
}

export function updateAdminInput(field, value) {
  return {
    type: UPDATE_ADMIN_INPUT,
    field,
    value
  };
}

export function adminValidationFailure(field, msg) {
  return {
    type: ADMIN_VALIDATION_FAILURE,
    field,
    msg
  };
}

export function adminValidationReset() {
  return {
    type: ADMIN_VALIDATION_RESET
  };
}

export function fetchProfiles() {
  return dispatch =>
    fetch(`${hostDomain}/api/allprofiles`, {
      method: "GET",
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(updateAdminProfiles(json));
      })
      .catch(e => {});
}

export function updateSubmitted(value) {
  return {
    type: UPDATE_SUBMITTED,
    value
  };
}

export function sentSMSFailed(value) {
  return {
    type: SEND_SMS_FAILED,
    value
  };
}

export function sentSMSProgress() {
  return {
    type: SENT_SMS_PROGRESS
  };
}

export function sentSMSFinished() {
  return {
    type: SENT_SMS_FINISHED
  };
}

export function sendMessage(
  insuranceNo,
  messageType,
  mobile,
  email,
  expiryUnit,
  expiryTime,
  campaignNo,
  customizedName
) {
  return dispatch => {
    dispatch(sentSMSProgress());
    dispatch(adminValidationReset());
    const fdata = new FormData();
    fdata.append("insuranceNo", insuranceNo);
    fdata.append("messageType", messageType);
    fdata.append("phoneNumbers", mobile);
    fdata.append("emailIds", email);
    fdata.append("expiryUnit", expiryUnit);
    fdata.append("expiryTime", expiryTime);
    fdata.append("campaignNo", campaignNo);
    fdata.append("customizedName", customizedName);
    fetch(`${hostDomain}/api/admin`, {
      method: "POST",
      credentials: "include",
      body: fdata
    })
      .then(checkStatus)
      .then(() => {
        dispatch(sentSMSFinished());
        dispatch(sentSMSFailed(false));
        dispatch(updateSubmitted(true));
        /* $("sms-success").alert("open");*/
      })
      .catch(data => {
        /* $("#sms-failure").alert("open");*/
        data.response.json().then(dat => {
          if (_.has(dat, "errorDescription")) {
            const { errorDescription } = dat;
            const phoneErrors = _.filter(
              errorDescription,
              elem => elem.fieldName === "phone"
            );
            const emailErrors = _.filter(
              errorDescription,
              elem => elem.fieldName === "email"
            );
            const phoneMsg = _.map(phoneErrors, elem => elem.msg);
            const emailMsg = _.map(emailErrors, elem => elem.msg);
            if (!_.isEmpty(phoneMsg)) {
              dispatch(adminValidationFailure("phone", phoneMsg.join(", ")));
            }
            if (!_.isEmpty(emailMsg)) {
              dispatch(adminValidationFailure("email", emailMsg.join(", ")));
            }
          }
        });
        dispatch(sentSMSFinished());
        dispatch(sentSMSFailed(true));
        dispatch(updateSubmitted(false));
      });
  };
}

export function logout() {
  return dispatch =>
    fetch(`${hostDomain}/api/logout`, {
      method: "PUT",
      credentials: "include"
    })
      .then(checkStatus)
      .then(() => {
        dispatch(didLogout());
        dispatch(push("/login"));
      })
      .catch(e => {});
}

export function updateAdmin(isAdmin) {
  return {
    type: UPDATE_ADMIN,
    isAdmin
  };
}

export function updateLearnInfo(data) {
  return {
    type: UPDATE_LEARN_INFO,
    data
  };
}

export function fetchLearnInfo(campaignNo, insuranceNo) {
  return dispatch =>
    fetch(`${hostDomain}/api/${campaignNo}/learnmore/${insuranceNo}`, {
      method: "GET",
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(updateLearnInfo(json));
      })
      .catch(e => {});
}
