import express, { Request, Response } from 'express';
import User from '../../models/User';
import Thought from '../../models/Thought';
import { Types } from 'mongoose';

const router = express.Router();

// Get all thoughts
router.get('/', async (_req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.status(200).json(thoughts);
    } catch (err: unknown) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Get a single thought by ID
router.get('/:thoughtId', async (req: Request, res: Response): Promise<any> => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Create a new thought
router.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        // Create the thought and save it
        const thought = new Thought({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
            userId: req.body.userId,
        });

        await thought.save();

        // Find the user and associate the thought with the user
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (thought._id instanceof Types.ObjectId) {
            user.thoughts.push(thought._id);
            await user.save();
        }

        res.status(201).json(thought);
    } catch (err: unknown) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Update a thought by ID
router.put('/:thoughtId', async (req: Request, res: Response): Promise<any> => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Delete a thought by _id
router.delete('/:thoughtId', async (req: Request, res: Response): Promise<any> => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'No thought found with that ID' });

        // Find the user and remove the thought from their thoughts array
        const user = await User.findById(thought.userId);
        if (user) {
            await User.findByIdAndUpdate(
                thought.userId,
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        }

        res.status(200).json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Delete a reaction from a thought by reactionId
router.delete('/:thoughtId/reactions/:reactionId', async (req: Request, res: Response): Promise<any> => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        // Remove the reaction from the thought's reactions array
        const reactionIndex = thought.reactions.findIndex((reaction) => reaction._id.toString() === req.params.reactionId);
        if (reactionIndex === -1) {
            return res.status(404).json({ message: 'Reaction not found' });
        }

        thought.reactions.splice(reactionIndex, 1); // Removes the reaction
        thought.reactionCount = thought.reactions.length; // Updates reactionCount
        await thought.save();

        res.status(200).json({ message: 'Reaction deleted' });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Add a reaction to a thought
router.post('/:thoughtId/reactions', async (req: Request, res: Response): Promise<any> => {
    try {
        // Find the thought by ID
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        thought.reactions.push({
            reactionBody: req.body.reactionBody,
            username: req.body.username
        });

        // Save the updated thought
        await thought.save();
        res.status(201).json(thought);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

export default router;
