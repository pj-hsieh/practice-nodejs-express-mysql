const userModel = require("../models/user")
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');

exports.signin_get = (req, res, next) => {
    res.render("signin");
};

exports.signin_post = [
    body("email")
        .isEmail()
        .withMessage("Email not found."),
    body("password")
        .isLength({ min: 8, max: 20 })
        .escape()
        .withMessage("Password mismatch."),

    (req, res, next) => {
        const { email, password } = req.body;
        userModel.findByEmail(email, (result) => {
            if (result) {
                let isPwdMatch = bcrypt.compareSync(password, result.password);
                if (isPwdMatch) {
                    req.session.regenerate((err) => {
                        if (err) {
                            return res.render("signin", { email, errors: [ 'Something wrong in signin process.' ] });
                        }else {
                            req.session.isLogin = true;
                            req.session.loginUser = result.name;
                            res.redirect('/');
                        }
                    });
                }else {
                    res.render("signin", { email, errors: [ 'Password mismatch.' ] });
                }
            }else {
                res.render("signin", { email, errors: [ 'Email not found.' ] });
            }
        });
    }
];

exports.signup_get = (req, res, next) => {
    res.render("signup");
};

exports.signup_post = [
    body("name")
        .trim()
        .isLength({ min: 1, max: 32 })
        .escape()
        .withMessage("Name must be specified.")
        .isAlphanumeric()
        .withMessage("Name has non-alphanumeric characters."),
    body("email")
        .isEmail()
        .withMessage("Email not correct."),
    body("password")
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,20}$/)
        .withMessage("Password must be 8-20 characters including 1 uppercase letter, 1 special character, and alphanumeric."),
    body('passwordConfirm').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm password does not match password');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        const { name, email, password } = req.body;
        if (!errors.isEmpty()) {
            res.render("signup", { name, email, errors: errors.array().map(e => e.msg) });
            return;
        }

        userModel.checkEmailExists(email, (results) => {
            if (results.isExists) {
                res.render("signup", { name, email, errors: [ 'email already exists.' ] });
            }else {
                let hashedPwd = bcrypt.hashSync(password, 10);
                userModel.create(name, email, hashedPwd, (result) => {
                    if (result.isSuccess){
                        req.session.isLogin = true;
                        req.session.loginUser = name;
                        res.redirect('/');
                    }else {
                        res.render("signup", { name, email, errors: [ 'Create user failed.' ] });
                    }
                });
            }
        });
    }
];
 
exports.signout_get = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
};
