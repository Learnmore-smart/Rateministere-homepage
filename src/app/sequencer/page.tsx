import { redirect } from "next/navigation";

// Session 026 was promoted to `/` — keep the old study URL working.
export default function Page() {
  redirect("/");
}
