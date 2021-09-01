const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

const userValidator = [
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Password should at least be 6 characters.').isLength({ min: 6 })
];

/**
 * @route  POST api/users
 * @desc   Register user
 * @access Public
 */
router.post('/', userValidator, async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors : errors.array() });
    }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      res.status(400).json({ errors: [ {msg: 'User already exists.'} ] })
    }

    // Get gravatar associated with email address
    const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm' // default
    });

    user = new User({
      name,
      email,
      avatar,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to DB
    await user.save();

    res.send('User registered')
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }  
})

module.exports = router;