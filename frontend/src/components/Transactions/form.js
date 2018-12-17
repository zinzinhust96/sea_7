/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import styled from 'styled-components'
import { renderSpace } from '../../helpers/renderer'

const Form = styled.form`
  .form-control {
    color: #000;
  }
  .form-control:disabled {
    background-color: #e9ecef;
    color: #5c6873;
    cursor: not-allowed;
  }
`

const TRANSACTION_TYPES = {
  EXPENSE: 'expense',
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

const RenderMultilevelSelect = ({ list, index }) => list.map((item) => {
  if (item.subcategories.length === 0) {
    return (
      <option key={item.id} value={item.id} className={index === 0 ? 'option-group' : 'option-child'}>
        {renderSpace(index * 3)}
        {item.name}
      </option>
    )
  }
  return (<React.Fragment key={item.id}>
    <option value={item.id} className="option-group">
      {renderSpace(index * 3)}
      {item.name}
    </option>
    <RenderMultilevelSelect list={item.subcategories} index={index + 1} />
  </React.Fragment>)
})

class CreateAccountForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      acc_id: '',
      trans_type: TRANSACTION_TYPES.EXPENSE,
      amount: '',
      cat_id: '',
      created_at: getCurrentDateTime(),
      note: '',
    }
  }

  handleAccountChange = (e) => {
    this.setState({
      acc_id: parseFloat(e.target.value),
    })
    this.props.getCategoriesByAccount(e.target.value, this.state.trans_type)
  }

  handleTransTypeChange = (e) => {
    this.setState({
      trans_type: e.target.value,
    })
    if (this.state.acc_id) {
      this.props.getCategoriesByAccount(this.state.acc_id, e.target.value)
    }
  }

  handleTextFieldChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleNumberFieldChange = (e) => {
    this.setState({
      [e.target.id]: parseFloat(e.target.value),
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const {
      amount, trans_type: transType, acc_id: accountID, cat_id: categoryID, created_at: createAt, note,
    } = this.state
    const {
      submitting, error, success, listOfAccounts, listOfCategories, categoriesLoading,
    } = this.props
    return (
      <Form onSubmit={this.handleSubmitForm}>
        <div className="form-group row">
          <label htmlFor="amount" className="col-sm-2 col-form-label text-right">Amount</label>
          <input id="amount" className="col-sm-10 form-control" name="amount" type="number" value={amount} onChange={this.handleNumberFieldChange} placeholder="Enter your amount" required />
        </div>
        <div className="form-group row">
          <label htmlFor="trans_type" className="col-sm-2 col-form-label text-right">Type</label>
          <select id="trans_type" className="col-sm-10 form-control" name="trans_type" value={transType} onChange={this.handleTransTypeChange} required>
            <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
            <option value={TRANSACTION_TYPES.INCOME}>Income</option>
          </select>
        </div>
        <div className="form-group row">
          <label htmlFor="acc_id" className="col-sm-2 col-form-label text-right">Account</label>
          <select id="acc_id" className="col-sm-10 form-control" name="acc_id" value={accountID} onChange={this.handleAccountChange} required>
            <option value="" disabled hidden>Choose an account</option>
            {listOfAccounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group row">
          <label htmlFor="cat_id" className="col-sm-2 col-form-label text-right">Category</label>
          <select id="cat_id" disabled={categoriesLoading || listOfCategories.length === 0} className="col-sm-10 form-control" name="cat_id" value={categoryID} onChange={this.handleNumberFieldChange} required>
            <option value="" disabled hidden>Choose an category</option>
            <RenderMultilevelSelect list={listOfCategories} index={0} />
          </select>
        </div>
        <div className="form-group row">
          <label htmlFor="created_at" className="col-sm-2 col-form-label text-right">Date Time</label>
          <input id="created_at" className="col-sm-10 form-control" name="created_at" type="datetime-local" value={createAt} onChange={this.handleTextFieldChange} step="1" required />
        </div>
        <div className="form-group row">
          <label htmlFor="note" className="col-sm-2 col-form-label text-right">Note</label>
          <input id="note" className="col-sm-10 form-control" name="note" value={note} onChange={this.handleTextFieldChange} required />
        </div>
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
