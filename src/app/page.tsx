import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import Dock from "@/components/Dock";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  );
}
