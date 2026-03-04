import Diagnostic from "@/components/layout/Diagnostic";
import DiagnosticTarget from "@/components/layout/DiagnosticTarget";
import DiagnosticIncludes from "@/components/layout/DiagnosticIncludes";
import DiagnosticPricing from "@/components/layout/DiagnosticPricing";
import DiagnosticForm from "@/components/layout/DiagnosticForm";

export default function LandingPage() {
  return (
    <>
      <Diagnostic/>
      <DiagnosticTarget/>
      <DiagnosticIncludes/>
      <DiagnosticPricing/>
      <DiagnosticForm/>
    </>
  );
}