import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product admin",
  description: "Product admin app for DummyJSON products",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-white text-zinc-900 antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-900">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <div id="content" className="flex min-h-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
