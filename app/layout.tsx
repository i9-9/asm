import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASSEMBLY",
  description: "DES/DEV ST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/epd0xsj.css"
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
