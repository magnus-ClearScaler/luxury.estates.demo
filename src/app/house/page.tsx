import type { Metadata } from "next";
import { copy } from "@/lib/copy";

export const metadata: Metadata = { title: copy.house.title };

// STUB (foundation): The House, brief 6.4.
export default function HousePage() {
  return (
    <div className="container-x section">
      <h1 className="t-display">{copy.house.title}</h1>
    </div>
  );
}
