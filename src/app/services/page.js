import Hero from "../../compontents/services/HeroSection";
import Brand from "../../compontents/home/BrandCarousel";
import ServicesCoverageSection from "../../compontents/services/ServicesCoverageSection";
import WhoWeServe from "../../compontents/home/WhoWeServe";
import Testimonial from "../../compontents/home/Testimonial";
import FaqSection from "../../compontents/home/FaqSection";




export default function Home() {
  return (
  
        <div className="min-h-screen bg-white">
      <Hero />
      <Brand />
      <ServicesCoverageSection />
        <WhoWeServe />
        <Testimonial />
      <FaqSection />
      </div>
    
  );
}