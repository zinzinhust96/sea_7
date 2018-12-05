/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
  .form-control {
    color: #000;
  }
`

const TRANSACTION_TYPES = {
  SPEND: 'spend',
  INCOME: 'income',
}

const getCurrentDateTime = () => `${new Date().getFullYear()}-${`${new Date().getMonth()
    + 1}`.padStart(2, 0)}-${`${new Date().getDay() + 1}`.padStart(
  2,
  0,
)}T${`${new Date().getHours()}`.padStart(
  2,
  0,
)}:${`${new Date().getMinutes()}`.padStart(2, 0)}`

class CreateAccountForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      type: TRANSACTION_TYPES.SPEND,
      account: '',
      category: '',
      dateTime: getCurrentDateTime(),
      note: '',
    }
  }

  handleFieldChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const {
      amount, type, account, dateTime, note,
    } = this.state
    console.log(this.state)
    const {
      submitting, error, success, listOfAccounts,
    } = this.props
    return (
      <Form onSubmit={this.handleSubmitForm}>
        <div className="form-group row">
          <label htmlFor="amount" className="col-sm-2 col-form-label text-right">Amount</label>
          <input id="amount" className="col-sm-10 form-control" name="amount" type="number" value={amount} onChange={this.handleFieldChange} required />
        </div>
        <div className="form-group row">
          <label htmlFor="type" className="col-sm-2 col-form-label text-right">Type</label>
          <select id="type" className="col-sm-10 form-control" name="type" value={type} onChange={this.handleFieldChange} required>
            <option value={TRANSACTION_TYPES.SPEND}>Spend</option>
            <option value={TRANSACTION_TYPES.INCOME}>Income</option>
          </select>
        </div>
        <div className="form-group row">
          <label htmlFor="account" className="col-sm-2 col-form-label text-right">Account</label>
          <select id="account" className="col-sm-10 form-control" name="account" value={account} onChange={this.handleFieldChange} placeholder="Choose an account" required>
            <option value="" disabled selected hidden>Choose an account</option>
            {listOfAccounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group row">
          <label htmlFor="dateTime" className="col-sm-2 col-form-label text-right">Date Time</label>
          <input id="dateTime" className="col-sm-10 form-control" name="dateTime" type="datetime-local" value={dateTime} onChange={this.handleFieldChange} required />
        </div>
        <div className="form-group row">
          <label htmlFor="note" className="col-sm-2 col-form-label text-right">Note</label>
          <input id="note" className="col-sm-10 form-control" name="note" value={note} onChange={this.handleFieldChange} required />
        </div>)
        <div className="row mt-1">
          <div className="offset-sm-2 col-sm-10 px-0">
            { error && <div className="text-danger">{error}</div> }
            { success && <div className="text-success">{success}</div> }
          </div>
        </div>
        <div className="row mt-2">
          <div className="offset-sm-2 col-sm-10 px-0">
            <input className="btn btn-primary" type="submit" value={submitting ? 'Creating...' : 'Create'} disabled={submitting} style={{ margin: 0 }} />
          </div>
        </div>
      </Form>
    )
  }
}

export default CreateAccountForm
