import Image from "next/image";
import { ButtonPrimary, SearchScrape } from "./components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-semibold mb-10">Contact Americas</h1>
      <SearchScrape />
    </main>
  );
}
