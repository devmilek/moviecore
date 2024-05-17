import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import "moment/locale/pl";
import moment from "moment";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Moviecore",
    default: "Moviecore - Twoja baza filmów i seriali",
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  moment.locale(locale);
  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <Navbar />
        <main className="overflow-x-hidden overflow-y-hidden py-20">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
