import type { Metadata } from "next";
import OSPage from "@/components/os/OSPage";

export const metadata: Metadata = {
  title: "NOAH.OS — a desktop you can touch",
  description: "Boot it. Log in. Drag the windows. Noah Zixin Zhang as an operating system.",
};

export default function Page() {
  return <OSPage />;
}
