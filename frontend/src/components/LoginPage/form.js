/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from 'react'

import { userActions } from '../../redux/actions/userAction';
import { AUTH_TYPE } from '../../constants/user'

class AuthForm extends React.PureComponent {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: '',
      password: '',
      submitted: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  handleRegisterSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.register(email, password));
    }
  }

  render() {
    const { email, password, submitted } = this.state;
    const { loggingIn, authType } = this.props
    const isLogin = authType === AUTH_TYPE.LOGIN
    const text = isLogin ? 'Login' : 'Register'
    return (<React.Fragment>
      <h2>{text}</h2>
      <form name="form" onSubmit={isLogin ? this.handleLoginSubmit : this.handleRegisterSubmit}>
        <div className={`form-group${submitted && !email ? ' has-error' : ''}`}>
          <label htmlFor="email" className="control-label">Email</label>
          <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
          {submitted && !email
            && <div className="help-block">Email is required</div>
          }
        </div>
        <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
          <label htmlFor="password" className="control-label">Password</label>
          <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
          {submitted && !password
            && <div className="help-block">Password is required</div>
          }
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">{text}</button>
          {loggingIn
            && <img alt="spinner" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
        </div>
      </form>
    </React.Fragment>)
  }
}

export default AuthForm
