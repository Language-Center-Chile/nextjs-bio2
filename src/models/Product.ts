import mongoose from 'mongoose'

export interface IProduct extends mongoose.Document {
  title: string
  description: string
  price: number
  category: 'semillas' | 'plantas' | 'herramientas' | 'servicios' | 'otros'
  images: string[]
  seller: mongoose.Types.ObjectId
  location: {
    country: string
    city: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    maxlength: [100, 'El título no puede ser más largo de 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    maxlength: [1000, 'La descripción no puede ser más larga de 1000 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio debe ser positivo']
  },
  category: {
    type: String,
    enum: ['semillas', 'plantas', 'herramientas', 'servicios', 'otros'],
    required: [true, 'La categoría es requerida']
  },
  images: [{
    type: String
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Índices para mejorar las consultas
ProductSchema.index({ category: 1, isActive: 1 })
ProductSchema.index({ 'location.country': 1, 'location.city': 1 })
ProductSchema.index({ createdAt: -1 })

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
