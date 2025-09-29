import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
import User from '@/models/User'

export default async function TestPage() {
  let connectionStatus = 'No conectado'
  let userCount = 0
  let productCount = 0
  let error = null

  try {
    await dbConnect()
    connectionStatus = 'Conectado exitosamente'
    
    userCount = await User.countDocuments()
    productCount = await Product.countDocuments()
    
  } catch (err: any) {
    error = err.message
    connectionStatus = 'Error de conexión'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Estado de la Base de Datos</h1>
        
        <div className="grid gap-6">
          {/* Estado de conexión */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Conexión a MongoDB</h2>
            <div className={`p-3 rounded ${connectionStatus === 'Conectado exitosamente' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
              <strong>Estado:</strong> {connectionStatus}
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-900 text-red-200 rounded">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Estadísticas */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Estadísticas de la Base de Datos</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-900 rounded">
                <div className="text-2xl font-bold">{userCount}</div>
                <div className="text-blue-200">Usuarios</div>
              </div>
              <div className="p-4 bg-green-900 rounded">
                <div className="text-2xl font-bold">{productCount}</div>
                <div className="text-green-200">Productos</div>
              </div>
            </div>
          </div>

          {/* Variables de entorno */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Configuración</h2>
            <div className="space-y-2 text-sm">
              <div>
                <strong>MONGODB_URI configurado:</strong> {process.env.MONGODB_URI ? '✅ Sí' : '❌ No'}
              </div>
              <div>
                <strong>NODE_ENV:</strong> {process.env.NODE_ENV || 'No definido'}
              </div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Próximos pasos</h2>
            <div className="space-y-2 text-sm">
              {!process.env.MONGODB_URI && (
                <div className="p-3 bg-yellow-900 text-yellow-200 rounded">
                  ⚠️ Configura MONGODB_URI en tu archivo .env.local
                </div>
              )}
              {connectionStatus !== 'Conectado exitosamente' && (
                <div className="p-3 bg-red-900 text-red-200 rounded">
                  ❌ Verifica que MongoDB esté ejecutándose
                </div>
              )}
              {productCount === 0 && connectionStatus === 'Conectado exitosamente' && (
                <div className="p-3 bg-blue-900 text-blue-200 rounded">
                  💡 Ejecuta la API de seed para agregar datos de ejemplo: <br/>
                  <code className="bg-gray-700 px-2 py-1 rounded mt-2 inline-block">
                    curl -X POST http://localhost:3000/api/seed
                  </code>
                </div>
              )}
              {productCount > 0 && (
                <div className="p-3 bg-green-900 text-green-200 rounded">
                  ✅ Todo configurado correctamente. Ve a <a href="/marketplace" className="underline">/marketplace</a> para ver los productos
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
