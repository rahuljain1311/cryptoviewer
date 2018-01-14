import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import $ from "jquery";

global.$ = global.jQuery = $;

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

configure({ adapter: new Adapter() });
