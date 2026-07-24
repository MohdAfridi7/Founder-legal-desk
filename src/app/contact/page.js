import Hero from "../../compontents/contact/HeroSection";
import Brand from "../../compontents/home/BrandCarousel";
import FormSection from "../../compontents/contact/FormSection";
import Testimonial from "../../compontents/home/Testimonial";
import FaqSection from "../../compontents/home/FaqSection";




export default function Home() {
  return (
  
        <div className="min-h-screen bg-white">
      <Hero /> 
      <Brand />
    <FormSection />
      <Testimonial />
      <FaqSection />
      </div>
    
  );
}