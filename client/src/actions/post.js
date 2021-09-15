import { ADD_COMMENT, ADD_POST, DELETE_COMMENT, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";
import axios from 'axios'
import { setAlert } from "./alert";

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// Get posts
export const getPost = (postID) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postID}`)

    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// Add like
export const addLike = (postID) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postID}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postID, likes: res.data }
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// Remove like
export const removeLike = (postID) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postID}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postID, likes: res.data }
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// Add post
export const addPost = (data) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post(`/api/posts`, data, config)

    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    dispatch(setAlert('Post Created', 'success'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })

    dispatch(setAlert('Unable to add a new post', 'danger'))
  }
}

// Delete post
export const deletePost = (postID) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postID}`)

    dispatch({
      type: DELETE_POST,
      payload: postID
    })

    dispatch(setAlert('Post Removed', 'success'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })

    dispatch(setAlert('Unable to remove post', 'danger'))
  }
}

// Add post
export const addComment = (postID, data) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(`/api/posts/${postID}/comments`, data, config)

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })

    dispatch(setAlert('Comment added', 'success'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })

    dispatch(setAlert('Unable to add a new comment', 'danger'))
  }
}

// Add post
export const deleteComment = (postID, commentID) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postID}/comments/${commentID}`)

    dispatch({
      type: DELETE_COMMENT,
      payload: commentID
    })

    dispatch(setAlert('Comment deleted', 'success'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })

    dispatch(setAlert('Unable to delete comment', 'danger'))
  }
}