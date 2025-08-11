export {default} from 'next-auth/middleware'

export const config = {
  matcher: ["/publicar-producto/:path*"], // protege esa ruta (y subrutas)
};