"use strict";

var rrr = require("react-router-redux");
var rr = require("react-redux");
var _ = require("lodash");
var moment = require("moment");

exports.push = function(url) {
  return rrr.push(url);
};

exports.round = function(value) {
  return function(precision) {
    return _.round(value, precision);
  };
};

exports.changeLocImpl = function(value) {
  document.location.href = value;
  return {};
};

exports.windowOpenImpl = function(value) {
  window.open(value, "_blank");
  return {};
};

exports.isOpen = function(openingHours) {
  const currentDay = moment().format("dddd");
  const pharmacyTime = _.filter(openingHours, function(elem) {
    return elem.day === currentDay;
  });
  if (_.isEmpty(pharmacyTime)) return true;
  const docTime = _.head(pharmacyTime);
  if (docTime.endTime === -1) return false;
  const currentTime = parseInt(moment().format("HHMM"), 10);
  return currentTime < docTime.endTime;
};

exports.timeString = function(time) {
  return function(formatString) {
    return moment(time).format(formatString);
  };
};

exports.modalOpenImpl = function(id) {
  const $ = window.$;
  $(id).modal("show");
  return {};
};

exports.getRouteImpl = function(fullUrl) {
  if (_.isEmpty(fullUrl)) return fullUrl;
  const url = fullUrl.split("/");
  return "/" + _.drop(url, 3).join("/");
};
