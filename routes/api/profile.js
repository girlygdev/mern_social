const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require ('../../models/Profile');

const createProfileValidator = [
  check('company', 'Company is required').not().isEmpty(),
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skill is required').not().isEmpty(),
  check('experience', 'Experience is required').not().isEmpty(),
  check('education', 'Education is required').not().isEmpty(),
];

/**
 * @route  GET api/profile/me
 * @desc   Get current users profile
 * @access Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    // Add more info to model by using populate
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      res.status(400).json({msg: 'There is no profile for this user'});
    }

    res.json(profile)
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error')
  }
});

/**
 * @route  POST api/profile
 * @desc   Create user profile
 * @access Private
 */
router.post('/', [auth, createProfileValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors : errors.array() });
  }

  try {  
    const user = req.user.id;
    let profile = await Profile.findOne({ user })

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      experience,
      education,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    const profileData = {};

    if (company) profileData.company = company;
    if (website) profileData.website = website;
    if (location) profileData.location = location;
    if (status) profileData.status = status;    
    if (bio) profileData.bio = bio;
    if (githubusername) profileData.githubusername = githubusername;
    if (experience || experience.length > 0) profileData.experience = experience;
    if (education || education.length > 0) profileData.education = education;
    if (skills) profileData.skills = skills.split(',').map(s => s.trim());
    
    profileData.social = {}
    if (youtube) profileData.social.youtube = youtube;
    if (twitter) profileData.social.twitter = twitter;
    if (facebook) profileData.social.facebook = facebook;
    if (linkedin) profileData.social.linkedin = linkedin;
    if (instagram) profileData.social.instagram = instagram;

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user }, 
        { $set: profileData },
        { new: true });
    } else {
      profile = new Profile(profileData);
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error')
  }
});

module.exports = router;