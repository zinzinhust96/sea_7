import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';

function UserRow(props) {
  const account = props.user;
  if (account) {
    return (
      <tr>
        <th>{account.created}</th>
        <td>{account.name}</td>
        <td>{account.ini_bal}</td>
        <td>{account.type}</td>
        <td>{account.limit}</td>
      </tr>
    )
  }
  return (
    <tr>
      <th>0</th>
      <td>0</td>
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
    const { listData } = this.props;

    return (
      <div className="animated fadeIn">
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
                      <th scope="col">created</th>
                      <th scope="col">name</th>
                      <th scope="col">ini_bal</th>
                      <th scope="col">type</th>
                      <th scope="col">limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listData.map((account, index) => <UserRow key={index} user={account} />)}
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

export default ListAccount;
