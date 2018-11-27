import { connect } from 'react-redux'
import Homepage from '../components/Homepage'

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
  };
}

export default connect(mapStateToProps)(Homepage)
