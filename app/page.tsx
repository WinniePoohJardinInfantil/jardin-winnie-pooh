import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sedes from "@/components/Sedes";
import Servicios from "@/components/Servicios";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Sedes />
      <Servicios />
    </main>
  );
}