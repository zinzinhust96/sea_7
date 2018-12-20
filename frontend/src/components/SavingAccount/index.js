import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';
import Spinner from '../Spinner';
import { dateFormat, vndFormat } from '../../helpers/textFormatter';

const AccountRow = ({ account, handleAccountSelect }) => (
  <tr style={{ cursor: 'pointer' }} onClick={() => handleAccountSelect(account.id)}>
    <td>{account.name}</td>
    <th>{dateFormat(account.created)}</th>
    <th>{vndFormat(account.ini_bal || 'N/A')}</th>
    <td>{vndFormat(account.cur_bal || 'N/A')}</td>
    <td>{vndFormat(account.duration || 'N/A')}</td>
    <td>{vndFormat(account.rate || 'N/A')}</td>
  </tr>
)
class SavingAccount extends Component {
  componentDidMount() {
    this.props.getAllSavingAccounts();
  }

  render() {
    const { listOfSavingAccounts, accountLoading } = this.props;

    return (
      <div className="animated fadeIn container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> List Saving Account
              </CardHeader>
              <CardBody>
                {accountLoading ? <Spinner /> : (<Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Account Name</th>
                      <th scope="col">Created</th>
                      <th scope="col">Initiate Balance</th>
                      <th scope="col">Current Balance</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountLoading
                      ? <Spinner />
                      : listOfSavingAccounts.map((account, index) => <AccountRow key={index} account={account} handleAccountSelect={this.onAccountSelect} />)}
                  </tbody>
                </Table>)}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SavingAccount;
