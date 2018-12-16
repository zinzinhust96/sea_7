import React, { Component } from 'react';
import {
  Card, CardHeader, Col, Row,
} from 'reactstrap';
import styled from 'styled-components';
import Transactions from '../Transactions/index'
import { vndFormat } from '../../helpers/textFormatter';

const Form = styled.form`
  .form-control {
    color: #000;
  }
  .form-control:disabled {
    background-color: #e9ecef;
    color: #5c6873;
    cursor: not-allowed;
  }
`;

class ListAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acc_id: '',
    };
  }


  componentDidMount() {
    this.props.getAllAccounts();
  }

    handleAccountChange = (e) => {
      this.setState({
        acc_id: parseFloat(e.target.value),
      });

      this.props.getAllTransactions(e.target.value)

    }

    convertObjToArr(obj) {
      return Object.keys(obj).map(key => [obj[key]]);
    }

    render() {
      const { listOfAccounts } = this.props;
      const {
        acc_id: accountID,
      } = this.state;
      const { listOfTransactions } = this.props;
      if (listOfTransactions) {
        const ListArrItem = this.convertObjToArr(listOfTransactions);
        if (ListArrItem[ListArrItem.length - 1] !== undefined) {
          this.state = { lastItem: ListArrItem[ListArrItem.length - 1][0].post_bal };
        }
      }
      return (
        <div className="animated fadeIn container-fluid">
          <Row>

            <Col xs="3">
              <Form>
                <select id="acc_id" className="col-sm-10 form-control" name="acc_id" value={accountID} onChange={this.handleAccountChange}>
                  <option value="" disabled>Choose an account</option>
                  {listOfAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                  ))}
                </select>

              </Form>
            </Col>


            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                   Transaction history<small className="text-muted">
                    , (current balance: {vndFormat(this.state.lastItem || 'N/A')})</small>
              </CardHeader>

              <Transactions listOfTransactions={listOfTransactions} />
            </Card>
          </Row>

        </div>
      )
    }
}

export default ListAccount;
