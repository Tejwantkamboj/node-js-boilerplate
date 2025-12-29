import mogoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    countryCode: {
      type: String,
      default: null,
      required: false,
      validate: {
        validator: function (value) {
          return /^\+\d{1,3}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid country code! It should start with '+' followed by 1 to 3 digits.`,
      },
      minlength: 2,
      maxlength: 4,
    },
    phone: {
      type: String,
      default: null,
      required: false,
      validate: {
        validator: function (value) {
          if (value == null) return true;
          return /^\d{7,13}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! It should contain only digits and be between 7 and 13 digits.`,
      },
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    profilePic: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'superAdmin', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, role, excludeUserId) {
  const user = await this.findOne({ email, role, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isNew || user.isModified('email')) {
    const emailTaken = await this.constructor.isEmailTaken(user.email, user.role, user._id);
    if (emailTaken) {
      return next(new Error('Email is already taken for this role'));
    }
  }

  if (user.isNew || user.isModified('phoneNumber')) {
    const phoneTaken = await this.constructor.isPhoneNumber(user.phoneNumber, user._id);
    if (phoneTaken) {
      return next(new Error('Phone number is already taken for this role'));
    }
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mogoose.model('User', userSchema);
export default User;
