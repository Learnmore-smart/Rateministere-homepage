import type { Metadata } from "next";
import ArcadePage from "@/components/arcade/ArcadePage";

export const metadata: Metadata = {
  title: "Study — Noah Fighters '26 | Noah Zixin Zhang",
  description: "Homepage concept: a fighting-game select screen. Pick your file.",
};

export default function Page() {
  return <ArcadePage />;
}
