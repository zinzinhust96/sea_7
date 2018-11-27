import React from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from '../helpers/history';
import { alertActions } from '../redux/actions/alertAction';
import { PrivateRoute } from './PrivateRoute';
import HomePage from '../containers/Homepage';
import LoginPage from '../containers/LoginPage';
import { AUTH_TYPE } from '../constants/user'

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
    return (
      <Router history={history}>
        <div>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route
            path="/login"
            render={() => (<LoginPage authType={AUTH_TYPE.LOGIN} />)}
          />
          <Route
            path="/register"
            render={() => (<LoginPage authType={AUTH_TYPE.REGISTER} />)}
          />
        </div>
      </Router>
    );
  }
}

export default App
