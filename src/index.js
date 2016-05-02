import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import * as reducers from './reducers';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const initialState = fromJS({
  mainForm: {
    includeClasses: false,
    classTotal: {
      grade: 0,
      credits: 0,
    },
    canSubmit: true,
  },
  classes: [],
  classForm: {
    selectedClass: 0,
    canSubmit: true,
    dialogOpen: false,
  },
});

const store = createStore(
  combineReducers(reducers),
  initialState,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
    <Provider store={store}>
      <Router history={appHistory} onUpdate={() => window.scrollTo(0, 0)}>
          {routes}
      </Router>
    </Provider>,
    document.getElementById('app')
);
