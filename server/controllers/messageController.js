const dotenv = require("dotenv");
const mongoose = require('mongoose');
const errorResponse = require("../utils/errorResponse");
const userModel = require("../models/userModel");
const messageModel = require("../models/messageModel");
dotenv.config();
exports.getmessagesController = async (req, res) => {
    try{
        const{ textinput, userId } = req.body;
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

        const messages = await messageModel.find({ userId });

        if (!messages) {
            return res.status(404).json({ message: 'No messages found for this user' });
        }
        res.status(200).json(messages);

    } catch(err){
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
exports.chatController = async (req, res) => {
    try{
        const{ textinput, userId } = req.body;
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
