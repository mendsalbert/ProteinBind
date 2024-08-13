"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      {/* <script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script> */}
      <script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script>
      <body suppressHydrationWarning={true}>
        <div className="font-poppins dark:bg-boxdark-2 dark:text-bodydark ">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
