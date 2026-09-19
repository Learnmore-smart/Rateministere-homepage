import type { Metadata } from "next";
import RecitalPage from "@/components/recital/RecitalPage";

export const metadata: Metadata = {
  title: "THE RECITAL — Noah Zixin Zhang",
  description: "A homepage staged as a concert programme. Noah's Piano Journey headlines.",
};

export default function Page() {
  return <RecitalPage />;
}
