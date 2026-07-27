  import Hero from "../compontents/home/HeroSection";
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
const homeFaqs = [
  {
    q: 'What exactly does Founders Legal Desk do?',
    a: 'We prepare, review, and deliver business documents — contracts, agreements, policies, and compliance paperwork — for incorporated Indian businesses. Every document is verified by a qualified specialist before delivery. You get a fixed-price monthly package or a single-document quote, with delivery within 48 hours.',
  },
  {
    q: 'Who prepares my documents?',
    a: 'Your documents are prepared and reviewed by qualified specialists from our empaneled panel. Each specialist reviews the document personally and verifies it before its delivered to you.',
  },
  {
    q: "What does 'verified' mean?",
    a: 'Every document delivered through Founders Legal Desk is reviewed by a qualified specialist who checks it for accuracy, enforceability, and completeness — and takes personal responsibility for the work. This is different from a template download, where no professional has reviewed what you re signing.',
  },
  {
    q: 'How is this different from downloading a template?',
    a: "A downloaded template is a generic format. It has not been reviewed for your specific situation, your industry, or the current legal environment in India. Our documents are reviewed by a qualified specialist for your specific business context. If a clause is wrong for your situation, we change it.",
  },
   {
    q: 'What if I\'m not sure which plan I need?',
    a: "Book a free consultation. We'll review your situation and tell you exactly what you need — including whether a plan makes sense or a single-document quote is better for you.",
  },
];
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
    <Faq
  title="Frequently Asked Questions"
  subtitle="Everything you need to know"
  faqs={homeFaqs}
/>
        </div>
      
    );
  }