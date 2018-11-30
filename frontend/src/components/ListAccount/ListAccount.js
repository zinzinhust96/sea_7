import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';
import { fetchJSON } from '../../helpers/network';
import { CREATE_ACCOUNT_URL } from '../../constants/endpoint';
import { authHeader } from '../../helpers/auth-header';

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
  constructor(props) {
    super(props);
    this.state = { listData: [] };
  }

  componentDidMount() {
    this.getListData();
  }


    getListData = async () => {
      try {
        const response = await fetchJSON(CREATE_ACCOUNT_URL, {
          headers: {
            'Content-Type': 'application/json',
            ...authHeader(),
          },
          method: 'GET',
        });
        if (response.status) {
          console.log('Get list-account successfully!', response);
          this.setState({ listData: response.accounts });
        } else {
          console.log('There is an error when get your data');
        }
      } catch (e) {
        console.log('There is an error when get your data', e);
      }
    };

    render() {
      const { listData } = this.state;

      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={6}>
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
                      {listData.map((account, index) =>
                        <UserRow key={index} user={account} />,
                      )}
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
