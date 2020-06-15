import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();
  const authLinks = (
    <ul>
      <Button component={Link} to="/profiles" color="inherit">
        Students
      </Button>
      <Button component={Link} to="/posts" color="inherit">
        Posts
      </Button>
      <Button component={Link} to="/dashboard" color="inherit">
        Dashboard
      </Button>
      <Button onClick={logout} color="inherit">
        Logout
      </Button>
    </ul>
  );

  const guestLinks = (
    <ul>
      <Button component={Link} to="/register" color="inherit">
        Register
      </Button>
      <Button component={Link} to="/login" color="inherit">
        Login
      </Button>
    </ul>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <b>SoNiC</b>
          </Typography>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
