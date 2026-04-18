import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sedes from "@/components/Sedes";
import Servicios from "@/components/Servicios";
import Galeria from "@/components/Galeria";
import Resenas from "@/components/Resenas";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Sedes />
      <Servicios />
      <Galeria />
      <Resenas />
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}