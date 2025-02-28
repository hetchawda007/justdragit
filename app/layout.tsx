import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Just-drag-it : Your own task manager",
  description: "Just-drag-it is a task manager that helps you to manage your tasks in a better way.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-neutral-900 antialiased overflow-y-hidden`}
      >
          {children}
      </body>
    </html>
  );
}
