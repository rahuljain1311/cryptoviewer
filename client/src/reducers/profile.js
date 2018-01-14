import _ from "lodash";
import moment from "moment";
import { justifyTime } from "../helpers/utils";
import {
  UPDATE_PHARMACIES,
  UPDATE_RISKS,
  UPDATE_FAMILY_PROFILE,
  UPDATE_SUMMARY_DETAIL,
  UPDATE_SCHEDULED_TIME,
  BOOK_APPOINTMENT,
  BOOK_PCP_APPOINTMENT,
  UPDATE_PROFILE_DOCTORS,
  UPDATE_PCP_SCHEDULED_TIME,
  UPDATE_SICK_MARKER,
  UPDATE_MAP_REFERENCE,
  UPDATE_SLIDER_REFERENCE,
  UPDATE_FLU_MARKER,
  UPDATE_CAMPAIGN_INFO,
  UPDATE_CAROUSEL_LOCATIONS,
  UPDATE_CAROUSEL_DOC_LOCATIONS,
  UPDATE_LEARN_INFO
} from "../actions/types";

const justifiedTime = justifyTime(moment().add(15, "minutes"));
const schedTime = parseInt(justifiedTime.format("x"), 10);

const initialState = {
  insuranceNo: 1,
  risks: [],
  pharmacies: [],
  carLocations: [],
  doctorText: "",
  pharmacyText: "",
  campaignInfo: {
    description: null,
    symptoms: [],
    whenToSeeADoctor: []
  },
  doctors: [],
  docLocations: [],
  sickMap: {
    currentDoctor: 1
  },
  fluMap: {
    currentPharmacy: 1
  },
  scheduled: [],
  pcpScheduled: {
    scheduled: false,
    time: schedTime
  },
  profile: {
    greeting: null
  },
  summaryDetail: {
    coverage: null,
    youOwe: null,
    landingPageGreeting: null,
    whatToExpectNow: []
  },
  mapRef: {
    sick: null,
    flu: null,
    slider: null
  },
  callToActions: [],
  learnDetail: {
    description: "",
    link: ""
  }
};

function profile(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LEARN_INFO:
      return {
        ...state,
        learnDetail: {
          ...action.data
        }
      };
    case UPDATE_RISKS:
      return {
        ...state,
        insuranceNo: action.insuranceNo,
        risks: action.data.risks,
        callToActions: action.data.callToActions
      };
    case UPDATE_FAMILY_PROFILE:
      return {
        ...state,
        insuranceNo: action.insuranceNo,
        profile: action.profile
      };
    case UPDATE_PHARMACIES: {
      const justTime = justifyTime(moment().add(15, "minutes"));
      const pharmacies = action.data.pharmacies;
      const scheduled = _.map(pharmacies, elem => ({
        pharmacyNo: elem.pharmacyNo,
        scheduled: false,
        time: parseInt(justTime.format("x"), 10)
      }));
      if (_.isEmpty(state.carLocations)) {
        return {
          ...state,
          pharmacies: pharmacies,
          carLocations: pharmacies,
          scheduled,
          pharmacyText: action.data.pharmacyText
        };
      }
      return {
        ...state,
        pharmacies,
        scheduled,
        pharmacyText: action.data.pharmacyText
      };
    }
    case BOOK_PCP_APPOINTMENT:
      return {
        ...state,
        pcpScheduled: {
          ...state.pcpScheduled,
          scheduled: true
        }
      };
    case BOOK_APPOINTMENT: {
      const newScheduled = _.map(state.scheduled, elem => {
        if (elem.pharmacyNo === action.pharmacyNo) {
          return {
            ...elem,
            scheduled: true
          };
        }
        return elem;
      });
      return {
        ...state,
        scheduled: newScheduled
      };
    }
    case UPDATE_SCHEDULED_TIME: {
      let newScheduled = state.scheduled;
      newScheduled = _.map(newScheduled, elem => {
        if (elem.pharmacyNo === action.pharmacyNo) {
          const newElem = elem;
          newElem.time = action.time;
          return newElem;
        }
        return elem;
      });
      return {
        ...state,
        scheduled: newScheduled
      };
    }
    case UPDATE_PCP_SCHEDULED_TIME:
      return {
        ...state,
        pcpScheduled: {
          ...state.pcpScheduled,
          time: action.time
        }
      };
    case UPDATE_SUMMARY_DETAIL:
      return {
        ...state,
        summaryDetail: action.data
      };
    case UPDATE_PROFILE_DOCTORS: {
      const doctors = action.data.doctors;
      if (_.isEmpty(state.doctors)) {
        return {
          ...state,
          doctors: doctors,
          docLocations: doctors,
          doctorText: action.data.doctorText
        };
      }
      return {
        ...state,
        doctors,
        doctorText: action.data.doctorText
      };
    }
    case UPDATE_SICK_MARKER:
      return {
        ...state,
        sickMap: {
          ...state.sickMap,
          currentDoctor: action.doctorNo
        }
      };
    case UPDATE_FLU_MARKER:
      return {
        ...state,
        fluMap: {
          ...state.fluMap,
          currentPharmacy: action.pharmacyNo
        }
      };
    case UPDATE_MAP_REFERENCE: {
      switch (action.mapType) {
        case "sick":
          return {
            ...state,
            mapRef: {
              ...state.mapRef,
              sick: action.mapRef
            }
          };
        case "flu":
          return {
            ...state,
            mapRef: {
              ...state.mapRef,
              flu: action.mapRef
            }
          };
        default:
          return state;
      }
    }
    case UPDATE_SLIDER_REFERENCE:
      return {
        ...state,
        mapRef: {
          ...state.mapRef,
          slider: action.sliderRef
        }
      };
    case UPDATE_CAMPAIGN_INFO:
      return {
        ...state,
        campaignInfo: {
          ...action.campaignInfo
        }
      };
    case UPDATE_CAROUSEL_LOCATIONS:
      return {
        ...state,
        carLocations: action.locations
      };
    case UPDATE_CAROUSEL_DOC_LOCATIONS:
      return {
        ...state,
        docLocations: action.locations
      };
    default:
      return state;
  }
}

export default profile;
