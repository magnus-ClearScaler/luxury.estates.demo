import type { Metadata } from "next";
import { copy } from "@/lib/copy";

export const metadata: Metadata = { title: copy.colophon.title };

// STUB (foundation): Colophon, brief 6.6.
export default function ColophonPage() {
  return (
    <div className="container-x section">
      <h1 className="t-display">{copy.colophon.title}</h1>
    </div>
  );
}
