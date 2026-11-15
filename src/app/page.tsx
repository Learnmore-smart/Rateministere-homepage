import type { Metadata } from "next";
import RollPage from "@/components/roll/RollPage";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "NOAH ZIXIN ZHANG · Creative Developer",
  description:
    "Code in production. Piano in public. Noah Zixin Zhang builds supastack, LearnX, Cairn, SpinShare, BLADE, Pluto, Vorlee and FkLearn, and runs Noah's Piano Journey, a channel fourteen million views deep.",
};

export default function Home() {
  return (
    <LanguageProvider>
      <RollPage />
    </LanguageProvider>
  );
}
