import Hero from "../../compontents/resources/HeroSection";
import Brand from "../../compontents/home/BrandCarousel";
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