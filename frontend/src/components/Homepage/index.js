import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/NavbarPage';
import Sidenav from '../SideNav/SideNavPage';

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
        <Sidenav />
        <Navbar />
        <div style={divStyle} className="col-md-6 col-md-offset-3">
          <h1>Hi {user.email}!</h1>
          <p>You are logged in with React & JWT!!</p>
          <h3>Users from secure api end point:</h3>
          {users.loading && <em>Loading users...</em>}
          {users.error && <span className="text-danger">ERROR: {users.error}</span>}
          {users.items && (
            <ul>
              {users.items.map(item => (
                <li key={item.id}>
                  {`${item.firstName} ${item.lastName}`}
                </li>
              ))}
            </ul>
          )}
          <p>
            <Link to="/login">Logout</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default HomePage
