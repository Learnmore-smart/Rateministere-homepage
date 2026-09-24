import type { Metadata } from "next";
import StackPage from "@/components/stack/StackPage";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "NOAH ZIXIN ZHANG — Creative Developer",
  description:
    "Code in production. Piano in public. Noah Zixin Zhang builds supastack, LearnX and OpenNotes — and runs Noah's Piano Journey, a channel twelve million views deep.",
};

export default function Home() {
  return (
    <LanguageProvider>
      <StackPage />
    </LanguageProvider>
  );
}
