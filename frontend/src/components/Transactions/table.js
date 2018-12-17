import React from 'react'
import { Table } from 'reactstrap';

import { dateFormatForTransactions, vndFormat } from '../../helpers/textFormatter';

class Transactions extends React.PureComponent {
  render() {
    const { listOfTransactions } = this.props;
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th scope="col">type</th>
            <th scope="col">category</th>
            <th scope="col">amount</th>
            <th scope="col">created_at</th>
            <th scope="col">note</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {listOfTransactions.map((account, index) => <UserRow key={index} account={account} />)}
        </tbody>
      </Table>
    )
  }
}

const UserRow = ({ account }) => (
  <tr>
    <td>{account.type}</td>
    <td>{account.category}</td>
    <td>{vndFormat(account.amount)}</td>
    <td>{dateFormatForTransactions(account.created_at)}</td>
    <td>{account.note || 'N/A'}</td>
    <td>{vndFormat(account.post_bal)}</td>
  </tr>
)

export default Transactions
