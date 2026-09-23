import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { ContactSection } from "@/components/contact-section";
import { EngineeringNotes } from "@/components/engineering-notes";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { PrivateWork } from "@/components/private-work";
import { Proof } from "@/components/proof";
import { SelectedWork } from "@/components/selected-work";
import { Skills } from "@/components/skills";
import { homeStructuredData } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <Hero />
      <div className="reveal">
        <SelectedWork />
      </div>
      <div className="reveal">
        <Approach />
      </div>
      <div className="reveal">
        <ExperienceTimeline />
      </div>
      <div className="reveal">
        <Skills />
      </div>
      <div className="reveal">
        <About />
      </div>
      <div className="reveal">
        <PrivateWork />
      </div>
      <div className="reveal">
        <Proof />
      </div>
      <div className="reveal">
        <EngineeringNotes />
      </div>
      <Faq />
      <ContactSection />
    </>
  );
}
