"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/features/layout/footer";

export default function ConditionalFooter() {
  const pathname = usePathname() || "";

  const isAdminRoute = pathname.toLowerCase().includes("admin");

  if (isAdminRoute) return null;
  return <Footer />;
}
