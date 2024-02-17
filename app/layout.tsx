"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./src/components/header";
import Navigation from "./src/components/navigation";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });
const metadata: Metadata = {
  title: "가계부",
  description: "간단, 간편한 가계부",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <RecoilRoot>
        <body
          className={`${inter.className} relative m-auto w-screen m-h-screen flex flex-col justify-start items-center overflow-x-hidden`}
          style={{ minWidth: "380px", margin: "0 auto" }}
        >
          <Header />
          <Navigation />
          <main className="absolute w-full m-h-full">{children}</main>
        </body>
      </RecoilRoot>
    </html>
  );
}
