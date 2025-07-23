import MainSection from "@/components/MainSection";
import Slider from "../components/slider/Slider";
import FeaturedContent from "@/components/FeaturedContent";
import NewsSection from "@/components/NewsSection";


export default function Home() {
  return (
    <>
      <Slider/>
      <MainSection/>
      <FeaturedContent/>
      <NewsSection/>
    </>
  );
}
