import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const Experience = ({ experience, deleteExperience }) => {
  const classes = useStyles();
  const experiences = experience.map((exp) => (
    <StyledTableRow key={exp._id}>
      <StyledTableCell component="th" scope="row">
        {exp.company}
      </StyledTableCell>
      <StyledTableCell>{exp.title}</StyledTableCell>
      <StyledTableCell>
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Button
          variant="contained"
          color="primary"
          onClick={() => deleteExperience(exp._id)}
        >
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom>
        Experience Credentials
      </Typography>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Years</StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>{experiences}</TableBody>
      </Table>
    </TableContainer>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
