import mongoose from 'mongoose';

// информация что в себе может хранить User
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // обязательное свойство
    unique: true, // уникальное свойство
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatarUrl: String, // если свойство не обязательно можно писать без объекта сразу тип
},
{
    timestamps: true
});

export default mongoose.model('User', UserSchema)
