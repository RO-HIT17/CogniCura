import "@/styles/globals.css";
import { Viewport } from "next";
import  DocNavbar  from "@/components/docnavbar";
import { Providers } from "../providers";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function DoctorAppointementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div className="relative flex flex-col h-screen">
      <DocNavbar />
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          {children}
        </main>
      </div>
    </Providers>
  );
}
