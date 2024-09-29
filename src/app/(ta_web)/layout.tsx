"use client";

import { PropsWithChildren } from "react";

import NavBar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/toaster";
import TansTackProvider from "@/plugins/tanstack.provider";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <TansTackProvider>
      <NavBar />
      <main className="mt-28 flex-grow flex flex-col">{children}</main>
      <Toaster />
    </TansTackProvider>
  );
};

export default Layout;
