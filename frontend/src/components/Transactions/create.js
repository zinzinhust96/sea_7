import React from 'react'
import { fetchJSON } from '../../helpers/network'
import { CREATE_TRANSACTION_URL } from '../../constants/endpoint'
import Form from './form'
import { authHeader } from '../../helpers/auth-header';

const defaultState = {
  submitting: false,
  error: '',
  success: '',
}

class CreateTransaction extends React.PureComponent {
  state = defaultState

  componentDidMount() {
    this.props.getAllAccounts();
  }

  onReset = () => {
    this.setState(defaultState)
  }

  onSubmit = async (data) => {
    this.setState({ submitting: true })
    try {
      const response = await fetchJSON(CREATE_TRANSACTION_URL, {
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(),
        },
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (response.status === 'success') {
        this.setState({
          success: 'Your transaction has been successfully created!',
          submitting: false,
        })
      } else {
        this.setState({
          error: response.message,
          submitting: false,
        })
      }
    } catch (error) {
      this.setState({
        error,
        submitting: false,
      })
    }
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
            onReset={this.onReset}
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

export default CreateTransaction
