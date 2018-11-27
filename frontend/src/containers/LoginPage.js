import { connect } from 'react-redux'
import LoginPage from '../components/LoginPage'

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { alert } = state
  return {
    loggingIn,
    alert,
  };
}

export default connect(mapStateToProps)(LoginPage)
