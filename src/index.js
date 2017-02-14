import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'; // browserHistory gives nice clean urls, html5 push state. Hash urls are available
import routes from './routes';
import './styles/styles.css'; // webpack can import css (what about scss?)
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

/**
 * Now we render the router so the user can see the content
 */

render(
    <Router history={browserHistory} routes={routes}/>,
    document.getElementById('app')
);