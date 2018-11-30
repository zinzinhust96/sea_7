import React from 'react';
import {
  Router, Route, Switch, HashRouter,
} from 'react-router-dom';

import { history } from '../helpers/history';
import { alertActions } from '../redux/actions/alertAction';
import { PrivateRoute } from './PrivateRoute';
import HomePage from '../containers/Homepage';
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
      console.log('OK! logined', localStorage.getItem('user'))
      return (
        <HashRouter>
          <Switch>
            <Route path="/" component={DefaultLayout} />
            <PrivateRoute path="/homepage" component={HomePage} />
          </Switch>
        </HashRouter>


      )
    }
    console.log('have not login yet');
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
