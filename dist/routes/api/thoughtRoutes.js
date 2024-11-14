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
// Get all thoughts
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thought_1.default.find({});
        res.status(200).json(thoughts);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Get a single thought by ID
router.get('/:thoughtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Create a new thought
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create the thought and save it
        const thought = new Thought_1.default({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
            userId: req.body.userId, // Make sure to send this as part of the request body
        });
        yield thought.save();
        // Find the user and associate the thought with the user
        const user = yield User_1.default.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.thoughts.push(thought._id); // Add thought to the user's thoughts array
        yield user.save();
        res.status(201).json(thought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Update a thought by ID
router.put('/:thoughtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Delete a thought by _id
router.delete('/:thoughtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findByIdAndDelete(req.params.thoughtId);
        if (!thought)
            return res.status(404).json({ message: 'No thought found with that ID' });
        // Find the user and remove the thought from their thoughts array
        const user = yield User_1.default.findById(thought.userId);
        if (user) {
            yield User_1.default.findByIdAndUpdate(thought.userId, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        }
        res.status(200).json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
