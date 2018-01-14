import {
  ADMIN_VALIDATION_FAILURE,
  ADMIN_VALIDATION_RESET,
  UPDATE_ADMIN_PROFILES,
  UPDATE_ADMIN_INPUT,
  UPDATE_SUBMITTED,
  UPDATE_ADMIN,
  SEND_SMS_FAILED,
  SENT_SMS_PROGRESS,
  SENT_SMS_FINISHED,
  LOGOUT
} from "../actions/types";

const initialState = {
  isAdmin: false,
  profiles: [],
  adminInput: {
    email: "",
    phone: "",
    msgType: "alert",
    insuranceNo: 1,
    campaignNo: 1,
    expiryTime: 1,
    customizedName: "",
    expiryUnit: "days",
    onProgress: false,
    apiFailed: false,
    apiSuccess: false,
    validation: {
      email: true,
      emailMsg: "",
      phone: true,
      phoneMsg: ""
    }
  }
};

function admin(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ADMIN_PROFILES:
      return {
        ...state,
        profiles: action.data
      };
    case UPDATE_ADMIN_INPUT:
      return {
        ...state,
        adminInput: {
          ...state.adminInput,
          [action.field]: action.value
        }
      };
    case ADMIN_VALIDATION_FAILURE:
      return {
        ...state,
        adminInput: {
          ...state.adminInput,
          validation: {
            ...state.adminInput.validation,
            [action.field]: false,
            [`${action.field}Msg`]: action.msg
          }
        }
      };

    case ADMIN_VALIDATION_RESET:
      return {
        ...state,
        adminInput: {
          ...state.adminInput,
          validation: {
            ...initialState.adminInput.validation
          }
        }
      };
    case UPDATE_SUBMITTED:
      return {
        ...state,
        adminInput: {
          ...state.adminInput,
          apiSuccess: action.value
        }
      };
    case SENT_SMS_PROGRESS:
      return {
        ...state,
        adminInput: {
          ...state.adminInput,
          onProgress: true
        }
      };
    case SEND_SMS_FAILED:
      return {
        ...state,
        adminInput: {
          ...state.adminInput,
          apiFailed: action.value
        }
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        isAdmin: true
      };
    case SENT_SMS_FINISHED:
      return {
        ...state,
        adminInput: {
          ...state.adminInput,
          onProgress: false
        }
      };
    case LOGOUT:
      return {
        ...state,
        adminInput: {
          ...initialState.adminInput
        }
      };
    default:
      return state;
  }
}

export default admin;
