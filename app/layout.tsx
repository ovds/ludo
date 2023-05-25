import './globals.css'
import React from "react";

export const metadata = {
  title: 'Ludo',
  description: 'Ludo created in next js and p5.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <title>Ludo</title>
        </head>
        <body>{children}</body>
    </html>
  )
}
