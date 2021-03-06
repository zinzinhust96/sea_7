import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AUTH_TYPE } from '../../constants/user'

const LinkItem = styled(Link).attrs({
  className: 'nav-link',
})`
  cursor: pointer;
  color: #333 !important;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
`

class AuthHeader extends React.PureComponent {
  render() {
    const { authType } = this.props
    return (
      <ul className="nav justify-content-end py-2">
        <li className="nav-item">
          <LinkItem
            to="/register"
            selected={authType === AUTH_TYPE.REGISTER}
          >
            Register
          </LinkItem>
        </li>
        <li className="nav-item">
          <LinkItem
            to="/login"
            selected={authType === AUTH_TYPE.LOGIN}
          >
            Login
          </LinkItem>
        </li>
      </ul>
    )
  }
}

export default AuthHeader
