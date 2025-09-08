import mongoose from 'mongoose'

export interface IOffer extends mongoose.Document {
  title: string
  description?: string
  requirements?: string
  salaryMin?: number
  salaryMax?: number
  currency?: string
  location?: {
    country?: string
    city?: string
  }
  modality?: 'presencial' | 'remoto' | 'híbrido'
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'other'
  contact?: string
  tags?: string[]
  attachments?: string[]
  author: mongoose.Types.ObjectId
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

const OfferSchema = new mongoose.Schema<IOffer>({
  title: { type: String, required: true },
  description: { type: String },
  requirements: { type: String },
  salaryMin: { type: Number },
  salaryMax: { type: Number },
  currency: { type: String, default: 'USD' },
  location: {
    country: { type: String },
    city: { type: String }
  },
  modality: { type: String, enum: ['presencial', 'remoto', 'híbrido'], default: 'remoto' },
  employmentType: { type: String, enum: ['full-time', 'part-time', 'contract', 'freelance', 'other'], default: 'freelance' },
  contact: { type: String },
  tags: [{ type: String }],
  attachments: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema)
