import Hero from "./components/Hero";
import Treadmill from "./components/Treadmill";
import Pillars from "./components/Pillars";
import Testimonials from "./components/Testimonials";
import Coverage from "./components/Coverage";
import FAQ from "./components/FAQ";
import Compliance from "./components/Compliance";
import FinalCTA from "./components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Treadmill />
      <Pillars />
      <Testimonials />
      <Coverage />
      <FAQ />
      <Compliance />
      <FinalCTA />
    </main>
  );
}
