import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ASM",
  description: "Assembly Studio",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vvz1rns.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={`transition-colors duration-300`}>
        <div id="app-wrapper">{children}</div>
      </body>
    </html>
  );
}
