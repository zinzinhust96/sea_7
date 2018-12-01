import { connect } from 'react-redux'
import Homepage from '../components/Homepage'

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Homepage)
