import React from 'react';
import {
  configure,
  mount,
  shallow
} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
// import components

import Topics from '../client/components/Topics';
import Cards from '../client/components/Cards';
import CreateCard from '../client/components/CreateCard';
import Login from '../client/components/Login';

configure({
  adapter: new Adapter()
});

describe('React unit tests', () => {
  describe('Create Card', () => {
    let wrapper, createUserCard, sendNewCard;
    const props = {
      userID: '1'
    };
    
    beforeAll(() => {
      createUserCard = jest.fn();
      sendNewCard = jest.fn();
      wrapper = shallow(<CreateCard {...props} createUserCard={createUserCard(props.userID)} />);
    });



    it('the "submit a new card" button should invoke sendNewCard function', () => {
      // select first topic for Unit 1
      const firstTopic = wrapper.find('#topic-1');
      firstTopic.simulate('click');
      // write question
      const question = wrapper.find('input[name=Question]');
      question.simulate('change', { target: { value: 'what is a good test?'}});
      // write answer
      const answer = wrapper.find('input[name=Answer]');
      answer.simulate('change', { target: { value: 'Not this, my guy...'}});
      // submit new card
      const submitNewCardButton = wrapper.find('#submit-new-card-button');
      // console.log(submitNewCardButton);
      submitNewCardButton.simulate('click');
      expect(sendNewCard).toHaveBeenCalled();
    });
  })
  // 
})
