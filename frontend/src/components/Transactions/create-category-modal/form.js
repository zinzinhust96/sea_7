/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import styled from 'styled-components'
import { Label, Input } from 'reactstrap'
import { RenderMultilevelSelect } from '../../../helpers/renderer'
import { TRANSACTION_TYPES } from '../../../constants/transaction'
import { Form } from '../common'

const Icon = styled.i.attrs({
  className: 'd-flex',
})`
  font-size: 20px !important;
  flex-direction: row-reverse;
`

const ClearParentCategoryIcon = styled.i.attrs({
  className: 'fa fa-times',
  ariaHidden: true,
})`
  color: red;
  position: absolute;
  right: 7px;
  bottom: 90px;
  cursor: pointer;
`

const CategoryNameInput = styled.input`
  font-size: 18px !important;
  border: none !important;
  &:focus {
    box-shadow: none !important;
  }
`

class CreateCategoryModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      acc_id: props.accountID,
      name: '',
      type: props.categoryType,
      parent_id: '',
    }
  }

  handleAccountChange = (e) => {
    this.setState({
      acc_id: parseFloat(e.target.value),
    })
    this.props.getCategoriesByAccount(e.target.value, this.state.type)
  }

  handleCategoryTypeChange = (e) => {
    this.setState({
      type: e.target.value,
    })
    this.props.getCategoriesByAccount(this.state.acc_id, e.target.value)
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
    let body
    body = {
      acc_id: this.state.acc_id,
      name: this.state.name,
      type: this.state.type,
    }
    if (this.state.parent_id) {
      body = {
        ...body,
        parent_id: this.state.parent_id,
      }
    }
    this.props.onSubmit(body)
    this.props.getCategoriesByAccount(this.props.currentAccId, this.state.type)
  }

  clearParentSelect = () => {
    this.setState({
      parent_id: '',
    })
  }

  render() {
    const {
      submitting, error, success, listOfAccounts, listOfCategories, categoriesLoading,
    } = this.props
    const {
      name, acc_id: accountID, type, parent_id: parentID,
    } = this.state
    const categoryDisabled = categoriesLoading || listOfCategories.length === 0
    return (
      <Form onSubmit={this.handleSubmitForm} className="px-4">
        <div className="form-group row" style={{ borderBottom: '1px solid #dee2e6' }}>
          <CategoryNameInput id="name" className="col-sm-12 form-control" name="name" type="text" value={name} onChange={this.handleTextFieldChange} placeholder="Category name" required />
        </div>
        <div className="form-group row d-flex justify-content-around">
          <Label check>
            <Input
              type="radio"
              name="prediction-vote"
              value={TRANSACTION_TYPES.EXPENSE}
              onChange={this.handleCategoryTypeChange}
              defaultChecked={type === TRANSACTION_TYPES.EXPENSE}
            />
            Expense
          </Label>
          <Label check>
            <Input
              type="radio"
              name="prediction-vote"
              value={TRANSACTION_TYPES.INCOME}
              onChange={this.handleCategoryTypeChange}
              defaultChecked={type === TRANSACTION_TYPES.INCOME}
            />
            Income
          </Label>
        </div>
        <div className="form-group row">
          <label htmlFor="acc_id" className="col-sm-1 col-form-label">
            <Icon className="fa fa-credit-card-alt" aria-hidden="true" />
          </label>
          <select id="acc_id" className="col-sm-11 form-control" name="acc_id" value={accountID} onChange={this.handleAccountChange} required>
            {listOfAccounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group row">
          <label htmlFor="parent_id" className="col-sm-1 col-form-label">
            <Icon className="fa fa-link" aria-hidden="true" />
          </label>
          <select id="parent_id" disabled={categoryDisabled} className="col-sm-11 form-control" name="parent_id" value={parentID} onChange={this.handleNumberFieldChange} style={{ color: parentID ? 'black' : 'grey' }}>
            <option value="" disabled hidden>Parent category</option>
            <RenderMultilevelSelect list={listOfCategories} index={0} />
          </select>
          {parentID && <ClearParentCategoryIcon onClick={this.clearParentSelect} />}
        </div>
        <div className="row mt-1">
          <div className="offset-sm-2 col-sm-10 px-0">
            { error && <div className="text-danger">{error}</div> }
            { success && <div className="text-success">{success}</div> }
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12 px-0 d-flex justify-content-center">
            <input className="btn btn-primary" type="submit" value={submitting ? 'Creating...' : 'Create'} disabled={submitting} style={{ margin: 0 }} />
          </div>
        </div>
      </Form>
    )
  }
}

export default CreateCategoryModal
