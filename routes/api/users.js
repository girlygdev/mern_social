const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const userValidator = [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Password should at least be 6 characters.').isLength({ min: 6 })
];

/**
 * @route  GET api/users
 * @desc   Register user
 * @access Public
 */
router.post('/', userValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors : errors.array() });
  }

  res.send('User route')
})

module.exports = router;