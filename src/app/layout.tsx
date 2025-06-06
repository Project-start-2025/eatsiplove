// app/layout.tsx (hay file layout bạn đang dùng)
import "./globals.css";
import Header from "./components/header/Header";
import Topbar from "./components/Topbar";
import { UserProvider } from "./Context/UserContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body style={{ margin: 0, padding: 0 }}>
        <UserProvider>
          <Topbar />
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}