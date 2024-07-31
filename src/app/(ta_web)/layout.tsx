"use client";

import { PropsWithChildren } from "react";

import NavBar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/toaster";
import TansTackProvider from "@/plugins/tanstack.provider";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <TansTackProvider>
      <main className="bg-lightbg-200 min-h-screen">
        <NavBar />
        <Toaster />
        {children}
      </main>
    </TansTackProvider>
  );
};

export default Layout;
