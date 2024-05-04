import type { Metadata } from "next";
import "./globals.css";
import BodyLayout from "./src/components/layouts/bodyLayout";

export const metadata: Metadata = {
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
      <BodyLayout>{children}</BodyLayout>
    </html>
  );
}
