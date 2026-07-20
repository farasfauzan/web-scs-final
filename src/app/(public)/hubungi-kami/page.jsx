import { prisma } from "@/lib/prisma";
import HubungiKamiClient from "@/components/views/hubungi-kami/HubungiKamiClient";

export const revalidate = 3600; // Cache 1 jam

// INJEKSI METADATA
export const metadata = {
  title: "Hubungi Kami",
  description:
    "Punya pertanyaan atau rencana proyek? Hubungi tim PT Sinar Cerah Sempurna untuk konsultasi lebih lanjut.",
};

export default async function HubungiKamiPage() {
  const contacts = await prisma.contact.findMany();
  return <HubungiKamiClient initialContacts={contacts} />;
}
