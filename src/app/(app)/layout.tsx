import Navbar from "@/components/Navbar/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
