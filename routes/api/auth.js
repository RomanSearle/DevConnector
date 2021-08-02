const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');  

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req,res) => {  // Adding auth aas parameter protects it
    try {
        const user = await User.findById(req.user.id).select('-password'); // select(-password) makes it so we dont return user password
        res.json(user);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }
});

module.exports = router;