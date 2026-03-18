import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import GoogleReviews from "@/components/GoogleReviews";
import DashboardResultsSection from "@/components/DashboardResultsSection";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <ServicesGrid />
      <DashboardResultsSection />
      <GoogleReviews />
      <WhyChooseUs />
      <Process />
      <Pricing />
      <LeadForm />
      <FAQ />
    </main>
    <Footer />
  </>
);

export default Index;
