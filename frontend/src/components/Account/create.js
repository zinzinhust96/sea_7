import React from 'react'
import { fetchJSON } from '../../helpers/network'
import { CREATE_ACCOUNT_URL } from '../../constants/endpoint'
import Form from './form'
import { authHeader } from '../../helpers/auth-header';

class CreateAccount extends React.PureComponent {
  state = {
    submitting: false,
    error: '',
    success: '',
  }

  onSubmit = async (data) => {
    this.setState({ submitting: true })
    try {
      const response = await fetchJSON(CREATE_ACCOUNT_URL, {
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(),
        },
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (response.status) {
        this.setState({
          success: 'Your account has been successfully created!',
          submitting: false,
        })
      } else {
        this.setState({
          error: 'There is an error when submitting your data',
          submitting: false,
        })
      }
    } catch (e) {
      this.setState({
        error: 'There is an error when submitting your data',
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
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

export default CreateAccount
