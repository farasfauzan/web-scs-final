import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotButton from "@/components/shared/ChatbotButton";
import VisitorTracker from "@/components/shared/VisitorTracker";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { getAllSettings } from "@/lib/data";

export default async function PublicLayout({ children }) {
  const settings = await getAllSettings();

  return (
    // KOREKSI: Tambahkan overflow-x-hidden di div terluar ini
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      <ScrollProgressBar />
      <Navbar settings={settings} />
      <main className="flex-grow w-full">{children}</main>
      <Footer settings={settings} />
      <ChatbotButton settings={settings} />
      <VisitorTracker />
    </div>
  );
}
