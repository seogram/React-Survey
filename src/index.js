import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App';
import './index.css';



render(
  <Provider store={createStore( applyMiddleware(thunk))}>
    <App />
  </Provider>, 
  document.getElementById('root')
);