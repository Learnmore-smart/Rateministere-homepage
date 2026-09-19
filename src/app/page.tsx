import type { Metadata } from "next";
import SequencerPage from "@/components/sequencer/SequencerPage";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "NOAH ZIXIN ZHANG — session_026",
  description:
    "Creative developer and creator of Noah's Piano Journey. The homepage as a DAW session — every section is a track and the playhead never stops.",
};

export default function Home() {
  return (
    <LanguageProvider>
      <SequencerPage />
    </LanguageProvider>
  );
}
