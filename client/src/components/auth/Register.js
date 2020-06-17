import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Typography variant="h3" gutterBottom>
        SIGN UP
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
          Create Your Account
        </div>
      </Typography>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            type="text"
            label="Name"
            name="name"
            variant="filled"
            fullWidth
            value={name}
            style={{ marginTop: '20px', marginBottom: '10px' }}
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            type="email"
            label="Email Address"
            name="email"
            fullWidth
            variant="filled"
            value={email}
            style={{ marginTop: '10px', marginBottom: '10px' }}
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            type="password"
            label="Password"
            name="password"
            variant="filled"
            fullWidth
            value={password}
            style={{ marginTop: '10px', marginBottom: '10px' }}
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            type="password"
            label="Confirm Password"
            variant="filled"
            name="password2"
            fullWidth
            value={password2}
            style={{ marginTop: '10px', marginBottom: '10px' }}
            onChange={onChange}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          {' '}
          Register{' '}
        </Button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
