import _ from "lodash";
import moment from "moment";

export function checkStatus(response) {
  if (response.status === 200) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function isOpen(openingHours) {
  const currentDay = moment().format("dddd");
  const pharmacyTime = _.filter(openingHours, elem => elem.day === currentDay);
  if (_.isEmpty(pharmacyTime)) return true;
  const docTime = _.head(pharmacyTime);
  if (docTime.endTime === -1) return false;
  const currentTime = parseInt(moment().format("HHMM"), 10);
  return currentTime < docTime.endTime;
}

export function sortHours(hours) {
  const currentDay = moment().format("dddd");
  const pharmacyTime = _.filter(hours, elem => elem.day === currentDay);
  if (_.isEmpty(pharmacyTime)) return hours;
  const currentDayIndex = _.findIndex(hours, elem => elem.day === currentDay);
  return _.concat(
    _.drop(hours, currentDayIndex),
    _.dropRight(hours, hours.length - currentDayIndex)
  );
}

export function militaryTimeToStandard(time) {
  /* time type is String
     Eg: 900 or 1100
   */
  const ltime = time.toString();
  if (ltime.length === 3) return moment(ltime, "Hmm").format("hh:mma");
  if (ltime.length === 4) return moment(ltime, "HHmm").format("hh:mma");
  return ltime;
}

export function timeClass(time) {
  if (time <= 10) return "time-lower";
  if (time <= 20) return "time-higher";
  return "time-danger";
}

export function timeDifference(time) {
  /* Gives time difference from the current time 
     time : A moment object
   */
  const currentTime = moment();
  const diff = time.diff(currentTime);
  return moment.duration(diff).asHours();
}

export function justifyTime(time) {
  /* time: A moment object */
  const bound = [0, 15, 30, 45, 60];
  const min = parseInt(time.format("mm"), 10);
  const hasExactBound = _.filter(bound, elem => elem === min);
  if (!_.isEmpty(hasExactBound)) return time;
  function calcBound(cmin) {
    if (cmin > 0 && cmin < 15) return 15;
    if (cmin > 15 && cmin < 30) return 30;
    if (cmin > 30 && cmin < 45) return 45;
    return 60;
  }

  const nbound = Math.abs(calcBound(min) - min);
  return time.add(nbound, "minutes");
}

export function validPhoneNumber(phone) {
  function isLetter(c) {
    return c.toLowerCase() !== c.toUpperCase();
  }

  return _.filter(phone, x => isLetter(x)).length === 0;
}

export function isValidEmail(email) {
  const emails = email.split(",");
  function validateEmail(e) {
    const re =
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';
    return re.test(e);
  }
  return _.filter(emails, x => validateEmail(x)).length === emails.length;
}

let host = null;
if (process.env.REACT_APP_BUILD_TYPE === "production") {
  host = "http://13.126.232.81";
}
if (process.env.REACT_APP_BUILD_TYPE === "dev") {
  host = "http://localhost:5000";
}
if (process.env.REACT_APP_BUILD_TYPE === "staging") {
  host = "http://13.127.68.219";
}

export const hostDomain = host;

export function costColor(cost) {
  if (cost <= 50) return "time-lower";
  if (cost <= 100) return "time-higher";
  return "time-danger";
}

export const gmapUrl =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyA8IMO7TEJ4oKS_qslMabGbp2c1Rudm6CI&v=3.exp&libraries=geometry,drawing,places";

export function reArrangePharmacies(pharms, pharmacyNo) {
  const right = _.takeRightWhile(
    pharms,
    elem => elem.pharmacyNo !== pharmacyNo
  );
  const middle = _.filter(pharms, elem => elem.pharmacyNo === pharmacyNo);
  const midRight = _.concat(middle, right);
  const left = _.difference(pharms, midRight);
  const newPharms = _.concat(midRight, left);
  return newPharms;
}

export function reArrangeDoctors(docs, doctorNo) {
  const right = _.takeRightWhile(docs, elem => elem.doctorNo !== doctorNo);
  const middle = _.filter(docs, elem => elem.doctorNo === doctorNo);
  const midRight = _.concat(middle, right);
  const left = _.difference(docs, midRight);
  const newDocs = _.concat(midRight, left);
  return newDocs;
}

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export function getRoute(fullUrl) {
  if (_.isEmpty(fullUrl)) return fullUrl;
  const url = fullUrl.split("/");
  const url1 = "/" + _.drop(url, 3).join("/");
  return url1;
}
