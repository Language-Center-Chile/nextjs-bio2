import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Aquí puedes agregar lógica adicional si necesitas
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    // Proteger estas rutas (requieren autenticación)
    "/perfil/:path*",
    "/mis-productos/:path*",
    "/dashboard/:path*",
    "/api/productos/:path*",
    "/publicar/:path*",
    "/comprar/:path*"
  ]
}
