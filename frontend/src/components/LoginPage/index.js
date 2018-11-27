import React from 'react';
import AuthHeader from './header'
import Intro from './intro'
import AuthForm from './form'

class LoginPage extends React.Component {
  render() {
    const { alert, authType } = this.props;
    return (<div className="container-fluid">
      <div className="container">
        <AuthHeader authType={authType} />
      </div>
      <div className="container">
        {alert.message
          && <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
      </div>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-md-6 offset-md-1">
            <Intro />
          </div>
          <div className="offset-md-1 col-md-4">
            <AuthForm {...this.props} authType={authType} />
          </div>
        </div>
      </div>
    </div>);
  }
}

export default LoginPage
