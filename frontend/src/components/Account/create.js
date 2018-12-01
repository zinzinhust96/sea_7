import React from 'react'
import { fetchJSON } from '../../helpers/network'
import { CREATE_ACCOUNT_URL } from '../../constants/endpoint'
import Form from './form'
import Menu from './menu'
import { authHeader } from '../../helpers/auth-header';
import { DISPLAY_TYPES } from '../../constants/account'
import PageWrapper from '../PageWrapper'

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
      return (<PageWrapper>
        <div className="row">
          <div className="col-4">
            <Menu displayType={DISPLAY_TYPES.CREATE_ACCOUNT} />
          </div>
          <div className="col-8">
            <Form
              onSubmit={this.onSubmit}
              success={success}
              error={error}
              submitting={submitting}
              {...this.props}
                    />
          </div>
        </div>
      </PageWrapper>)
    }
}

export default CreateAccount
