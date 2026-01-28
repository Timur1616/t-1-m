import "./styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Link in Bio • Kirka Style",
  description: "Kirka style link-in-bio with admin panel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="grid" />
        {children}
      </body>
    </html>
  );
}
