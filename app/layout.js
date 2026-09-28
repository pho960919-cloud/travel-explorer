import "./globals.css";

export const metadata = {
  title: "Trip Atlas — 여행을 고르는 가장 쉬운 방법",
  description: "누구와 떠날지, 어디로 갈지 카드로 탐색하는 여행 가이드"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
