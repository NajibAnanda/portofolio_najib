import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: false,
  loading: () => <div className="section-shell py-20 text-[var(--muted-foreground)]">Loading tech stack...</div>,
});

const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
  loading: () => <div className="section-shell py-20 text-[var(--muted-foreground)]">Loading projects...</div>,
});

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
