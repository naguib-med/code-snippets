import { ModeToggle } from "@/components/mode-toggle";
import { SearchBar } from "@/components/search-bar";

export default function Home() {
  return (
    <div className="container mx-auto">
      <ModeToggle />

      <h1>Home</h1>

      <SearchBar />
    </div>
  );
}
