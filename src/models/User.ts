import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  role: 'user' | 'consultant' | 'admin'
  avatar?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    maxlength: [60, 'El nombre no puede ser más largo de 60 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['user', 'consultant', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String
  },
  bio: {
    type: String,
    maxlength: [500, 'La biografía no puede ser más larga de 500 caracteres']
  }
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
