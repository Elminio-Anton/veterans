import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'e-veterans',
  description: 'hackaton',
}

export default function RootLayout({
  children,...rest
}: {
  children: React.ReactNode
}) {
  //console.log(rest);
  return (
    <html lang="en">
      <body /* className={inter.className} */>{children}</body>
    </html>
  )
}
