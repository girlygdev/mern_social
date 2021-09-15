import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    addComment(postId, { text })
    setText('')
  }

  return (
    <div className="post-form" onSubmit={onSubmit}>
      <div className="bg-primary p">
        <h3>Comment on this post...</h3>
      </div>
      <form className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
}

const mapActionsToProps = {
  addComment
}

export default connect(null, mapActionsToProps)(CommentForm)
