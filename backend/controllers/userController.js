const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendMail');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const Token = require('../models/token');





// for changing profile picture
exports.DPchangeByAdmin = async (req, res, next) => {
    try {

        const file = req.file.filename;  // string of picture
        const { userId } = req.body; // user id 
        var id = mongoose.Types.ObjectId(userId); // convert id to as an object
        const filter = { _id: id };
        const update = { profile_pic: file };
        let user;
        try {
            user = await User.findOneAndUpdate(filter, update, {
                new: true
            }); // query for updating
        }
        catch (error) {
            res.status(400).json({
                detail: "an error happend" // 400 == error // data will pass as json //req == request
            })
        }
        return res.status(200).json({
            "message": "successfully dp change" // success
        });
    }
    catch (error) {
        res.status(400).json({
            detail: "an error happend"
        })
    }
}

// when user changes the profile picture
exports.UpdateUserDP = async (req, res, next) => {
    try {

        const file = req.file.filename;
        var id = req.userId;
        const filter = { _id: id };
        const update = { profile_pic: file };
        let user;
        try {
            user = await User.findOneAndUpdate(filter, update, {
                new: true
            });
        }
        catch (error) {
            console.log("error", error)
        }
        return res.status(200).json({
            "file_name": file,
            "message": "successfully dp change"
        });
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            detail: "an error happend"
        })
    }
}



// for deleting user
exports.DeleteUser = async (request, response, next) => {
    try {
        const user = await User.findByIdAndRemove(request.params.id);
        // await Comment.deleteOne({ user: request.params.id })
        // await Reply.deleteOne({ user: request.params.id })
        response.status(200).json({
            user: user,
            message: "Succesfully deleted"
        })
    }
    catch (error) {
        response.status(500).json(
            {
                detail: "server error"
            }
        )

    }
}

// for updating user by admin
exports.UpdateUserByAdmin = async (req, res, next) => {
    try {
        const { userId, firstName, lastName, email, verified, isAdmin } = req.body;
        let user = {
            firstName: firstName,
            lastName: lastName,
            verified: verified,
            isAdmin: isAdmin
        }
        const id = mongoose.Types.ObjectId(userId);
        const filter = { _id: id }
        let updateUser = await User.findOneAndUpdate(filter, user, {
            new: true
        });
        return res.status(200).json({
            "user": updateUser,
            "message": "Update successfully"
        })

    }
    catch (error) {
        return res.status(400).json({
            detail: "Server error"
        })

    }
}

// update by user
exports.UpdateUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!email) return res.status(400).json({ "detail": "email not given" });
        const existingUser = await User.findOne({ email: email });
        if (firstName.length < 4) return res.status(400).json({ "detail": "first name needs to be more than 3 characters" });
        if (firstName.length > 10) return res.status(400).json({ "detail": "first name needs to be less than 10 characters" });
        if (!lastName) return res.status(400).json({ "detail": "last name not given" });
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) return res.status(400).json({ "detail": "password does not match" });
        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        }
        const id = mongoose.Types.ObjectId(req.userId);
        const filter = { _id: id }
        let updateUser = await User.findOneAndUpdate(filter, user, {
            new: true
        });
        const token = jwt.sign({
            email: updateUser.email,
            userId: updateUser._id
        }, process.env.KEY, {
            expiresIn: '1h'
        })
        const user_info = {
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            _id: updateUser._id,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            profile_pic: updateUser.profile_pic,
            token: token
        }

        return res.status(200).json({
            "message": "profile update successfully",
            "userInfo": user_info
        })
    }
    catch (err) {
        return res.status(400).json({ "detail": "error occured" });
    }
}

// for retrieve data by id of user
exports.GetUser = async (req, res, next) => {

    try {
        const id = req.userId;;
        const user = await User.findById(_id = id);
        return res.status(200).json({
            "user": user,
            "message": "Profile Loaded!"
        })
    }
    catch (err) {
        return res.status(400).json({ detail: "error occured" });
    }
}

// get user for admin
exports.GetAdminUser = async (req, res, next) => {
    try {
        const user = await User.findById(_id = req.params.id);
        return res.status(200).json({
            "user": user,
            "message": "Success"
        })

    }
    catch (err) {
        console.log("error is here => ", err);
        return res.status(400).json({ detail: "error occured" });
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({updatedAt:-1});
        return res.status(200).json({
            "users": users,
            "message": "Success"
        })
    }
    catch (err) {
        return res.status(400).json({ detail: "server error occured" });
    }
}


