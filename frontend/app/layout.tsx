import { ReactNode } from "react";
import "@styles/tailwind.css";
import "@styles/app.scss";
import { AuthContextProvider } from "context/Auth";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
