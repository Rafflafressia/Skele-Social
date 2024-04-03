// import the Schema constructor and model function from Mongoose
const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trimmed: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            }, 
        },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// virtual that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', userSchema);

module.exports = User;