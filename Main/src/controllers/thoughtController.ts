import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

// /api/thoughts
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find({})
      .select('-__v');
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      res
        .status(404)
        .json({ message: 'Thought created, but found no user with that ID' });
    } else {
      res.json('Created the thought 🎉');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
// /api/thoughts/:thoughtId
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v');

    if (!thought) {
      res.status(404).json({ message: 'No thought with that ID' });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export const updateSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
}

export const deleteSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
// pull = opposite of set. need to update user since thought is deleted.
    const oneLessThought = await User.findOneAndUpdate(
      { friends: req.params.thoughtId },
      { $pull: { friends: req.params.thoughtId } },
      { new: true }
    );

    if (!oneLessThought) {
      return res.status(404).json({
        message: 'No thought with this id!',
      });
    }

    res.json({ message: 'Thought successfully deleted!' });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// localhost:3001/api/thoughts/:thoughtId/reactions
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// localhost:3001/api/user/:thoughtId/reactions/:reactionId
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      // finding the thought
      { _id: req.params.thoughtId },
      // pull, from reactions, the reaction id that matches this.
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}