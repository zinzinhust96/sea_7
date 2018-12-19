import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { fetchJSON } from '../../../helpers/network'
import { CREATE_CATEGORY_URL } from '../../../constants/endpoint'
import { authHeader } from '../../../helpers/auth-header';
import Form from './form'

const defaultState = {
  submitting: false,
  error: '',
  success: '',
}

class CreateCategoryModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState
  }

  onSubmit = async (data) => {
    this.setState({ submitting: true })
    try {
      const response = await fetchJSON(CREATE_CATEGORY_URL, {
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(),
        },
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (response.status === 'success') {
        this.setState({
          success: 'Category is successfully created!',
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

  toggle = () => {
    this.props.toggle()
    this.setState(defaultState)
  }

  render() {
    const { error, success, submitting } = this.state
    return (
      <Modal isOpen={this.props.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>
          Add transaction category
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={this.onSubmit}
            success={success}
            error={error}
            submitting={submitting}
            {...this.props}
          />
        </ModalBody>
      </Modal>
    )
  }
}

export default CreateCategoryModal
