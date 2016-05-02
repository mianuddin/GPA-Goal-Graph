import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(reducer,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

// Set initial (test) state.
store.dispatch({
  type: 'SET_STATE',
  state: {
    mainForm: {
      includeClasses: false,
      classTotal: {
        grade: null,
        credits: null,
      },
      canSubmit: true,
    },
    classes: [],
    snackbar: {
      open: false,
      message: '',
    },
    classForm: {
      selectedClass: 0,
      canSubmit: true,
      dialogOpen: false,
    },
  },
});

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
    <Provider store={store}>
      <Router history={appHistory} onUpdate={() => window.scrollTo(0, 0)}>
          {routes}
      </Router>
    </Provider>,
    document.getElementById('app')
);
