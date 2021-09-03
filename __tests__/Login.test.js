import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import Login from '../client/components/Login'; 
import Cards from '../client/components/Cards';

configure({ adapter: new Adapter() });

describe('Login', () => {
  let wrapper;
  const loggingIn;
  const login;
  const signUp;
  const props = {
      username: '',
  };

  beforeAll(() => {
      loggingIn = jest.fn();
      login = jest.fn();
      signUp = jest.fn();
      wrapper = shallow(<Login {...props} login={login} signUp={signUp}/>);
  });

  it('the loggingIn function should be called when click on Login button', () => {
    wrapper.find('#loginStuff').simulate('click', {preventDefault: () => {
    }});
    expect(props.login).toHaveBeenCalled();
  });

  // it('the login function should be called when Sign up button', () => {
  //   wrapper.find('#signUpStuff').simulate('click');
  //   expect(setSignUp).toHaveBeenCalled();
  // });
});

