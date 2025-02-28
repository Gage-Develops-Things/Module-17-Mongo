import { Schema, model, Document , ObjectId} from 'mongoose';

interface IUser extends Document {
  userName: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
} 

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function (this: any) {
    return `You have ${this.friends.length} friend(s).`;
  });

const User = model('User', userSchema);

export default User;
