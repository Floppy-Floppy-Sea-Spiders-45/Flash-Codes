"use strict";

var _react = _interopRequireDefault(require("react"));

var _flashCodesReducer4 = _interopRequireDefault(require("../client/reducers/flashCodesReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Pass from '../client/component/Pass';
// import Fail from '../client/component/Fail';
describe('Flash Code Reducers', function () {
  var initialState;
  beforeEach(function () {
    var initialState = {
      username: null,
      userID: null,
      totalCardsAnswered: 0,
      answeredRight: 0,
      answeredWrong: 0,
      answeredCardList: [],
      flashCardList: [],
      createdUserCards: [],
      chosenTopics: [],
      answerShown: false,
      session: false,
      createCard: false
    };
  });
  describe('default state', function () {
    it('should return a default state when given an undefined input', function () {
      expect(subject(undefined, {
        type: undefined
      })).toEqual(initialState);
    });
  });
  describe('ANSWERED_CORRECTLY', function () {
    var action = {
      type: 'ANSWERED_CORRECTLY',
      payload: flashCardID
    };
    it('should increment answeredRight by 1', function () {
      var _flashCodesReducer = (0, _flashCodesReducer4["default"])(initialState, action),
          answeredRight = _flashCodesReducer.answeredRight;

      expect(answeredRight).toEqual(1);
    });
    xit('should increment totalCardsAnswered by 1', function () {
      var _flashCodesReducer2 = (0, _flashCodesReducer4["default"])(initialState, action),
          totalCardsAnswered = _flashCodesReducer2.totalCardsAnswered;

      expect(totalCardsAnswered).toEqual(1);
    });
    xdescribe('ANSWERED_INCORRECTLY', function () {
      var action = {
        type: 'ANSWERED_INCORRECTLY',
        payload: flashCardId
      };
      xit('should increment answeredWrong by 1', function () {
        var _flashCodesReducer3 = (0, _flashCodesReducer4["default"])(initialState, action),
            answeredWrong = _flashCodesReducer3.answeredWrong;

        expect(answeredWrong).toEqual(1);
      });
    });
  });
});