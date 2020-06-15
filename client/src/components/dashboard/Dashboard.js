import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <Typography variant="h3" gutterBottom>
        DASHBOARD
      </Typography>
      <Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <PersonIcon />
          <p>Welcome {user && user.name}</p>
        </div>
      </Typography>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteAccount()}
          >
            <DeleteForeverIcon /> Delete My Account
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <Typography variant="body1" gutterBottom>
            You have not yet setup a profile, please add some info
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/create-profile"
          >
            Create Profile
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
