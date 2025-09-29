import mongoose from 'mongoose'

export interface IConsultant extends mongoose.Document {
  user: mongoose.Types.ObjectId
  rateAmount?: number
  rateFrequency?: 'hour' | 'day' | 'month'
  degrees?: string[]
  courses?: { name: string; institution?: string; year?: string }[]
  description?: string
  objective?: string
  skills?: string[]
  portfolio?: string[]
  availability?: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

const ConsultantSchema = new mongoose.Schema<IConsultant>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  rateAmount: { type: Number },
  rateFrequency: { type: String, enum: ['hour', 'day', 'month'] },
  degrees: [{ type: String }],
  courses: [{ name: { type: String }, institution: { type: String }, year: { type: String } }],
  description: { type: String },
  objective: { type: String },
  skills: [{ type: String }],
  portfolio: [{ type: String }],
  availability: { type: String },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.models.Consultant || mongoose.model<IConsultant>('Consultant', ConsultantSchema)
