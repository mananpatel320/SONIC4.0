import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const DashboardActions = () => {
  useStyles();
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button component={Link} to="/edit-profile">
        Edit Profile
      </Button>
      <Button component={Link} to="/add-experience">
        Add Experience
      </Button>
      <Button component={Link} to="/add-education">
        Add Education
      </Button>
    </ButtonGroup>
  );
};

export default DashboardActions;
