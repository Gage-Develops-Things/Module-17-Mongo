import mongoose, { Schema, Document, ObjectId } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId

interface IReaction extends Document {
    reactionId: ObjectId,
    reactionBody: string,
    userName:string,
    createdAt: Date,
  }

const reactionSchema = new Schema<IReaction> ({
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
})

export default reactionSchema