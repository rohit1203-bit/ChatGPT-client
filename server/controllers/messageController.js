const dotenv = require("dotenv");
const mongoose = require('mongoose');
const errorResponse = require("../utils/errorResponse");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const messageModel = require("../models/messageModel");
dotenv.config();
exports.deletemessageController = async (req, res) => {
    try{
        const{ messageId, token } = req.body;
        var decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const userId = decoded.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const objectId = user._id;
        // console.log(userId);
        // const checkuserId = await userModel.findById({userId});
        // console.log(checkuserId);
        if (!objectId) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deletedMessage = await messageModel.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(204).end();


    } catch(err){
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
    
};
exports.getmessagesController = async (req, res) => {
    try{
        const authToken = req.headers.authorization;
        const token = authToken && authToken.split(' ')[1];
        // const{ token } = req.body;
        console.log(token);
        var decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const userId = decoded.id;
        console.log(userId);
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const objectId = user._id;
        // console.log(userId);
        // const checkuserId = await userModel.findById({userId});
        // console.log(checkuserId);
        if (!objectId) {
            return res.status(404).json({ message: 'User not found' });
        }

        const messages = await messageModel.find({ userId }).sort({ _id: -1 }).limit(10);

        if (!messages) {
            return res.status(404).json({ message: 'No messages found for this user' });
        }
        // const textinput = messages[0].textinput;
        // const textresult = messages[0].textresult;
        // res.status(200).json({ textinput, textresult });

        res.status(200).json({messages});

    } catch(err){
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
exports.chatController = async (req, res) => {
    try{
        const{ textinput } = req.body;
        console.log(textinput);
        const authToken = req.headers.authorization;
        console.log(req.body);
        console.log(authToken);
        const token = authToken && authToken.split(' ')[1];
        console.log(token);
        var decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const userId = decoded.id;
        const textresult = textinput;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const objectId = user._id;
        // console.log(userId);
        // const checkuserId = await userModel.findById({userId});
        // console.log(checkuserId);
        if (!objectId) {
            return res.status(404).json({ message: 'User not found' });
        }
        const message = await messageModel.create({ textinput, textresult, userId });
        return res.status(200).json({
            result: textresult,
        });

    } catch(err){
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
