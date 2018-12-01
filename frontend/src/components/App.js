import React from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';

import { history } from '../helpers/history';
import { alertActions } from '../redux/actions/alertAction';
import LoginPage from '../containers/LoginPage';
import { AUTH_TYPE } from '../constants/user'
import DefaultLayout from './DefaultLayout'
import HomePage from '../containers/Homepage';
import { PrivateRoute } from './PrivateRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    if (localStorage.getItem('user')) {
      return (
        <Router history={history}>
          <Switch>
            <Route path="/" component={DefaultLayout} />
          </Switch>
        </Router>
      )
    }
    return (
      <Router history={history}>
        <Switch>
          {/* when app init, Page will redirect to login page */}
          <PrivateRoute exact path="/" component={HomePage} />
          <Route
            path="/login"
            render={() => (<LoginPage authType={AUTH_TYPE.LOGIN} />)}
          />
          <Route
            path="/register"
            render={() => (<LoginPage authType={AUTH_TYPE.REGISTER} />)}
          />
        </Switch>
      </Router>
    );
  }
}

export default App
