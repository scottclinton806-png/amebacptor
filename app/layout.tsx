export default function RootLayout({ children }: { children: React.ReactNode }) { return ( <html lang="en">
  <head>
  <link rel="manifest" href="/manifest.json" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </head>
  <body>{children}</body></html> ) }
