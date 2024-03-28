"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import "@fontsource/noto-sans-kr";
import BodyLayout from "./src/components/layouts/bodyLayout";

const notoKR = Noto_Sans_KR({ subsets: ["latin"] });
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
        <BodyLayout
          notoFont={notoKR.className}
          children={children}
        ></BodyLayout>
      </RecoilRoot>
    </html>
  );
}
