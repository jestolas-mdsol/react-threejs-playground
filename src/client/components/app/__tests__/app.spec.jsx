import React from 'react';
import { mount } from 'enzyme';
import App from '../index';



describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App/>);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });
});
