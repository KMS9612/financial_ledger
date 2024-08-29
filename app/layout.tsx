import type { Metadata } from "next";
import "./globals.css";
import BodyLayout from "./src/layouts/bodyLayout";
import RecoilRootComp from "./src/layouts/recoilRooteComp";

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
    <html
      lang="ko"
      className="w-screen h-screen flex justify-center items-center"
    >
      <RecoilRootComp>
        <BodyLayout>{children}</BodyLayout>
      </RecoilRootComp>
    </html>
  );
}
