'use client'
import "./globals.css";
import CustomHeader from "../components/CustomHeader";
import { Toaster } from 'sonner';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    >
    <head>
        <title>MyBank Frontend</title>
    </head>
    <body
        className={` relative antialiased grid grid-rows-[auto_1fr] h-screen`}
      >
      <CustomHeader />
      <main className="overflow-auto">
        {children}
      <Toaster position="top-right" richColors />
      </main>
      </body>
    </html>
  );
}
