import React from 'react';
import { Link } from 'react-router-dom';

const divStyle = {
  marginTop: 0,
  marginRight: 'auto',
  marginBottom: 0,
  marginLeft: 'auto',
};

class HomePage extends React.Component {
  render() {
    const { user, users } = this.props;
    return (
      <div>
        <div style={divStyle} className="col-md-6 col-md-offset-3">
          <h1>Hi {user.email}!</h1>
        </div>
      </div>
    );
  }
}

export default HomePage
