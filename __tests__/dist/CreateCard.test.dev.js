"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("@wojtekmaj/enzyme-adapter-react-17"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _FlashcardsContainer = _interopRequireDefault(require("../client/containers/FlashcardsContainer"));

var _Topics = _interopRequireDefault(require("../client/components/Topics"));

var _Cards = _interopRequireDefault(require("../client/components/Cards"));

var _CreateCard = _interopRequireDefault(require("../client/components/CreateCard"));

var _Login = _interopRequireDefault(require("../client/components/Login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import components
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});
describe('React unit tests', function () {
  // topics
  describe('Topics', function () {
    var wrapper;
    var props = {
      chosenTopics: []
    };
  }); // 
});