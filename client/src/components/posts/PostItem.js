import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '10px',
    marginTop: '10px'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={avatar} alt="" />}
          component={Link}
          to={`/profile/${user}`}
          title={name}
          subheader={<Moment format="YYYY/MM/DD">{date}</Moment>}
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          onClick={() => addLike(_id)}
          color="primary"
          className={classes.button}
          startIcon={<ThumbUpAltIcon />}
        >
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </Button>
        <Button
          variant="contained"
          onClick={() => removeLike(_id)}
          color="primary"
          className={classes.button}
          startIcon={<ThumbDownIcon />}
        ></Button>
        <Button
          variant="contained"
          component={Link}
          to={`/posts/${_id}`}
          color="primary"
          className={classes.button}
          startIcon={<CommentIcon />}
        >
          Comments{' '}
          {comments.length > 0 && (
            <span className="comment-count">{'(' + comments.length + ')'}</span>
          )}
        </Button>
        {!auth.loading && user === auth.user._id && (
          <IconButton
            onClick={() => deletePost(_id)}
            color="secondary"
            aria-label="add to favorites"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
