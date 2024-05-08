var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectId } from "mongodb";
import { userModel } from "../models/User.js";
import AppError from "../utels/AppError.js";
import APIFeatures from "../utels/apiFeatures.js";
import catchAsync from "../utels/CatchAsync.js";
const getUserById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield userModel.findById(userId);
    if (!result) {
        return next(new AppError('User not found', 404));
    }
    const url = `http://192.168.67.172:5000/${result.profilePhoto}`;
    result.profilePhoto = url;
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
const createUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const createdUser = yield userModel.create({ name, email, password });
    res.status(201).json({
        message: "success",
        userId: createdUser._id,
    });
}));
const updateUserById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    console.log(req.body);
    const result = yield userModel.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        return next(new AppError('User not found', 404));
    }
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
const deleteUserById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new ObjectId(req.params.userId);
    const result = yield userModel.findByIdAndDelete(userId);
    if (!result) {
        return next(new AppError('User not found', 404));
    }
    res.status(204).json({
        message: "user deleted successfully",
    });
}));
const getAllUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const features = new APIFeatures(userModel.find(), req.query);
    features.filter().sort().limitFields().paginate();
    const result = yield features.query;
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
const getMe = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
        next();
    }
};
const updateProfilePhoto = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new ObjectId(req.params.userId);
    console.log(req.file);
    // Check if files were uploaded
    if (!req.file) {
        return res.status(400).json({ message: 'No images uploaded' });
    }
    const image = req.file.path;
    const result = yield userModel.findByIdAndUpdate(userId, {
        profilePhoto: image
    }, {
        new: true,
        runValidators: true
    });
    console.log(result);
    if (!result) {
        return next(new AppError('User not found', 404));
    }
    const url = `http://192.168.188.172:5000/${result.profilePhoto}`;
    result.profilePhoto = url;
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
export default {
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser,
    getMe,
    updateProfilePhoto
};
