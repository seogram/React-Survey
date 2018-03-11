import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  const app = shallow(<App />);

  it('renders properly', () => {
    expect(app).toMatchSnapshot();
  });

  it('it has Survey component', () => {
    expect(app.find('Survey').exists()).toBe(true);
  });

});

