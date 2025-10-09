import mongoose from 'mongoose'

export interface ISubscription extends mongoose.Document {
  user: mongoose.Types.ObjectId
  planId: string
  planName: string
  price: number
  currency: string
  status: 'pending' | 'active' | 'cancelled' | 'expired'
  providerId?: string
  startedAt?: Date
  currentPeriodEnd?: Date
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const SubscriptionSchema = new mongoose.Schema<ISubscription>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: String, required: true },
  planName: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['pending', 'active', 'cancelled', 'expired'], default: 'pending' },
  providerId: { type: String },
  startedAt: { type: Date },
  currentPeriodEnd: { type: Date },
  metadata: { type: Object }
}, { timestamps: true })

SubscriptionSchema.index({ user: 1 })
SubscriptionSchema.index({ providerId: 1 })

export default mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema)
