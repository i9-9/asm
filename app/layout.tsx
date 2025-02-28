"use client";

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/epd0xsj.css" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
