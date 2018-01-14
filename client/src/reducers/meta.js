import { UPDATE_BASIC_PROFILE, UPDATE_SPLASH_INFO } from "../actions/types";

const initialState = {
  splashShown: false,
  insuranceNo: 1,
  campaignNo: 1
};

function meta(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SPLASH_INFO:
      return {
        ...state,
        splashShown: action.splashShown
      };
    case UPDATE_BASIC_PROFILE:
      return {
        ...state,
        insuranceNo: action.insuranceNo,
        campaignNo: action.campaignNo
      };
    default:
      return state;
  }
}

export default meta;
