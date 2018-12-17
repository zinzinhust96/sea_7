import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, Col, Row, Table,
} from 'reactstrap';
import styled from 'styled-components';
import TransactionsTable from './table'
import { vndFormat } from '../../helpers/textFormatter';

const AccountRow = styled.tr`
  cursor: pointer;
  background-color: ${props => props.selected ? '#00000013' : ''};
`

class TransactionsList extends Component {
  async componentDidMount() {
    await this.props.getAllAccounts();
    const { listOfAccounts, accountID } = this.props;
    if (accountID === -1 && listOfAccounts.length > 0) {
      this.props.updateAccountIDToGetTransactions(listOfAccounts[0].id)
      this.props.getAllTransactions(listOfAccounts[0].id)
    } else if (accountID !== -1) {
      this.props.getAllTransactions(accountID)
    }
  }

  handleAccountChange = (accountID) => {
    this.props.updateAccountIDToGetTransactions(accountID)
    this.props.getAllTransactions(accountID)
  }

  render() {
    const { listOfAccounts } = this.props;
    const { listOfTransactions, accountID } = this.props;
    return (
      <div className="animated fadeIn container-fluid">
        <Row>
          <Col xs="3">
            <Card>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr><th>List of Accounts</th></tr>
                  </thead>
                  <tbody>
                    {listOfAccounts.map(item => (
                      <AccountRow
                        key={item.id}
                        selected={accountID === item.id}
                        onClick={() => this.handleAccountChange(item.id)}
                      >
                        <td>{item.name}</td>
                      </AccountRow>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs="9">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                    Transaction history<small className="text-muted">
                    , (current balance: {vndFormat((listOfTransactions[0] && listOfTransactions[0].post_bal) || 'N/A')})</small>
              </CardHeader>
              <CardBody>
                <TransactionsTable listOfTransactions={listOfTransactions} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TransactionsList;
