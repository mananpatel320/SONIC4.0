import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <form
      noValidate
      autoComplete="off"
      style={{ marginTop: '10px' }}
      onSubmit={(e) => {
        e.preventDefault();
        addPost({ text });
        setText('');
      }}
    >
      <TextField
        id="outlined-multiline-static"
        name="text"
        label="Create Post"
        multiline
        rows={5}
        fullWidth
        placeholder="Say something"
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
