import "../styles/globals.css";

export const metadata = {
  title: "Link in Bio",
  description: "Kirka-style link page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <div className="grid" />
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}
