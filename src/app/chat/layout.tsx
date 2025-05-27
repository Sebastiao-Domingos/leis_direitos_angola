// components/Layout.jsx (example)
import VerticalMenu from "@/components/menubar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {" "}
      {/* Use a light background for the whole page */}
      <VerticalMenu />
      <main className="flex-grow p-8">
        {children} {/* This will be your page content (e.g., chat window) */}
      </main>
    </div>
  );
};

export default Layout;
