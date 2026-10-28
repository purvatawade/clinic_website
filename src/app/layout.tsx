import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Dhanwantri Clinic | Dr. Sarika B. Singh (B.A.M.S.) | Mira Road East",
  description:
    "Official website of Dhanwantri Clinic led by Dr. Sarika B. Singh (B.A.M.S.), Family Physician & Surgeon in Mira Road East, Thane. OPD Timings: 11 AM - 2 PM & 6:30 PM - 9:30 PM.",
  keywords: [
    "Dhanwantri Clinic",
    "Dr Sarika B Singh",
    "Dr Sarika Singh Mira Road",
    "Clinic in Mira Road East",
    "Family Physician Mira Road",
    "Panchakarma Mira Road",
    "Ayurvedic Doctor Thane",
  ],
  openGraph: {
    title: "Dhanwantri Clinic - Dr. Sarika B. Singh",
    description: "Family Physician & Ayurvedic Care in Mira Road East, Thane.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#faf7f2]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}