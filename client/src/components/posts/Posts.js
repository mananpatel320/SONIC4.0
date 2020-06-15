import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import PersonIcon from '@material-ui/icons/Person';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <Typography variant="h3" gutterBottom>
        POSTS
      </Typography>
      <Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <PersonIcon />
          <p>Welcome to the community</p>
        </div>
      </Typography>
      <PostForm />
      <div>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
