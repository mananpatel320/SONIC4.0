import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Typography variant="h3" gutterBottom>
        SIGN IN
      </Typography>
      <Typography>
        <div
          variant="h4"
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <PersonIcon />
          Sign Into Your Account
        </div>
      </Typography>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            type="email"
            variant="filled"
            label="Email Address"
            name="email"
            fullWidth
            value={email}
            style={{ marginTop: '20px', marginBottom: '10px' }}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <TextField
            type="password"
            label="Password"
            variant="filled"
            name="password"
            value={password}
            fullWidth
            style={{ marginTop: '10px', marginBottom: '10px' }}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <Button type="submit" color="primary" variant="contained">
          {' '}
          Login{' '}
        </Button>
      </form>
      <Typography className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </Typography>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
