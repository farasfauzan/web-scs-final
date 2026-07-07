import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotButton from "@/components/shared/ChatbotButton";

export default function PublicLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  );
}