// for creating user
exports.SignUp = async (req, res, next) => {


    try {
        const { firstName, lastName, email, password, password2 } = req.body;
        if (password != password2) {
            return res.status(400).json({ detail: "Password did not match" });
        }
        if (password.length <= 6) {
            return res.status(400).json({ detail: "Password length need to be more than 6" });
        }
        let pattern = new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$");
        if (!pattern.test(password)) {
            return res.status(400).json({ detail: "Weak password." })

        }

        if (!email || !password || !firstName || !lastName || !req.file) {
            return res.status(400).json({ detail: "Not all fields have been entered." });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ detail: 'This email address is already being used' })
        }


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            profile_pic: req.file.filename
        });
        const savedUser = await newUser.save();
        const createToken = jwt.sign({
            email: savedUser.email,
            userId: savedUser._id
        }, process.env.KEY, {
            expiresIn: '3h'
        })

        let token = await new Token({
            userId: savedUser._id,
            token: createToken,
        }).save();

        const message = `http://localhost:3000/#/api/user/verify/${savedUser.id}/${token.token}`;
        const check = await sendEmail(savedUser.email, "Verify Email", message);
        if (check == true) {
            await Token.findByIdAndRemove(savedUser._id);
            await User.findByIdAndRemove(token._id);
            return res.status(400).json({ detail: "Your Given Email Does not work!!!" });
        }
        else {
            return res.status(200).json({ "message": "Go to email and verify your account!!!!" });
        }
    }
    catch (error) {
        return res.status(400).json({
            detail: "an error occured"
        });
    }
}

//to verify link
exports.SignUp_verification = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ detail: "Invalid Link" });

        

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({ detail: "Invalid Link" });

        
        const id = { _id: user._id };
        const update = { verified: true };
        let ver = await User.findOneAndUpdate(id, update, {
            new: true
        });
        const us = await User.findOne({ _id: req.params.id });
        await Token.findByIdAndRemove(token._id);
        
        const tkn = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.KEY, {
            expiresIn: '3h'
        })
        const user_info = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            profile_pic: user.profile_pic,
            token: tkn
        }
      
        return res.status(200).json({
            "userInfo": user_info,
            "message": "Email verified Successfully"
        })
    } catch (error) {
        return res.status(400).json({ detail: "server error" });
    }

}

exports.ResetPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) return res.status(400).json({
            detail: "No email registerd with this email"
        });
        const salt = await bcrypt.genSalt();
        const createToken = jwt.sign({
            email: existingUser.email,
            userId: existingUser._id
        }, process.env.KEY, {
            expiresIn: '3h'
        })
        const odd = await Token.findOne({ userId: existingUser.id });
        if (odd) {
            return res.status(400).json({
                detail: "Already Email sent in your account please verify"
            });
        }
        let token = await new Token({
            userId: existingUser._id,
            token: createToken,
        }).save();
        const message = `http://localhost:3000/#/api/user/password/verify/${existingUser.id}/${token.token}`;
        const check = await sendEmail(existingUser.email, "Verify Email", message);
        if (check)
            return res.status(200).json({ "message": "Go to email and verify your account!!!!" });
        else return res.status(400).json({
            detail: "Serevr error happend"
        });
    }
    catch (error) {
        return res.status(200).json({ detail: "Server error happend" });
    }
}

exports.ResetPasswordVerification = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ detail: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({ detail: "Invalid Link" });
        return res.status(200).json({
            "message": "Email verified Successfully",
        })

    }
    catch (error) {
        return res.status(400).json({ detail: "Server error" });
    }
}

exports.UpdatePassword = async (req, res, next) => {
    try {

        const { password, password2 } = req.body;
        console.log(req.body, ' ppp', password, password2)
        if (password != password2) {
            return res.status(400).json({ detail: "Password did not match" });
        }
        if (password.length <= 7) {
            return res.status(400).json({ detail: "Password length need to be more than 6" });
        }
        let pattern = new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$");
        if (!pattern.test(password)) {
            return res.status(400).json({ detail: "Weak password." })

        }
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ detail: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({ detail: "Invalid Link" });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const updateUser = new User({
            _id: req.params.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: passwordHash,
        });
        //ERROR HERE TO DO
        User.updateOne({ _id: req.params.id }, updateUser).then(
            () => {
                // res.status(201).json({
                //     message: 'Thing updated successfully!'
                // });
                console.log("success");
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    detail: "error happend"
                });
            }
        );

        await Token.findByIdAndRemove(token._id);
        const tkn = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.KEY, {
            expiresIn: '1h'
        })

        const user_info = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            profile_pic: user.profile_pic,
            token: tkn
        }
        res.status(200).json({
            "userInfo": user_info,
            "message": "Password update  successfully"
        })
    }
    catch (error) {
        return res.status(400).json({ detail: "serevr error occured" });
    }

}

exports.SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) return res.status(400).json({ detail: "email does not exist" });
        if (!existingUser.verified) return res.status(400).json({ detail: "email is not verified" });
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) return res.status(400).json({ detail: "password does not match" });


        const token = jwt.sign({
            email: existingUser.email,
            userId: existingUser._id
        }, process.env.KEY, {
            expiresIn: '3h'
        })
        const user_info = {
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            _id: existingUser._id,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
            profile_pic: existingUser.profile_pic,
            token: token
        }
        return res.status(200).json({
            "userInfo": user_info,
            "message": "logIn successfully"
        })
    }
    catch (error) {
        return res.status(400).json({
            detail: "Server error"
        });
    }
}