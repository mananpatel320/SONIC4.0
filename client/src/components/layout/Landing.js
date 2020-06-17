import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Social Networking in Campus</h1>
          <p className="lead">
            Create a student profile/portfolio, share posts and get help from
            other students
          </p>
          <div className="buttons">
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to="/register"
              style={{ marginRight: '20px' }}
            >
              Sign Up
            </Button>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to="/login"
              style={{ marginLeft: '20px' }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
