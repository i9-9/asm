import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Módulos Studio",
  description: "The Design & Development Studio",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`transition-colors duration-300`}>
        <div id="app-wrapper">{children}</div>
      </body>
    </html>
  );
}
