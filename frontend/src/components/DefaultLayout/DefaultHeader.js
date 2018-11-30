import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink,
} from 'reactstrap';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
import ava from '../../assets/img/ava.jpg';

const defaultProps = {
  user: 'admin',
};

class DefaultHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{
            src: logo, width: 89, height: 25, alt: 'CoreUI Logo',
          }}
          minimized={{
            src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo',
          }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell" /><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={ava} className="img-avatar" alt="admin" />
              {this.props.user}
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

DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
