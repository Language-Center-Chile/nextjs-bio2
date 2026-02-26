import MainSection from "@/components/MainSection";
import Slider from "../components/slider/Slider";
import FeaturedContent from "@/components/FeaturedContent";
import NewsSection from "@/components/NewsSection";
import Diagnostic from "@/components/layout/Diagnostic";
import DiagnosticTarget from "@/components/layout/DiagnosticTarget";
import DiagnosticIncludes from "@/components/layout/DiagnosticIncludes";
import DiagnosticPricing from "@/components/layout/DiagnosticPricing";
import DiagnosticForm from "@/components/layout/DiagnosticForm";


export default function Home() {
  return (
    <>
      {/* <Slider/>
      <MainSection/>
      <FeaturedContent/>
      <NewsSection/> */}
      <Diagnostic/>
      <DiagnosticTarget/>
      <DiagnosticIncludes/>
      <DiagnosticPricing/>
      <DiagnosticForm/>
    </>
  );
}
