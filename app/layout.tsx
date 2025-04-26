import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Footer from "@/common/Footer";
import Navbar from "@/common/Navbar";
import Topbar from "@/common/Topbar";
import { Suspense } from "react";
import Loader from "./loading";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Los Alamos Laboratory",
  description:
    "Los Alamos Laboratory is a lab test booking platform where users can schedule medical tests, track appointments, and securely access their reports online.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground" cz-shortcut-listen="true">
        {/* Topbar */}
        <Topbar />
        {/* Header */}
        <Navbar />
        {/* Children */}
        <Suspense fallback={<Loader/>}>
        {children}
        </Suspense>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
