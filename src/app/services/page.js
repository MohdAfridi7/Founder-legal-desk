import Hero from "../../compontents/services/HeroSection";
import Brand from "../../compontents/home/BrandCarousel";
import Servicescoveragesection from "../../compontents/services/Servicescoveragesection";
import WhoWeServe from "../../compontents/home/WhoWeServe";
import Testimonial from "../../compontents/home/Testimonial";
import FaqSection from "../../compontents/home/FaqSection";




export default function Home() {
  return (
  
        <div className="min-h-screen bg-white">
      <Hero />
      <Brand />
      <Servicescoveragesection />
        <WhoWeServe />
        <Testimonial />
      <FaqSection />
      </div>
    
  );
}