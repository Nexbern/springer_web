import { Hero } from '@/sections/Hero';
import { LatestUpdates } from '@/sections/LatestUpdates';
import { AboutIntro } from '@/sections/AboutIntro';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { AcademicPrograms } from '@/sections/AcademicPrograms';
import { AchievementsHome } from '@/sections/AchievementsHome';
import { StudentAchievers } from '@/sections/StudentAchievers';
import { NoticeCircular } from '@/sections/NoticeCircular';
import { Facilities } from '@/sections/Facilities';
import { FacultySpotlight } from '@/sections/FacultySpotlight';
import { Testimonials } from '@/sections/Testimonials';
import { FinalCTA } from '@/sections/FinalCTA';
import BannerNoticePopup from '@/components/popups/BannerNoticePopup';
import { FloatingButtons } from '@/components/ui-custom/FloatingButtons';

export default function HomePage() {
    return (
        <main>
            <BannerNoticePopup />
            <Hero />
            <LatestUpdates />
            <AboutIntro />
            <WhyChooseUs />
            <AcademicPrograms />
            <AchievementsHome />
            <StudentAchievers />
            <NoticeCircular />
            <Facilities />
            <FacultySpotlight />
            <Testimonials />
            <FinalCTA />
            <FloatingButtons />
        </main>
    );
}
