import type { Metadata } from "next";
import { copy } from "@/lib/copy";

export const metadata: Metadata = { title: copy.estates.title };

// STUB (foundation): Estates index, brief 6.2.
export default function EstatesPage() {
  return (
    <div className="container-x section">
      <h1 className="t-display">{copy.estates.title}</h1>
    </div>
  );
}
