import type { Metadata } from "next";
import Chooser from "@/components/Chooser";

export const metadata: Metadata = {
  title: "NOAH ZIXIN ZHANG — THREE STUDIES",
  description: "The studies behind the homepage. Pick one to revisit.",
};

export default function Page() {
  return <Chooser />;
}
