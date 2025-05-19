import './globals.css';
import Header from "./components/header/Header";
import Topbar from "./components/Topbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <Topbar />
        <Header />
        {children}
      </body>
    </html>
  );
}