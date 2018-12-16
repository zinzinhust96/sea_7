import React from 'react'
import {
  CardBody, Table,
} from 'reactstrap';

import { dateFormatForTransactions, vndFormat } from '../../helpers/textFormatter';

class Transactions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { lastItem: '' };
  }

  componentDidMount() {

  }

  convertObjToArr(obj) {
    return Object.keys(obj).map(key => [obj[key]]);
  }

  render() {

    const { listOfTransactions } = this.props;
    console.log('listOfTransactions', listOfTransactions)
    if (listOfTransactions) {
      const ListArrItem = this.convertObjToArr(listOfTransactions);
      if (ListArrItem[ListArrItem.length - 1] !== undefined) {
        this.state = { lastItem: ListArrItem[ListArrItem.length - 1][0].post_bal };
      }
      return (
                <CardBody>
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
                      {listOfTransactions.reverse().map((account, index) => <UserRow key={index} account={account} />)}
                    </tbody>
                  </Table>
                </CardBody>
      )
    }

  }
}

function UserRow(props) {
  const account = props.account;

  return (
    <tr>
      <td>{account.type}</td>
      <td>{account.category}</td>
      <td>{vndFormat(account.amount)}</td>
      <td>{dateFormatForTransactions(account.created_at)}</td>
      <td>{account.note || 'N/A'}</td>
      <td>{vndFormat(account.post_bal)}</td>
    </tr>

  )
}
export default Transactions
