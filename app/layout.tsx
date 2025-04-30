import { Geist } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loader from "./loading";
import NavbarWrapper from "@/wrappers/NavbarWrapper";
import FooterWrapper from "@/wrappers/FooterWrapper";
import TopbarWrapper from "@/wrappers/TopbarWrapper";
import { Slide, ToastContainer } from "react-toastify";

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
        <TopbarWrapper />
        {/* Header */}
        <NavbarWrapper />
        {/* Children */}
        <Suspense fallback={<Loader />}>{children}</Suspense>
        {/* Footer */}
        <FooterWrapper />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="light"
          transition={Slide}
        />
        {/* <- Add Toaster here */}
      </body>
    </html>
  );
}
