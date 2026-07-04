import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "駒場検定",
  description: "駒場キャンパスに関する4択クイズで「駒場理解度」を診断しよう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-amber-50 font-sans">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col bg-white shadow-xl sm:my-6 sm:rounded-3xl sm:min-h-0">
          {children}
        </div>
      </body>
    </html>
  );
}
