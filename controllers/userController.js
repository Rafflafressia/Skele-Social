// import user model
const User = require('../models/User');

module.exports = userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({})
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // get one user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('friends')
                .populate('thoughts');

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // update a user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate( { _id: req.params.userId }, req.body, { new: true, runValidators: true });
            
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
        },
    // delete a user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // add a friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate( { _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate( { _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
};
