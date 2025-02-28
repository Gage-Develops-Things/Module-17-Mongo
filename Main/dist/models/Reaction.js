import mongoose, { Schema } from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
export default reactionSchema;
