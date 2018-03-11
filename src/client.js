import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { render } from 'react-dom';
import App from './components/App';
import  Survey from './components/Survey';
import NotFound from './components/notFound';


const Routes = (props)=>{
  <Router   {...props}>
          <Route path="/" component={App}/>
          <Route exact path="/:step" component={Survey} />
          <Route path="/survey" component={Survey}/>
          <Route path="*" component={NotFound} />
  </Router>
}

export default Routes;
