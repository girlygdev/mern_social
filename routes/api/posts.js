const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

const validatePost = [
  check('text', 'Text is required').not().isEmpty()
];

const validateComment = [
  check('text', 'Text is required').not().isEmpty()
]


/**
 * @route  GET api/posts
 * @desc   Get post
 * @access Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ data: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

/**
 * @route  GET api/posts/id
 * @desc   Get post
 * @access Private
 */
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      res.status(400).json({ msg: 'No post found' });
    }

    res.status(500).send('Server error');
  }
})

/**
 * @route  POST api/posts
 * @desc   Create post
 * @access Private
 */
router.post('/', [auth, validatePost], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select('-password');

    if (!user) {
      return res.status(400).json({ msg: 'User not found.' });
    }

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: userID
    });

    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

/**
 * @route  DELETE api/posts/id
 * @desc   DELETE post
 * @access Private
 */
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const postID = req.params.post_id;

    const post = await Post.findById(postID);
    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }

    if (post.user.toString() === userID) {
      await post.remove();
      res.json({ msg: 'Post deleted.' });
    } else {
      res.status(401).json({ msg: 'Unable to delete others post' })
    }
  } catch (error) {
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      res.status(400).json({ msg: 'No post found' });
    }

    res.status(500).send('Server error');
  }
})


/**
 * @route  PUT api/posts/like/id
 * @desc   Like post
 * @access Private
 */
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const postID = req.params.post_id;

    const post = await Post.findById(postID);

    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }

    if (post.likes.filter(likedUser => likedUser.user.toString() === userID).length) {
      return res.status(400).json({ msg: 'Post already liked' })
    }

    post.likes.unshift({ user: userID })
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      res.status(400).json({ msg: 'No post found' });
    }

    res.status(500).send('Server error');
  }
})

/**
 * @route  PUT api/posts/unlike/id
 * @desc   Unlike post
 * @access Private
 */
router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const postID = req.params.post_id;

    const post = await Post.findById(postID);

    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }

    if (!post.likes.filter(likedUser => likedUser.user.toString() === userID).length) {
      return res.status(400).json({ msg: 'Post has not been liked.' })
    }

    const likes = post.likes.filter(likedUser => likedUser.user.toString() !== userID);
    post.likes = likes;
    await post.save();

    return res.json(post.likes)
  } catch (error) {
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      res.status(400).json({ msg: 'No post found' });
    }

    res.status(500).send('Server error');
  }
})

/**
 * @route  PUT api/posts/comments/id
 * @desc   Comment on a post
 * @access Private
 */
router.put('/:post_id/comments', [auth, validateComment], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userID = req.user.id;
    const postID = req.params.post_id;

    const post = await Post.findById(postID);
    const user = await User.findById(userID).select('-password');

    if (!user) {
      return res.status(400).json({ msg: 'No user found' });
    }

    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }

    const newComment = {
      user: userID,
      text: req.body.text,
      name: user.name
    }

    post.comments.unshift(newComment)
    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      res.status(400).json({ msg: 'No post found' });
    }

    res.status(500).send('Server error');
  }
})

/**
 * @route  DELETE api/posts/comment/id
 * @desc   Delete a comment
 * @access Private
 */
 router.delete('/:post_id/comments/:comment_id', auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const postID = req.params.post_id;
    const commentId = req.params.comment_id;

    const post = await Post.findById(postID);

    if (!post) {
      return res.status(400).json({ msg: 'No post found' });
    }

    if (!post.comments.filter(comment => comment.user.toString() === userID && comment._id.toString() === commentId).length) {
      return res.status(400).json({ msg: 'Unable to delete others comment' })
    }

    const comments = post.comments.filter(comment => comment._id.toString() !== commentId);
    post.comments = comments;
    await post.save();
    
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      res.status(400).json({ msg: 'No post found' });
    }

    res.status(500).send('Server error');
  }
})

module.exports = router;