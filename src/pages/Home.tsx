import { Hero } from '@/sections/Hero';
import { LatestUpdates } from '@/sections/LatestUpdates';
import { AboutIntro } from '@/sections/AboutIntro';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { AcademicPrograms } from '@/sections/AcademicPrograms';
import { AchievementsHome } from '@/sections/AchievementsHome';
import { NoticeCircular } from '@/sections/NoticeCircular';
import { Facilities } from '@/sections/Facilities';
import { FacultySpotlight } from '@/sections/FacultySpotlight';
import { Testimonials } from '@/sections/Testimonials';
import { FinalCTA } from '@/sections/FinalCTA';

export function Home() {
  return (
    <main>
      <Hero />
      <LatestUpdates />
      <AboutIntro />
      <WhyChooseUs />
      <AcademicPrograms />
      <AchievementsHome />
      <NoticeCircular />
      <Facilities />
      <FacultySpotlight />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
