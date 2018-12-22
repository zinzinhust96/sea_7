import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink,
} from 'reactstrap';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png';
import sygnet from '../../assets/img/brand/sygnet.png';
import ava from '../../assets/img/ava.jpg';

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('user')) {
      this.state = { user: JSON.parse(localStorage.getItem('user')).email };
    } else {
      this.state = { user: 'admin' };
    }
  }

  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <Link to="/">
          <AppNavbarBrand
            full={{
              src: logo, width: 110, height: 25, alt: 'MyFinance Logo',
            }}
            minimized={{
              src: sygnet, width: 30, height: 30, alt: 'MyFinance Logo',
            }}
          />
        </Link>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell" /><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={ava} className="img-avatar" alt="admin" />
              {this.state.user}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user" /> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench" /> Settings</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock" /> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>

          <NavItem className="d-md-down-none" />
        </Nav>

      </React.Fragment>
    );
  }
}

export default DefaultHeader;
