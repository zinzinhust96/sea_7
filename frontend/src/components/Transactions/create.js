import React from 'react'
import Form from './form'

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
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

export default CreateTransaction
