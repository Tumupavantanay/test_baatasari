import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Campus Connect — Student Dashboard",
  description:
    "Your all-in-one student hub: explore events, join clubs, track registrations, and stay connected with campus life.",
  keywords: ["campus", "student", "events", "clubs", "college dashboard"],
  authors: [{ name: "Campus Connect" }],
  openGraph: {
    title: "Campus Connect — Student Dashboard",
    description: "Your all-in-one student hub for campus life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-full bg-[#F8F6F0] text-[#0C1E3C]">
        {children}
      </body>
    </html>
  );
}
