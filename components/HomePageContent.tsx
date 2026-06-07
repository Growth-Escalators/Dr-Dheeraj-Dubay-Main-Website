"use client";

import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero2 from "@/components/Hero2/Hero2";
import { Stats } from "@/components/Stats/Stats";
import { Testimonial } from "@/components/Testimonials/Testimonial";
import Services from "@/components/Services/Services";
import Form from "@/components/ContactForm/Form2";
import Card1 from "@/components/ProfileCard/Card1";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import ReviewCard from "@/components/Carousel/ReviewCard";
import Booknow from "@/components/Booknow/Booknow";
import GoogleMaps from "@/components/ui/map";
import Certificate from "@/components/Certificate/Certificate";
import GTM from "@/utils/GTM";
import Certificate2 from "@/components/Certificate/Certificate2";
import AchievementCollage from "@/components/Achievements/AchievementCollage";
import UKHonour from "@/components/UKHonour/UKHonour";
import ETAward from "@/components/ETAward/ETAward";
import FeaturedAchievementsSection from "@/components/Achievements/FeaturedAchievementsSection";
import LatestEvents from "@/components/home/LatestEvents";
import LatestBlogs from "@/components/home/LatestBlogs";
import WrittenTestimonials from "@/components/home/WrittenTestimonials";
import SpecialtiesHighlight from "@/components/home/SpecialtiesHighlight";
import LatestPodcasts from "@/components/home/LatestPodcasts";
import { PROCEDURE_PAGES } from "@/lib/procedure-pages";
import { CONDITION_PAGES } from "@/lib/condition-pages";
import { HINDI_PAGES } from "@/lib/hindi-pages";

type FeaturedAchievement = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  imageUrl: string;
};

interface HomePageContentProps {
  featuredAchievements?: FeaturedAchievement[];
  services?: any[];
}

export default function HomePageContent({ featuredAchievements = [], services = [] }: HomePageContentProps) {
  React.useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <head>
        <GTM gtmId="GTM-MDF4W4JT" />
        <link rel="icon" href="/assets/images/logonew.png" />
      </head>
      {/* 1. Hero */}
      <Card1 />
      {/* 2. Stats */}
      <Stats />
      {/* 3. Services */}
      {services.length > 0 && <Services services={services} />}
      {/* 3b. Specialties Highlight */}
      <SpecialtiesHighlight />
      {/* 3c. Procedures We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
              Advanced Procedures
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Surgical Procedures We Specialise In
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From robotic knee replacement to minimally invasive hip surgery — explore all procedures offered by Dr. Dheeraj Dubay
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCEDURE_PAGES.map(p => (
              <a key={p.slug} href={`/procedures/${p.slug}`}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group">
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">
                  {p.category}
                </p>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {p.intro.slice(0, 100)}...
                </p>
                <span className="text-blue-600 text-sm font-semibold mt-3 inline-block">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3d. Conditions We Treat */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
              Conditions
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Conditions We Treat
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Expert diagnosis and treatment for all causes of knee and hip pain
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CONDITION_PAGES.map(p => (
              <a key={p.slug} href={`/conditions/${p.slug}`}
                className="bg-amber-50 rounded-xl p-4 border border-amber-100 hover:border-amber-300 hover:bg-amber-100 transition-all text-center group">
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-amber-800 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-amber-600 mt-1">
                  Learn about treatment →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3e. हिंदी में जानकारी */}
      <section className="py-12 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-2xl mb-2 inline-block">🇮🇳</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              हिंदी में जानकारी
            </h2>
            <p className="text-gray-500 text-sm">
              घुटना और कूल्हा प्रत्यारोपण की पूरी जानकारी हिंदी में
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {HINDI_PAGES.map(p => (
              <a key={p.slug} href={`/hindi/${p.slug}`}
                className="bg-white rounded-xl p-4 border border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all group">
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-orange-700 transition-colors leading-relaxed">
                  {p.h1.split('—')[0].trim()}
                </h3>
                <span className="text-orange-600 text-xs mt-2 inline-block">
                  पढ़ें →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Achievements */}
      <FeaturedAchievementsSection achievements={featuredAchievements} />
      <AchievementCollage />
      <UKHonour />
      <ETAward />
      {/* 5. Latest Events */}
      <LatestEvents />
      {/* 6. Written testimonials */}
      <WrittenTestimonials />
      {/* 6b. Testimonials carousel */}
      <Testimonial />
      {/* 7. Blog preview */}
      <LatestBlogs />
      {/* 7b. Podcasts */}
      <LatestPodcasts />
      {/* 8. CTA */}
      <Booknow />
      {/* Remaining content */}
      <Hero2 />
      <Certificate2 />
      <Certificate />
      <WhyChoose />
      <GoogleMaps />
      <Form />
    </div>
  );
}
