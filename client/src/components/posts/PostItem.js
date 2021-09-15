import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'
import { Fragment } from 'react'

const PostItem = ({ post, auth, addLike, removeLike, deletePost, showActions = true }) => {
  return (
    <div className="posts">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img
              className="round-img"
              src={post.avatar}
              alt="" />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {post.text}
          </p>
          <p className="post-date">
            Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
          </p>

          { showActions ? <Fragment>
            <button type="button" className="btn btn-light" onClick={() => addLike(post._id)}>
              <i className="fas fa-thumbs-up"></i>
              {post.likes.length ? <span>{post.likes.length}</span> : ''}
            </button>
            <button type="button" className="btn btn-light" onClick={() => removeLike(post._id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-primary">
              Discussion {post.comments.length ? <span className='comment-count'>{post.comments.length}</span> : ''}
            </Link>

            {!auth.loading && auth.user._id === post.user
              ? <button type="button" className="btn btn-danger" onClick={() => deletePost(post._id)}>
                <i className="fas fa-times"></i>
              </button> : ''}
          </Fragment> : ''}
        </div>
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapActionsToProps = {
  addLike,
  removeLike,
  deletePost
}

export default connect(mapStateToProps, mapActionsToProps)(PostItem)
