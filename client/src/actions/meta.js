import { UPDATE_SPLASH_INFO, UPDATE_BASIC_PROFILE } from "../actions/types";

export function updateSplashInfo(splashShown) {
  return {
    type: UPDATE_SPLASH_INFO,
    splashShown
  };
}

export function updateBasicProfile(insuranceNo, campaignNo) {
  return {
    type: UPDATE_BASIC_PROFILE,
    insuranceNo,
    campaignNo
  };
}
