import type { Metadata } from "next";
import { georama, robotoMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Youssef Halim's Portfolio",
  description:
    "A portfolio showcasing the projects and skills of Youssef Halim, a software developer specializing in web development and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${georama.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
