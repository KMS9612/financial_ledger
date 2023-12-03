"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./src/components/header";
import Navigation from "./src/components/navigation";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });
const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RecoilRoot>
        <body
          className={`${inter.className} relative m-auto w-screen h-screen flex flex-col justify-start items-center overflow-x-hidden`}
          style={{ minWidth: "380px", margin: "0 auto", minHeight: "100vh" }}
        >
          <Header />
          <Navigation />
          <main className="absolute w-full h-full">{children}</main>
        </body>
      </RecoilRoot>
    </html>
  );
}