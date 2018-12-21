/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import styled from 'styled-components'

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

const ACCOUNT_TYPES = {
  CREDIT: 'credit',
  CASH: 'cash',
}

class CreateAccountForm extends React.PureComponent {
    state = {
      name: '',
      ini_bal: '',
      type: ACCOUNT_TYPES.CASH,
      limit: '',
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
        name, ini_bal: initBalance, type, limit,
      } = this.state
      const { submitting, error, success } = this.props
      return (
        <Form onSubmit={this.handleSubmitForm}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label text-right">Name</label>
            <input id="name" className="col-sm-9 form-control" name="name" type="text" value={name} onChange={this.handleFieldChange} placeholder="Enter your account name" required />
          </div>
          <div className="form-group row">
            <label htmlFor="type" className="col-sm-3 col-form-label text-right">Type</label>
            <select id="type" className="col-sm-9 form-control" name="type" value={type} onChange={this.handleFieldChange} required>
              <option value={ACCOUNT_TYPES.CASH}>Cash</option>
              <option value={ACCOUNT_TYPES.CREDIT}>Credit</option>
            </select>
          </div>
          <div className="form-group row">
            <label htmlFor="ini_bal" className="col-sm-3 col-form-label text-right">Initial balance</label>
            <input id="ini_bal" className="col-sm-9 form-control" name="ini_bal" type="number" value={initBalance} onChange={this.handleFieldChange} placeholder="Enter your amount" required />
          </div>
          {type === ACCOUNT_TYPES.CREDIT && (<div className="form-group row">
            <label htmlFor="limit" className="col-sm-3 col-form-label text-right">Credit Limit</label>
            <input id="limit" className="col-sm-9 form-control" name="limit" type="number" value={limit} onChange={this.handleFieldChange} required />
            </div>)}
          <div className="row mt-1">
            <div className="offset-sm-3 col-sm-9 px-0">
              { error && <div className="text-danger">{error}</div> }
              { success && <div className="text-success">{success}</div> }
            </div>
          </div>
          <div className="row mt-2">
            <div className="offset-sm-3 col-sm-9 px-0">
              <input className="btn btn-primary" type="submit" value={submitting ? 'Creating...' : 'Create'} disabled={submitting} style={{ margin: 0 }} />
            </div>
          </div>
        </Form>
      )
    }
}

export default CreateAccountForm
