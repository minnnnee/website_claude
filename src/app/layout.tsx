import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "감성도배 | 남양주 도배 아파트 시공 전문",
  description: "세심한 여성 도배사의 손길로 당신의 공간을 아름답게 변화시켜드립니다. 아파트, 주택 도배 전문 감성도배입니다.",
  keywords: "도배, 여성도배사, 아파트도배, 인테리어, 감성도배, 벽지시공, 남양주도배",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "감성도배 | 남양주 도배 아파트 시공 전문",
    description: "세심한 여성 도배사의 손길로 당신의 공간을 아름답게 변화시켜드립니다.",
    type: "website",
    images: [
      {
        url: "https://website-claude-brown.vercel.app/begienew.jpg",
        width: 1200,
        height: 800,
        alt: "감성도배 시공 사례",
      },
    ],
  },
  verification: {
    other: {
      'naver-site-verification': 'a3099df3b6c0fad2cbc2079317de4f3d217c692d',
    },
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
