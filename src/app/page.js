import Hero from "../compontents/home/HeroSaction";
import SoundFamiliar from "../compontents/home/SoundFamiliar"
import Services from "../compontents/home/Services";
import WorkProcessSection from "../compontents/home/WorkProcessSection";
import FeaturesSection from "../compontents/home/FeaturesSection";
import WhoWeServe from "../compontents/home/WhoWeServe";
import WhyUs from "../compontents/home/WhyUs";
import Trust from "../compontents/home/TrustSaction";
import Clientportfolio from "../compontents/home/ClientPortfolio";
import Brand from "../compontents/home/BrandCarousel"
import Price from "../compontents/home/Price"
import AddOnSaction from "../compontents/home/AddOn"
import Testimonial from "../compontents/home/Testimonial"
import Faq from "../compontents/home/FaqSection"

export default function Home() {
  return (
  
        <div className="min-h-screen bg-white">
      <Hero /> 
      <Brand />
       <SoundFamiliar />
        <FeaturesSection />
      <Services />
       <WhoWeServe />
       <Trust />
      <Clientportfolio />
      <WorkProcessSection />
      <WhyUs />
      <Testimonial />
      <Price />
      <AddOnSaction />
      <Faq />
      </div>
    
  );
}