import React from 'react'
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';

class Transactions extends React.PureComponent {
  componentDidMount() {
    this.props.getAllTransactions(this.props.match.params.id)
  }


  render() {
    const { listOfTransactions } = this.props;
    console.log('ssssvs', listOfTransactions);
    if (listOfTransactions) {
      return (
        <div className="animated fadeIn container-fluid">
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Transaction history<small className="text-muted">
                                   (account id: {this.props.match.params.id})</small>
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">amount</th>
                        <th scope="col">category</th>
                        <th scope="col">created_at</th>
                        <th scope="col">note</th>
                        <th scope="col">pre_bal</th>
                        <th scope="col">type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listOfTransactions.map((account, index) =>
                        <UserRow key={index} account={account} />,
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
}

function UserRow(props) {
  const account = props.account

  return (
    <tr>
      <td>{account.amount}</td>
      <td>{account.category}</td>
      <td>{account.created_at}</td>
      <td>{account.note}</td>
      <td>{account.pre_bal}</td>
      <td>{account.type}</td>
    </tr>
  )
}
export default Transactions
