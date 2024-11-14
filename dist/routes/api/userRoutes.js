"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../../models/User"));
const Thought_1 = __importDefault(require("../../models/Thought"));
const router = express_1.default.Router();
// Get all users
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Get a single user by ID
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Create a new user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default(req.body);
        yield user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Update a user by ID
router.put('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Delete a user by ID
router.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield Thought_1.default.deleteMany({ username: user.username }); // Bonus: Remove associated thoughts
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Add a friend to the user's friend list
router.post('/:userId/friends/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.userId);
        const friend = yield User_1.default.findById(req.params.friendId);
        if (!user || !friend) {
            return res.status(404).json({ message: 'User or friend not found' });
        }
        user.friends.push(friend._id); // Use _id
        yield user.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Remove a friend from the user's friend list
router.delete('/:userId/friends/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.friends = user.friends.filter(friend => friend.toString() !== req.params.friendId); // Fixing the .pull issue
        yield user.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
