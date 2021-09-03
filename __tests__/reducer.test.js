import React from 'react';
import flashCodesReducer from '../client/reducers/flashCodesReducer';
// import Pass from '../client/component/Pass';
// import Fail from '../client/component/Fail';

describe('Flash Code Reducers', () => {
  let initialState;

  beforeEach(() => {
    const initialState = {
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

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(initialState);
    });
  });

  describe('ANSWERED_CORRECTLY', () => {
    const action = {
      type: 'ANSWERED_CORRECTLY',
      payload: flashCardID,
    }

    it('should increment answeredRight by 1', () => {
      const { answeredRight } = flashCodesReducer(initialState, action);
      expect(answeredRight).toEqual(1);
    });
  
     xit('should increment totalCardsAnswered by 1', () => {
         const { totalCardsAnswered } = flashCodesReducer(initialState, action);
         expect(totalCardsAnswered).toEqual(1)
     })

  xdescribe('ANSWERED_INCORRECTLY', () => {
    const action = {
      type: 'ANSWERED_INCORRECTLY',
      payload: flashCardId,
    }

    xit('should increment answeredWrong by 1' , () => {
      const { answeredWrong } = flashCodesReducer(initialState, action);
      expect(answeredWrong).toEqual(1);
    })
  })
  });
})