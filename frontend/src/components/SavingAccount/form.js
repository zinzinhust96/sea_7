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

const getDefaultState = () => ({
  name: '',
  acc_id: '',
  ini_bal: '',
  duration: '',
  rate: '',
})

class CreateSavingAccountForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = getDefaultState()
  }

  componentDidMount() {
    this.setState(getDefaultState())
  }

  handleAccountChange = (e) => {
    for (let i = 0; i < this.props.listOfAccounts.length; i++) {
      if ((this.props.listOfAccounts[i].id) === parseFloat(e.target.value)) {
        this.setState({
          acc_id: parseFloat(e.target.value),
          name: this.props.listOfAccounts[i].name,
        })
      }
    }
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
    this.setState(getDefaultState())
  }

  render() {
    const {
      acc_id: accountID, ini_bal, duration, rate,
    } = this.state
    const {
      submitting, error, success, listOfAccounts,
    } = this.props
    return (
      <Form onSubmit={this.handleSubmitForm}>

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
          <label htmlFor="ini_bal" className="col-sm-2 col-form-label text-right">Initiate balance</label>
          <input id="ini_bal" className="col-sm-10 form-control" name="ini_bal" type="number" value={ini_bal} onChange={this.handleNumberFieldChange} placeholder="Enter your amount" required />
        </div>
        <div className="form-group row">
          <label htmlFor="duration" className="col-sm-2 col-form-label text-right">Duration</label>
          <input id="duration" className="col-sm-10 form-control" name="duration" type="number" value={duration} onChange={this.handleNumberFieldChange} required />
        </div>
        <div className="form-group row">
          <label htmlFor="rate" className="col-sm-2 col-form-label text-right">Rate</label>
          <input id="rate" className="col-sm-10 form-control" name="rate" type="number" value={rate} onChange={this.handleNumberFieldChange} required />
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
            <button type="button" className="btn btn-secondary" disabled={submitting} onClick={() => this.resetForm()}>Reset</button>
          </div>
        </div>
      </Form>
    )
  }
}

export default CreateSavingAccountForm
