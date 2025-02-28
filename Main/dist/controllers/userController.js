import { User } from '../models/index.js';
// 
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find({})
            .select('-__v');
        res.json(users);
    }
    catch (err) {
        console.error({ message: err });
        res.status(500).json(err);
    }
};
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new post
export const createUser = async (req, res) => {
    try {
        const post = await User.create(req.body);
        res.json(post);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const updateSingleUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
export const deleteSingleUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        // pull = opposite of set. need to update user since app is deleted.
        const oneLessFriend = await User.updateMany({ friends: req.params.userId }, { $pull: { friends: req.params.userId } }, { new: true });
        if (!oneLessFriend) {
            return res.status(404).json({
                message: 'No friend with this id!',
            });
        }
        res.json({ message: 'User successfully deleted!' });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// localhost:3001/api/user/:userId/friends
// addFriend
export const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.body } }, { runValidators: true, new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// localhost:3001/api/user/:userId/friends/:friendId
// removeFriend
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
        // finding the user
        { _id: req.params.userId }, 
        // pull, from friends, the tag id that matches this.
        { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
