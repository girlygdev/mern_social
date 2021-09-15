import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'

const CommentItem = ({ auth, comment, postId, deleteComment }) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${comment.user}`}>
          <img
            class="round-img"
            src={comment.avatar}
            alt={comment.name}/>
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">
          {comment.text}
        </p>
        <p class="post-date">
        Posted on <Moment format='YYYY/MM/DD'>{comment.date}</Moment>
        </p>
        {!auth.loading && auth.user._id === comment.user
          ? <button type="button" className="btn btn-danger" onClick={() => deleteComment(postId, comment._id)}>
            <i className="fas fa-times"></i>
          </button> : ''}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapActionsToProps = {
  deleteComment
}

export default connect(mapStateToProps, mapActionsToProps)(CommentItem)
