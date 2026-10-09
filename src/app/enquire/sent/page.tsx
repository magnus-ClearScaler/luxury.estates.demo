import type { Metadata } from "next";
import { copy } from "@/lib/copy";

export const metadata: Metadata = { title: copy.enquire.title };

// STUB (foundation): Confirmation, brief 6.5.
export default function SentPage() {
  return (
    <div className="container-x section">
      <h1 className="t-display">{copy.enquire.sent.title}</h1>
    </div>
  );
}
