"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Reaction_1 = __importDefault(require("./Reaction")); // Assuming this is correctly defined elsewhere
// Define the Thought Schema
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    reactions: [Reaction_1.default], // Assuming you are defining the Reaction model elsewhere
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// Add a virtual to count reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Define the Thought model and export it
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
exports.default = Thought;
