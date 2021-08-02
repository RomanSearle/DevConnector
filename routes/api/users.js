const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');


// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
    '/', 
    [
        // Body Validation
        check('name', 'Name is required') 
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email')
            .isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({min: 6})
    ], 
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // See if the user exits
            let user = await User.findOne({ email });

            if(user) {
                return res.status(400).json({ errors: [ { msg: 'User already exists'  } ]});
            }

            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name, 
                email, 
                avatar, 
                password
            });

            //Encrypt password
            const salt = await bcrypt.genSalt(10); // creates salt

            user.password = await bcrypt.hash(password, salt); // creates hash and puts it into user.password

            await user.save(); // anything that returns a promise... use await

            // Return jsonwebtoken 

            res.send('User Registered');

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
});

module.exports = router;