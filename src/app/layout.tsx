import Header from "./components/header/Header";
import Topbar from "./components/Topbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Topbar />
        <Header />
        {children}
      </body>
    </html>
  );
}