import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import HeroSequence from "@/components/HeroSequence";
import FeatureGrid from "@/components/FeatureGrid";
import NetworkVisualizer from "@/components/NetworkVisualizer";
import OperationsShowcase from "@/components/OperationsShowcase";
import MetricsSection from "@/components/MetricsSection";
import FinalCTA from "@/components/FinalCTA";
import ScanDivider from "@/components/ScanDivider";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <HeroSection />
      <Marquee />
      <HeroSequence />
      <FeatureGrid />
      <NetworkVisualizer />
      <ScanDivider />
      <TestimonialsSection />
      <ScanDivider />
      <OperationsShowcase />
      <MetricsSection />
      <FinalCTA />
    </main>
  );
}
