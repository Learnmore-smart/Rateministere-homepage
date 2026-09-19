import type { Metadata } from "next";
import AtlasPage from "@/components/atlas/AtlasPage";

export const metadata: Metadata = {
  title: "FIELD NOTES — Noah Zixin Zhang",
  description: "A homepage surveyed as an expedition map. Descend with the page.",
};

export default function Page() {
  return <AtlasPage />;
}
