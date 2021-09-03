const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require ('../../models/Profile');

const createProfileValidator = [
  check('company', 'Company is required').not().isEmpty(),
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skill is required').not().isEmpty()
];

const profileExperienceValidator = [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
];

const profileEducationValidator = [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('field_of_study', 'Field of study is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
  check('to', 'To date is required').not().isEmpty()
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
 * @desc   Create and update user profile
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

    const profileData = { user };

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


/**
 * @route  GET api/profiles/all
 * @desc   Get lists of all profiles
 * @access Public
*/
router.get('/all', async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
});

/**
 * @route  GET api/profiles
 * @desc   Get user profile by id
 * @access Public
*/
router.get('/user/:user_id', async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found'});
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message)

    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found'});
    }

    return res.status(500).send('Server error')
  }
});

/**
 * @route  DELETE api/profiles
 * @desc   Delete user profile by id
 * @access Public
*/
router.delete('/user/:user_id', async (req, res) => {
  try {
    // Delete profile posts
    await Profile.findOneAndRemove({ user: req.params.user_id });
    await User.findOneAndRemove({ _id: req.params.user_id});    

    res.json({ msg: 'Profile deleted'});    
  } catch (error) {
    console.error(error.message)

    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found'});
    }

    return res.status(500).send('Server error')
  }
});

/**
 * @route  PUT api/profiles/experience
 * @desc   Add profile experience
 * @access Private
*/
router.put('/experience', [auth, profileExperienceValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors : errors.array() });
  }

  try {
    const user = req.user.id;
    let profile = await Profile.findOne({ user });

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found.'});
    }

    const { title, company, from, to, location, current, description } = req.body;
    let experience = {};

    if (title) experience.title = title;
    if (company) experience.company = company;
    if (location) experience.location = location;
    if (current) experience.current = current;
    if (description) experience.description = description;
    if (from) experience.from = from;
    if (to) experience.to = to;

    profile.experience.unshift(experience)
    await profile.save();

    return res.json(profile);
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Server error')
  }
});

/**
 * @route  DELETE api/profiles/experience
 * @desc   Delete profile experience
 * @access Private
*/
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const user = req.user.id;
    const profile = await Profile.findOne({ user });

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found.'});
    }

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    // Splice out of array
    profile.experience.splice(removeIndex, 1);

    // working code == querying object id
    // const experiences = profile.experience.filter(exp => {
    //   const { id } = exp
    //   if (id !== req.params.exp_id) {
    //     return exp
    //   }
    // });
    // profile.experience = experiences;

    await profile.save();

    return res.json(profile);
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Server error')
  }
});

/**
 * @route  PUT api/profiles/education
 * @desc   Add profile education
 * @access Private
*/
router.put('/education', [auth, profileEducationValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = req.user.id;
    const profile = await Profile.findOne( { user });

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found.'});
    }

    const {
      school,
      degree,
      field_of_study,
      from,
      to,
      current,
      description
    } = req.body;

    const education = {};

    if (school) education.school = school;
    if (degree) education.degree = degree;
    if (field_of_study) education.fieldofstudy = field_of_study;
    if (from) education.from = from;
    if (to) education.to = to;
    if (current) education.current = current;
    if (description) education.description = description;

    profile.education.unshift(education);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }  
});

/**
 * @route  DELETE api/profiles/education
 * @desc   Delete profile education
 * @access Private
*/
router.delete('/education/:educ_id', auth, async (req, res) => {
  try {
    const user = req.user.id;
    const profile = await Profile.findOne({ user });

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found.'});
    }

    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.educ_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;