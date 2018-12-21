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

const defaultState = {
  name: '',
  ini_bal: '',
  duration: '',
  rate: '',
  acc_id: '',
}

class CreateSavingAccountForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState
  }

  componentDidMount() {
    this.setState(defaultState)
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

  resetForm = () => {
    this.props.onReset()
    this.setState(defaultState)
  }

  render() {
    const {
      name, acc_id: accountID, ini_bal: initBal, duration, rate,
    } = this.state
    const {
      submitting, error, success, listOfAccounts,
    } = this.props
    return (
      <Form onSubmit={this.handleSubmitForm}>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-3 col-form-label text-right">Saving account name</label>
          <input id="name" className="col-sm-9 form-control" name="name" value={name} onChange={this.handleTextFieldChange} placeholder="Enter your saving account name" required />
        </div>
        <div className="form-group row">
          <label htmlFor="ini_bal" className="col-sm-3 col-form-label text-right">Initial balance</label>
          <input id="ini_bal" className="col-sm-9 form-control" name="ini_bal" type="number" value={initBal} onChange={this.handleNumberFieldChange} placeholder="Enter your amount" required />
        </div>
        <div className="form-group row">
          <label htmlFor="duration" className="col-sm-3 col-form-label text-right">Duration</label>
          <select id="duration" className="col-sm-9 form-control" name="duration" value={duration} onChange={this.handleNumberFieldChange} required>
            <option value={1}>1 month</option>
            <option value={2}>2 months</option>
            <option value={3}>3 months</option>
          </select>
        </div>
        <div className="form-group row">
          <label htmlFor="rate" className="col-sm-3 col-form-label text-right">Monthly interest</label>
          <input id="rate" className="col-sm-9 form-control" name="rate" type="number" value={rate} onChange={this.handleNumberFieldChange} required />
        </div>
        <div className="form-group row">
          <label htmlFor="acc_id" className="col-sm-3 col-form-label text-right">From account</label>
          <select id="acc_id" className="col-sm-9 form-control" name="acc_id" value={accountID} onChange={this.handleNumberFieldChange} required>
            <option value="" disabled hidden>Account where the money come from</option>
            {listOfAccounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div className="row mt-1">
          <div className="offset-sm-3 col-sm-9 px-0">
            { error && <div className="text-danger">{error}</div> }
            { success && <div className="text-success">{success}</div> }
          </div>
        </div>
        <div className="row mt-2">
          <div className="offset-sm-3 col-sm-9 px-0">
            <input className="btn btn-primary" type="submit" value={submitting ? 'Creating...' : 'Create'} disabled={submitting} style={{ margin: 0 }} />
            <button type="button" className="btn btn-secondary" disabled={submitting} onClick={() => this.resetForm()}>Reset</button>
          </div>
        </div>
      </Form>
    )
  }
}

export default CreateSavingAccountForm
