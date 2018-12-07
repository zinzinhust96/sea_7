import React from 'react'
import Form from './form'

const CATEGORY = [
  {
    name: 'Food & Beverage',
    children: [
      {
        name: 'Restaurant',
        children: [],
      },
      {
        name: 'Cafe',
        children: [],
      },
    ],
  },
  {
    name: 'Transportation',
    children: [
      {
        name: 'Taxi',
        children: [],
      },
      {
        name: 'Parking Fees',
        children: [],
      },
      {
        name: 'Petrol',
        children: [],
      },
      {
        name: 'Maintenance',
        children: [],
      },
    ],
  },
  {
    name: 'Shopping',
    children: [
      {
        name: 'Clothing',
        children: [],
      },
      {
        name: 'Footwear',
        children: [{
          name: 'Sneaker',
          children: [],
        }],
      },
      {
        name: 'Accessories',
        children: [],
      },
      {
        name: 'Electronics',
        children: [],
      },
    ],
  },
]

class CreateTransaction extends React.PureComponent {
  state = {
    submitting: false,
    error: '',
    success: '',
  }

  componentDidMount() {
    this.props.getAllAccounts();
  }

  render() {
    const { error, success, submitting } = this.state
    return (
      <div className="row">
        <div className="col-8 offset-2">
          <Form
            onSubmit={this.onSubmit}
            success={success}
            error={error}
            submitting={submitting}
            categories={CATEGORY}
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

export default CreateTransaction
