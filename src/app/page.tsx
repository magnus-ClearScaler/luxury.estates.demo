import { HeroFilm } from "@/components/HeroFilm";
import { copy } from "@/lib/copy";

// STUB (foundation): Home is built in brief 11.8 step 6. The hero film is in
// place so the LCP poster and the film can be checked.
export default function Home() {
  return (
    <>
      <h1 className="sr-only">{copy.home.srTitle}</h1>
      <HeroFilm />
      <div className="container-x section">
        <h2 className="t-h2">{copy.home.intro.title}</h2>
      </div>
    </>
  );
}
