const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();


const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "http://localhost:3000/"
);
oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});
const verifyToken = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const token = await Token.findOne({ 
            userId: user._id,
            token: req.params.token 
        });
        if (!token) {
            return res.status(400).send('Token not found');
        }
        await User.updateOne({ _id: user._id }, { verified: true });
        await token.deleteOne();

        res.status(200).send('Account verified successfully');
    } catch (error) {
        res.status(500).send('Error verifying account');
    }
}

const sendEmail = async (email, subject, text) => {
    try {
        const accessTokenResponse = await oauth2Client.getAccessToken();
        const accessToken = accessTokenResponse.token;
        console.log("clientid", process.env.OAUTH_CLIENT_ID);
        console.log("clientsecret", process.env.OAUTH_CLIENT_SECRET);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            return res.status(400).send('User already exists with the given username or email');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const user = new User({
            username,
            email,
            passwordHash: hashedPassword // Use the hashed password here
        });

        // Save the user to the database
        await user.save();

        //create token
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(16).toString('hex')
        }).save();
        const url = `${process.env.BASE_URL}/user/${user._id}/confirmation/${token.token}`;
        await sendEmail(user.email, 'Account Verification', `Click the link to verify your account: ${url}`);
        // Send success response
        res.status(201).send('User registered successfully and email sent');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Error registering new user');
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate a JWT for the user
        const token = jwt.sign(
            { userId: user._id }, // Payload
            process.env.JWT_SECRET, // Secret key from your environment variables
            { expiresIn: '1h' } // Token expiration time
        );

        // Send the token to the client
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in user');
    }
};
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
};
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).send('Error updating user');
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).send('Error deleting user');
    }
};
const logoutUser = async (req, res) => {
    // Inform the client to clear the token
    res.status(200).send('Logged out successfully. Please clear your token.');
};
const getLoggedIn = async (req, res) => {
    try {
        if (!req.headers.authorization) return res.status(401).send("Authorization header is missing");

        const token = req.headers.authorization.split(' ')[1]; // Extracts token from the "Bearer <token>" format
        if (!token) return res.status(401).send("Token is missing");

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Corrected to use the environment variable
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Optionally, remove sensitive information before sending the user object
        user.passwordHash = undefined;
        
        res.status(200).json(user); // Sends user information as a response
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send('Invalid or expired token'); // Covers cases like token expiration or tampering
    }
};
module.exports = {
    registerUser: register,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
    logoutUser,
    getLoggedIn,
    verifyToken
};