import Hero from "../../compontents/pricing/HeroSection";
import Brand from "../../compontents/home/BrandCarousel";
import PricingPlanSection from "../../compontents/pricing/PricingPlanSection";
import AddOn from "../../compontents/home/AddOn";
import PricingQuoteCTA from "../../compontents/pricing/PricingQuoteCTA";
import Testimonial from "../../compontents/home/Testimonial";
import FaqSection from "../../compontents/home/FaqSection";




export default function Home() {
  return (
  
        <div className="min-h-screen bg-white">
      <Hero /> 
      <Brand />
      <PricingPlanSection />
        <AddOn />
        <Testimonial />
      <PricingQuoteCTA />
      
      <FaqSection />
      </div>
    
  );
}