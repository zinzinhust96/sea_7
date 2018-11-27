import { connect } from 'react-redux'
import App from 'components/App'

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert,
  };
}

export default connect(mapStateToProps)(App)
