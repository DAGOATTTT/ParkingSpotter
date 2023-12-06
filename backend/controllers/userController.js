const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    
    if(!email || !password){
        res.status(400)
        throw new Error('Please add all fields')
       
    }

    // check if user exists 
    const userExists = await User.findOne({email})

    // Test case: checks if user exits,
    // should display User already exists'
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
       
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // create user
    const user = await User.create({
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            email: user.email,
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
        
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check for user email
    const user = await User.findOne({ email });

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.json({
                _id: user.id,
                email: user.email,
            });
        } else {
            // Password is incorrect
            res.status(400).json({
                error: 'invalid_password',
                message: 'Incorrect password. Please try again.',
            });
        }
    } else {
        // User not found (email is incorrect)
        res.status(400).json({
            error: 'invalid_email',
            message: 'Incorrect email. Please try again.',
        });
    }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

// Generate JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser, 
    loginUser,
    getMe,
}