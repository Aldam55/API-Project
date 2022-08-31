const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')

const router = express.Router();


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Must input a first name'),
    check('firstName')
        .not()
        .isEmail()
        .withMessage('First name cannot be an email.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Must input a last name'),
    check('lastName')
        .not()
        .isEmail()
        .withMessage('Last name cannot be an email.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    // validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        if (!email || !username || !firstName || !lastName) {
            res.statusCode = 400,
                res.json({
                    message: "Validation error",
                    statusCode: res.statusCode,
                    errors: {
                        "email": "Invalid email",
                        "username": "Username is required",
                        "firstName": "First Name is required",
                        "lastName": "Last Name is required"
                    }
                })
        }

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        })
        if (existingUser) {
            res.statusCode = 403
            res.json({
                message: "User already exists",
                statusCode: res.statusCode,
                errors: {
                    email: "User with that email already exists"
                }
            })
        }

        const user = await User.signup({ email, username, password, firstName, lastName });

        const token = await setTokenCookie(res, user);

        userObj = user.toJSON()
        userObj.token = token

        return res.json(
            userObj
        );
    }
);



module.exports = router;
