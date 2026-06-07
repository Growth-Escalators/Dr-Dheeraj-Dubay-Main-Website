import { generatePageMetadata } from "@/lib/seo.config";
import ContactSection from "@/components/ContactForm/Form2";

export const metadata = generatePageMetadata({
  title: "Contact Dr. Dheeraj Dubay | Book Appointment Jaipur",
  description: "Contact Dr. Dheeraj Dubay at Shalby Hospital Jaipur or Dr. Dubay Hip & Knee Clinic. Book your joint replacement consultation today.",
  slug: "contact",
});
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/navbar";
import GoogleMaps from "@/components/ui/map";
import GTM from "@/utils/GTM";
import React from "react";

// Organization schema with multiple contactPoints — helps Google show the
// right number for the right intent (appointments vs general).
const contactOrgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.drdubay.in/#organization",
  name: "Dr. Dheeraj Dubay — Joint Replacement Clinic",
  url: "https://www.drdubay.in",
  logo: "https://www.drdubay.in/assets/images/logonew.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-8955373205",
      contactType: "appointments",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-8955373205",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
  email: "connect@drdubay.in",
  sameAs: [
    "https://www.facebook.com/drdheerajdubay/",
    "https://www.instagram.com/dheerajdubay1/",
    "https://www.youtube.com/@dr.dheerajdubay6664",
    "https://www.linkedin.com/in/dr-dheeraj-dubay-36399599/",
  ],
};

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactOrgSchema) }}
      />
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />

        <title>Dr. Dubay</title>
        <meta
          name="description"
          content="Dr. Dheeraj Dubay, Joint and Hip Replacement Surgeon in Rajasthan"
        />

        {/* Favicon for branding */}
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>
      <Navbar />
      <ContactSection />
      <GoogleMaps />
      <Footer />
    </>
  );
};

export default page;
