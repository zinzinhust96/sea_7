import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DISPLAY_TYPES } from '../../constants/account'

const LinkItem = styled(Link).attrs({
  className: 'nav-link',
})`
  cursor: pointer;
  color: #333;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`

const WrapperDiv = styled.div.attrs({
  className: 'd-flex justify-content-end h-100',
})`
  &:after {
    content : "";
    position: absolute;
    right    : 0;
    z-index: 100;
    top  : 15%;
    width  : 1px;
    height   : 40%;
    background: #333;
  }
`

const Menu = ({ displayType }) => (<WrapperDiv>
  <ul>
    <li>
      <LinkItem
        to="/accounts/create"
        active={displayType === DISPLAY_TYPES.CREATE_ACCOUNT}
            >
                Create New Account
      </LinkItem>
    </li>
  </ul>
</WrapperDiv>)

export default Menu
