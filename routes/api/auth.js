const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

const userLoginValidator = [
  check('email', 'Email is required.').exists(),
  check('email', 'Invalid email address').isEmail(),
  check('password', 'Password is required.').exists(),
];

/**
 * @route  GET api/auth
 * @desc   Test route
 * @access Public
 */
router.get('/', auth, async (req, res) => {
  try {    
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Authorization error" })
  }
})


/**
 * @route  POST api/auth
 * @desc   Authenticate user credentials and pass in JWT
 * @access Public
 */
router.post('/', userLoginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors : errors.array() });
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      res.status(400).json({ errors: [ {msg: 'Invalid user credentials.'} ] });
    }

    if (user) {
      // Compare password compare(stringPassword, hashedPassword)
      let validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const payload = {
          user: {
            id: user.id
          }
        }

        jwt.sign(
          payload, 
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token })
          }
        );
      } else {
        res.status(400).json({ errors: [ {msg: 'Invalid user credentials.'} ] });
      }
    }    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }  
});

module.exports = router;