import { prisma } from "@/lib/prisma";
import HubungiKamiClient from "@/components/views/hubungi-kami/HubungiKamiClient";

export const revalidate = 3600; // Cache 1 jam

export default async function HubungiKamiPage() {
  const contacts = await prisma.contact.findMany();
  return <HubungiKamiClient initialContacts={contacts} />;
}
