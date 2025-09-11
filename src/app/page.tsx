import Image from "next/image";
import  HeroSection  from "./components/home/Slider";
import Assessments from "./components/home/Assessments";
import Blogs from "./components/home/Blogs";
import Categories from "./components/home/Categories";
import Counsellors from "./components/home/Counsellors";
import Services from "./components/home/Services";
import Testimonials from "./components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <Counsellors />
      <Assessments />
      <Services />
      <Categories />
      <Blogs />
      <Testimonials />
    </>
  );
}
