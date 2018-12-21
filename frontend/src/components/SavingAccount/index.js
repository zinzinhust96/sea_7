import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';
import Spinner from '../Spinner';
import { dateFormat, vndFormat } from '../../helpers/textFormatter';

const AccountRow = ({ account }) => (
  <tr>
    <th>{account.name}</th>
    <th>{dateFormat(account.created)}</th>
    <td>{vndFormat(account.ini_bal || 'N/A')}</td>
    <td>{account.duration ? `${account.duration} ${account.duration === 1 ? 'month' : 'months'}` : 'N/A'}</td>
    <td>{account.rate ? `${account.rate}%` : 'N/A'}</td>
    <td>{vndFormat((account.ini_bal && account.cur_bal) ? account.cur_bal - account.ini_bal : 'N/A')}</td>
    <td>{vndFormat(account.cur_bal || 'N/A')}</td>
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
                      <th scope="col">Saving Account Name</th>
                      <th scope="col">Created</th>
                      <th scope="col">Initial Balance</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Monthly interest</th>
                      <th scope="col">Interest Amount</th>
                      <th scope="col">Final Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountLoading
                      ? <Spinner />
                      : listOfSavingAccounts.map((account, index) => <AccountRow key={index} account={account} />)}
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
