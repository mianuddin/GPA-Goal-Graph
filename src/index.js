import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
    <Router history={appHistory} onUpdate={() => window.scrollTo(0, 0)}>
        {routes}
    </Router>,
    document.getElementById('app')
);
