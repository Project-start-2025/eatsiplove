import Header from "./components/header/Header";
import Topbar from "./components/Topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        <Header />
        {children}
      </body>
    </html>
  );
}
