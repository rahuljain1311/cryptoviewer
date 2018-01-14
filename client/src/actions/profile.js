import { push } from "react-router-redux";
import {
  UPDATE_RISKS,
  UPDATE_SICK_MARKER,
  UPDATE_FAMILY_PROFILE,
  UPDATE_PHARMACIES,
  UPDATE_SUMMARY_DETAIL,
  UPDATE_SCHEDULED_TIME,
  BOOK_APPOINTMENT,
  UPDATE_PROFILE_DOCTORS,
  BOOK_PCP_APPOINTMENT,
  UPDATE_PCP_SCHEDULED_TIME,
  UPDATE_MAP_REFERENCE,
  UPDATE_SLIDER_REFERENCE,
  UPDATE_FLU_MARKER,
  UPDATE_CAMPAIGN_INFO,
  UPDATE_CAROUSEL_LOCATIONS,
  UPDATE_CAROUSEL_DOC_LOCATIONS
} from "./types";
import { checkStatus, hostDomain } from "../helpers/utils";

export function updateRisks(insuranceNo, data) {
  return {
    type: UPDATE_RISKS,
    insuranceNo,
    data
  };
}

export function updateFamilyProfile(insuranceNo, profile) {
  return {
    type: UPDATE_FAMILY_PROFILE,
    insuranceNo,
    profile
  };
}

export function fetchRisks(insuranceNo, campaignNo) {
  return dispatch =>
    fetch(`${hostDomain}/api/${campaignNo}/homepage/${insuranceNo}`, {
      method: "GET",
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(updateRisks(insuranceNo, json));
      })
      .catch(() => {
        dispatch(updateRisks(insuranceNo, []));
      });
}

export function fetchFamilyProfile(insuranceNo, campaignNo) {
  return dispatch =>
    fetch(`${hostDomain}/api/${campaignNo}/familyprofile/${insuranceNo}`, {
      method: "GET",
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(updateFamilyProfile(insuranceNo, json));
      })
      .catch(() => {
        dispatch(updateFamilyProfile(insuranceNo, []));
      });
}

export function updatePharmacies(data) {
  return {
    type: UPDATE_PHARMACIES,
    data
  };
}

export function fetchPharmacies(insuranceNo, campaignNo) {
  return dispatch =>
    fetch(`${hostDomain}/api/${campaignNo}/pharmacies/${insuranceNo}`, {
      method: "GET",
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(updatePharmacies(json));
      })
      .catch(() => {
        dispatch(updatePharmacies([]));
      });
}

export function updateSummaryDetail(data) {
  return {
    type: UPDATE_SUMMARY_DETAIL,
    data
  };
}

export function fetchSummaryDetails(insuranceNo, campaignNo) {
  return dispatch =>
    fetch(`${hostDomain}/api/${campaignNo}/summary/${insuranceNo}`, {
      method: "GET",
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(updateSummaryDetail(json));
      })
      .catch(() => {
        dispatch(updateSummaryDetail({}));
      });
}

export function updateScheduledTime(pharmacyNo, time) {
  return {
    type: UPDATE_SCHEDULED_TIME,
    pharmacyNo,
    time
  };
}

export function updatePcpScheduledTime(doctorNo, time) {
  return {
    type: UPDATE_PCP_SCHEDULED_TIME,
    doctorNo,
    time
  };
}

export function bookAppointment(pharmacyNo) {
  return {
    type: BOOK_APPOINTMENT,
    pharmacyNo
  };
}

export function bookPcpAppointment(doctorNo) {
  return {
    type: BOOK_PCP_APPOINTMENT,
    doctorNo
  };
}

export function updateProfileDoctors(doctors) {
  return {
    type: UPDATE_PROFILE_DOCTORS,
    data: doctors
  };
}

export function fetchDoctors(insuranceNo, campaignNo) {
  return dispatch =>
    fetch(`${hostDomain}/api/${campaignNo}/doctors/${insuranceNo}`, {
      method: "GET",
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(updateProfileDoctors(json));
      })
      .catch(() => {
        dispatch(updateProfileDoctors([]));
      });
}

export function updateSickMarker(doctorNo) {
  return {
    type: UPDATE_SICK_MARKER,
    doctorNo
  };
}

export function updateFluMarker(pharmacyNo) {
  return {
    type: UPDATE_FLU_MARKER,
    pharmacyNo
  };
}

export function updateMapReference(mapRef, mapType) {
  return {
    type: UPDATE_MAP_REFERENCE,
    mapType,
    mapRef
  };
}

export function updateSliderRef(sliderRef) {
  return {
    type: UPDATE_SLIDER_REFERENCE,
    sliderRef
  };
}

export function updateCampaignInfo(campaignInfo) {
  return {
    type: UPDATE_CAMPAIGN_INFO,
    campaignInfo
  };
}

export function fetchCampaign(campaignNo) {
  return dispatch =>
    fetch(`${hostDomain}/api/campaign/${campaignNo}`, {
      method: "GET",
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        dispatch(updateCampaignInfo(json));
      })
      .catch(() => {
        dispatch(updateCampaignInfo({}));
      });
}

export function authCheck() {
  return dispatch =>
    fetch(`${hostDomain}/u/authCheck`, {
      method: "POST",
      credentials: "include"
    })
      .then(checkStatus)
      .then(resp => {
        console.log("resp", resp);
      })
      .catch(() => {
        dispatch(push("/404"));
      });
}

export function updateCarLocations(locations) {
  return {
    type: UPDATE_CAROUSEL_LOCATIONS,
    locations
  };
}

export function updateDocLocations(locations) {
  return {
    type: UPDATE_CAROUSEL_DOC_LOCATIONS,
    locations
  };
}
