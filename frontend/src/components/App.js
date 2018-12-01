import React from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';

import { history } from '../helpers/history';
import { alertActions } from '../redux/actions/alertAction';
import LoginPage from '../containers/LoginPage';
import { AUTH_TYPE } from '../constants/user'
import DefaultLayout from './DefaultLayout'

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
        <div>
          <Route
            path="/"
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
