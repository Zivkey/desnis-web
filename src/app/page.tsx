import Navbar from "@/components/Navbar";
import ScrollStage from "@/components/ScrollStage";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <Navbar />
      <ScrollStage />
    </main>
  );
}
