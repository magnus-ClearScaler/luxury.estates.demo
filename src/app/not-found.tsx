import { copy } from "@/lib/copy";

// STUB (foundation): 404, brief 6.7.
export default function NotFound() {
  return (
    <div className="container-x section">
      <h1 className="t-h2">{copy.notFound.title}</h1>
    </div>
  );
}
