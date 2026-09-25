import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar planCount={0} savedCount={0} />
        {children}
      </body>
    </html>
  );
}