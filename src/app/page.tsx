import ModernHero from "./components/home/ModernHero";
import HomeValueStrip from "./components/home/HomeValueStrip";
import HeroSection from "./components/home/Slider";
import Assessments from "./components/home/Assessments";
import Blogs from "./components/home/Blogs";
import Categories from "./components/home/Categories";
import Counsellors from "./components/home/Counsellors";
import Services from "./components/home/Services";
import Testimonials from "./components/home/Testimonials";
import FeaturesSection from "./components/home/FeaturesSection";
import CollegeShowcase from "./components/home/CollegeShowcase";
import CTASection from "./components/home/CTASection";

export default function Home() {
  return (
    <main className="bg-slate-50">
      <ModernHero />
      <HomeValueStrip />

      <div className="pt-10">
        <FeaturesSection />
      </div>

      <HeroSection />
      <Services />
      <Assessments />
      <Counsellors />
      <CollegeShowcase />
      <Categories />
      <Blogs />
      <Testimonials />
      <CTASection />
    </main>
  );
}
