import type { Metadata } from "next";
import { copy } from "@/lib/copy";

export const metadata: Metadata = { title: copy.enquire.title };

// STUB (foundation): Enquire, brief 6.5. Read `?house=slug` from the
// searchParams Promise to preselect the house.
export default function EnquirePage() {
  return (
    <div className="container-x section">
      <h1 className="t-display">{copy.enquire.title}</h1>
    </div>
  );
}
