import transporter from '../constants/nodemailer.constant.js';
import userSchema from '../models/user.model.js';
import asyncWrapper from '../utils/asyncWrapper.utils.js'
import jwt from 'jsonwebtoken';
import generateVerificationEmail from '../templates/verifyEmail.template.js';

const generateToken = (user) => {
    return jwt.sign(
        {
            userEmail: user.email,
            userName: user.username,
            _id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    );
};

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    const token = generateToken(user);
    
    res.cookie('token', token, { httpOnly: true, secure: true });
    return res.status(200).json({ message: 'Login successful', user, token });
});

const register = asyncWrapper(async (req, res) => {
    const { username, email, password, gender } = req.body;
    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new userSchema({
        username:username,
        email:email,
        password: password,
        gender: gender,
    });

    await newUser.save();

    const token = generateToken(newUser);

    const { subject, html } = generateVerificationEmail(token);

    const info = await transporter.sendMail({
        from: process.env.NODEMAIL_SENDER,
        to: email,
        subject,
        html
    });

    if (!info.accepted.length === 0) {
        console.error("Error sending email");
        return res.status(400).json({ message: "Sending email failed", info: info });
    }

    console.log(token);
    

    res.cookie('token', token, { httpOnly: true, secure: true });
    return res.status(201).json({ message: 'Registration successful', newUser,mail:info, token });

});

const logout = asyncWrapper(async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' }); 
});

const testRoute = asyncWrapper(async (req, res) => {
    const data = req.user;
    return res.status(200).json({ message: 'This is a test route',data });

})

const verifyUser = asyncWrapper(async (req, res) => {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    const user = await userSchema.findById(decoded._id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if(user.verified){
        return res.status(400).json({ message: 'User is already verified' });
    }

    if(user && !user.verified){
        user.verified=true;
        await user.save();
        return res.status(200).json({ message: 'Email verified successfully', userEmail: user.email });
    }

    return res.status(400).json({ message: 'Expired link or invalid token Please generate a new link' });

});

export { login, register, logout, testRoute, verifyUser };