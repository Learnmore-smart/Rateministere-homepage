import type { Metadata } from "next";
import StackPage from "@/components/stack/StackPage";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "NOAH ZIXIN ZHANG · The Stack",
  description:
    "The light-and-sleek homepage in the supastack dialect. Archived study, previously at /.",
};

export default function Page() {
  return (
    <LanguageProvider>
      <StackPage />
    </LanguageProvider>
  );
}
