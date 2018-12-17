import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';

import { vndFormat, dateFormat } from '../../helpers/textFormatter'

function UserRow(props) {
  const account = props.user;
  if (account) {
    return (
      <tr>
        <th>{dateFormat(account.created)}</th>
        <td>{account.name}</td>
        <td>{vndFormat(account.cur_bal)}</td>
        <td>{vndFormat(account.limit || 'N/A')}</td>
      </tr>
    )
  }
  return (
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  )
}

class ListAccount extends Component {
  componentDidMount() {
    this.props.getAllAccounts();
  }

  render() {
    const { listOfAccounts } = this.props;

    return (
      <div className="animated fadeIn container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> List Account
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Created</th>
                      <th scope="col">Account Name</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Credit Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listOfAccounts.map((account, index) => <UserRow key={index} user={account} />)}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ListAccount
