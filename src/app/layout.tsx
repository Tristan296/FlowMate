import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowMate - Streamline Your Workflow",
  description: "The ultimate productivity platform for teams and individuals. Manage tasks, automate workflows, and boost your productivity with FlowMate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
