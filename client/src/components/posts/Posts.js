import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ post: { posts, loading}, getPosts }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return (
    <Fragment>
      { loading 
        ? <Spinner />
        : <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
          </p>
          
          <PostForm />

          <div className="posts">
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
      </Fragment>}
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

const mapActionsToProps = {
  getPosts  
}

export default connect(mapStateToProps, mapActionsToProps)(Posts)
