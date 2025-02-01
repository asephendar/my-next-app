import './globals.css'

export const metadata = {
  title: 'Login',
  description: 'Halaman Login',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body>{children}</body>
    </html>
  )
}