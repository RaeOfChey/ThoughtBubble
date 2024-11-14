import express, { Request, Response } from 'express';
import User from '../../models/User';
import Thought from '../../models/Thought';

const router = express.Router();

// Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get a single user by ID
router.get('/:userId', async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Update a user by ID
router.put('/:userId', async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Delete a user by ID
router.delete('/:userId', async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Thought.deleteMany({ username: user.username });  // Remove associated thoughts
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Add a friend to the user's friend list
router.post('/:userId/friends/:friendId', async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    user.friends.push(friend._id);
    await user.save();
    res.status(200).json(user);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Remove a friend from the user's friend list
router.delete('/:userId/friends/:friendId', async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.friends = user.friends.filter(friend => friend.toString() !== req.params.friendId);  // Fixing the .pull issue
    await user.save();
    res.status(200).json(user);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
