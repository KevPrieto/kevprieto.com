"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "./FloatingCTA";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
