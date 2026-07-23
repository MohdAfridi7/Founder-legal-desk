import Hero from "../../compontents/about/HomeSection";
import Brand from "../../compontents/home/BrandCarousel";
import ProblemSaction from "../../compontents/about/ProblemSection";
import OriginSection from "../../compontents/about/OriginSection";
import Verifiedsection from "../../compontents/about/Verifiedsection";
import TrustSaction from "../../compontents/home/TrustSaction";
import Testimonial from "../../compontents/home/Testimonial";
import FaqSection from "../../compontents/home/FaqSection";




export default function Home() {
  return (
  
        <div className="min-h-screen bg-white">
      <Hero /> 
      <Brand />
        <ProblemSaction />
      <OriginSection />
      <Verifiedsection />
       <TrustSaction />
      <Testimonial />
      <FaqSection />
      </div>
    
  );
}