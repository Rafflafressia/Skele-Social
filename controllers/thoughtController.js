// import Thought model
const {Thought, User} = require('../models');

module.exports = thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
                .select('-__v')
                .sort({ _id: -1 });
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // get one thought by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOne({username: req.body.username});
            user.thoughts.push(thought._id);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate( { _id: req.params.thoughtId }, req.body, { new: true, runValidators: true });
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // delete a thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions  : req.body } },
                { new: true, runValidators: true }
            );

            res.json(thought);
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        },
    // remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            res.json(thought);
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        }
};