import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyCertinal from "@/components/WhyCertinal";
import Keynote from "@/components/Keynote";
import BoothShowcase from "@/components/BoothShowcase";
import WhoShouldVisit from "@/components/WhoShouldVisit";
import Proof from "@/components/Proof";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhyCertinal />
        <Keynote />
        <BoothShowcase />
        <WhoShouldVisit />
        <Proof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;