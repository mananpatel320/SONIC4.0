import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <form
      noValidate
      autoComplete="off"
      style={{ marginTop: '10px' }}
      onSubmit={(e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
      }}
    >
      <TextField
        id="outlined-multiline-static"
        name="text"
        label="Comment"
        multiline
        rows={5}
        fullWidth
        placeholder="Leave a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginBottom: '20px' }}
      >
        Submit
      </Button>
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
