"use client";

import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";
import LoadingOverlay from "@/components/loading/LoadinOverlay";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <Providers>
          <LoadingOverlay>{children}</LoadingOverlay> 
        </Providers>
      </body>
    </html>
  );
}


