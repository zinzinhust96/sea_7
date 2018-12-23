import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';
import { history } from '../../helpers/history';

import { vndFormat, dateFormat } from '../../helpers/textFormatter'
import Spinner from '../Spinner'

const AccountRow = ({ account, handleAccountSelect }) => {
  if (account) {
    return (
      <tr style={{ cursor: 'pointer' }} onClick={() => handleAccountSelect(account.id)}>
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

const calculateTotalBalance = accounts => accounts.reduce((accumulator, currentItem) => accumulator + currentItem.cur_bal, 0)

class ListAccount extends Component {
  componentDidMount() {
    this.props.getAllAccounts();
  }

  onAccountSelect = (accountID) => {
    this.props.updateAccountIDToGetTransactions(accountID)
    history.push('/transactions/history')
  }

  render() {
    const { listOfAccounts, accountLoading } = this.props;
    let mainDisplay
    if (accountLoading) {
      mainDisplay = <Spinner />
    } else if (listOfAccounts.length === 0) {
      mainDisplay = <div className="py-3 text-center">No account yet. Please click <Link to="/accounts/create">here</Link> to create a new account</div>
    } else {
      mainDisplay = (<Table responsive hover>
        <thead>
          <tr>
            <th scope="col">Created</th>
            <th scope="col">Account Name</th>
            <th scope="col">Balance</th>
            <th scope="col">Credit Limit</th>
          </tr>
        </thead>
        <tbody>
          {listOfAccounts.map((account, index) => <AccountRow key={index} account={account} handleAccountSelect={this.onAccountSelect} />)}
        </tbody>
      </Table>)
    }

    return (
      <div className="animated fadeIn container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> List Account
                <small className="text-muted">
                    , (total balance: {listOfAccounts.length !== 0 ? vndFormat(calculateTotalBalance(listOfAccounts)) : 'N/A'})</small>
              </CardHeader>
              <CardBody>
                {mainDisplay}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ListAccount
