import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "감성도배 | Designing Spaces, Crafting Emotions",
  description: "세심한 여성 도배사의 손길로 당신의 공간을 아름답게 변화시켜드립니다. 아파트, 주택 도배 전문 감성도배입니다.",
  keywords: "도배, 여성도배사, 아파트도배, 인테리어, 감성도배, 벽지시공",
  openGraph: {
    title: "감성도배 | Designing Spaces, Crafting Emotions",
    description: "세심한 여성 도배사의 손길로 당신의 공간을 아름답게 변화시켜드립니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
