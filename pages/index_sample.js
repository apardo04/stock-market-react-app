import PropTypes from 'prop-types';
import { getToken } from '../static/auth';
import template from '../components/template';
import Se from '../static/secure-template'

const Index = ({ isLoggedIn }) => (
  <div>
    Hello {isLoggedIn.nickname}, this is the main application.
    
    { !isLoggedIn && (
      <p>You're not logged in yet</p>
    )}
  </div>
);

Index.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default template(Index);