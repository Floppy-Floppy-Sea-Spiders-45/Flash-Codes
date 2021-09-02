import React from 'react';
import {
  configure,
  shallow
} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
// import components

import FlashcardsContainer from '../client/containers/FlashcardsContainer';
import Topics from '../client/components/Topics';
import Cards from '../client/components/Cards';
import CreateCard from '../client/components/CreateCard';
import Login from '../client/components/Login';

configure({
  adapter: new Adapter()
});

describe('React unit tests', () => {
  // topics
  describe('Topics', () => {
    let wrapper;
    const props = {
      chosenTopics: [],

    }
  });

  // 
})
