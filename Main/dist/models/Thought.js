import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction.js';
;
// Schema to create Post model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, 'Thoughts must be at least 1 character long.'],
        maxlength: [280, 'Thoughts must be less than 280 characters long.']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: formatDate
    },
    userName: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
}, {
    toJSON: { getters: true,
        virtuals: true
    },
    toObject: { getters: true }
});
// Create a virtual property `tagCount` that gets the amount of comments per user
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
    return this.reactions.length;
});
// Initialize our Post model
const Thought = model('Thought', thoughtSchema);
export default Thought;
