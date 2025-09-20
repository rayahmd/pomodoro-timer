import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ['400', '700', '900'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "for studying",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
