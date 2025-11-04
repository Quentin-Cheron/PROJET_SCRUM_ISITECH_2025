"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/features/layout/header";

export default function ConditionalHeader() {
  const pathname = usePathname() || "";

  const isAdminRoute = pathname.toLowerCase().includes("admin");

  if (isAdminRoute) return null;
  return <Header />;
}