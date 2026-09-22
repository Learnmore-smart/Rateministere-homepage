import type { Metadata } from "next";
import SequencerPage from "@/components/sequencer/SequencerPage";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "NOAH ZIXIN ZHANG — session_026",
  description:
    "The homepage as a DAW session — every section is a track and the playhead never stops. Archived study, previously at /.",
};

export default function Page() {
  return (
    <LanguageProvider>
      <SequencerPage />
    </LanguageProvider>
  );
}
