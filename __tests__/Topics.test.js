import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import Topics from '../client/components/Topics';

configure({ adapter: new Adapter() });

describe('Topics', () => {
  let wrapper, submit, submitPublic;
  const props = {
    chosenTopic: [],
    selectTopic: '',
    deselectTopic: '',
    userID: 123
  };
  beforeAll(() => {
    submit = jest.fn();
    submitPublic = jest.fn();
    wrapper = shallow(<Topics {...props} submit={submit} submitPublic={submitPublic} />)
  });

  it ('Topics should have 7 input elements', () => {
    expect(wrapper.find('input')).toHaveLength(7);

  });
  
  it ('', () => {
    const wrapper2 = shallow(<Topics {...props, chosenTopic: [0, 1, 2]} submit={submit} submitPublic={submitPublic} />)
    wrapper2.find('input').at(0).simulate('click');
    wrapper2.find('input').at(1).simulate('click');
    wrapper2.find('input').at(2).simulate('click');
    expect(wrapper2.props().chosenTopic.length).toEqual(3);
    
  });

  it ('', () => {
    const wrapper3 = shallow(<Topics {...props, chosenTopic: [1, 3]} submit={submit} submitPublic={submitPublic} />)
    wrapper3.find('input').at(0).simulate('click');
    wrapper3.find('input').at(1).simulate('click');
    wrapper3.find('input').at(2).simulate('click');
    wrapper3.find('input').at(3).simulate('click');
    wrapper3.find('input').at(2).simulate('click');
    wrapper3.find('input').at(0).simulate('click');
    expect(wrapper3.props().chosenTopic.length).toEqual(2);
  })
});

// it('A Market should display all of its text props inside a LabeledText Component', () => {
//     expect(wrapper1.type()).toEqual('div');
//     expect(wrapper1.find('.flex').find('button')).toHaveLength(2);
//     expect(wrapper1.find(LabeledText)).toHaveLength(4);
//     wrapper1.find('.addCard').simulate('click');
//     wrapper1.find('.deleteCard').simulate('click');
//     expect(props.addCard).toHaveBeenCalled();
//     expect(props.deleteCard).toHaveBeenCalled();
//   });