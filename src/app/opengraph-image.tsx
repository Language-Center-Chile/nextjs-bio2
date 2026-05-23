import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logoPath = join(process.cwd(), 'public', 'assets', 'LogotipoBlanco.png')
  const logoData = await readFile(logoPath)
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
        }}
      >
        <img
          src={logoBase64}
          alt="Bio2 Biodiversidad"
          width={500}
          height={250}
          style={{ objectFit: 'contain' }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 32,
            color: '#22c55e',
            fontWeight: 600,
          }}
        >
          Plataforma Sustentable
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
