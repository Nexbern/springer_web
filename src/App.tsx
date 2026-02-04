import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Academics } from '@/pages/Academics';
import { STEM } from '@/pages/STEM';
import { Achievements } from '@/pages/Achievements';
import { Admissions } from '@/pages/Admissions';
import { Notices } from '@/pages/Notices';
import { NewsDetails } from '@/pages/NewsDetails';
import { FeesStructure } from '@/pages/FeesStructure';
import { Contact } from '@/pages/Contact';
import { schoolInfo } from '@/data/siteData';

// SEO Component
function SEO({ title, description }: { title: string; description: string }) {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = `https://springerpublicschool.edu.in${location.pathname}`;
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description, location]);

  return null;
}

// Page wrapper with SEO
function PageWrapper({
  children,
  title,
  description
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <>
      <SEO title={title} description={description} />
      {children}
    </>
  );
}

function App() {
  const defaultTitle = `${schoolInfo.name} - CBSE Affiliated School in India`;
  const defaultDescription = `${schoolInfo.name} offers quality CBSE education with modern facilities, expert faculty, and holistic development programs. Admissions open for 2025-26.`;

  return (
    <Router>
      <div className="min-h-screen bg-springer-white">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper
                title={defaultTitle}
                description={defaultDescription}
              >
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper
                title={`About Us - ${schoolInfo.name}`}
                description={`Learn about ${schoolInfo.name}'s vision, mission, and 30+ years of excellence in education. Discover our core values and world-class campus.`}
              >
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/academics"
            element={
              <PageWrapper
                title={`Academics - ${schoolInfo.name}`}
                description={`Explore our CBSE curriculum, teaching methodology, and academic programs from Pre-Primary to Senior Secondary at ${schoolInfo.name}.`}
              >
                <Academics />
              </PageWrapper>
            }
          />
          <Route
            path="/stem"
            element={
              <PageWrapper
                title={`STEM & Skill Development - ${schoolInfo.name}`}
                description={`Discover our cutting-edge STEM programs including Robotics, Coding, AI Awareness, and Project-based Learning at ${schoolInfo.name}.`}
              >
                <STEM />
              </PageWrapper>
            }
          />
          <Route
            path="/achievements"
            element={
              <PageWrapper
                title={`Achievements - ${schoolInfo.name}`}
                description={`Celebrate excellence with ${schoolInfo.name}'s achievements in academics, sports, olympiads, and inter-school competitions.`}
              >
                <Achievements />
              </PageWrapper>
            }
          />
          <Route
            path="/admissions"
            element={
              <PageWrapper
                title={`Admissions - ${schoolInfo.name}`}
                description={`Apply for admission at ${schoolInfo.name}. Simple 5-step process. Admissions open for academic year 2025-26. Limited seats available.`}
              >
                <Admissions />
              </PageWrapper>
            }
          />
          <Route
            path="/notices"
            element={
              <PageWrapper
                title={`Notices & Updates - ${schoolInfo.name}`}
                description={`Stay informed with the latest notices, announcements, and blog posts from ${schoolInfo.name}.`}
              >
                <Notices />
              </PageWrapper>
            }
          />
          <Route
            path="/news/:id"
            element={
              <PageWrapper
                title={`News Details - ${schoolInfo.name}`}
                description={`Read the complete details of notices and announcements from ${schoolInfo.name}.`}
              >
                <NewsDetails />
              </PageWrapper>
            }
          />
          <Route
            path="/fees-structure"
            element={
              <PageWrapper
                title={`Fees Structure - ${schoolInfo.name}`}
                description={`View the complete fees structure for all classes at ${schoolInfo.name} for academic year 2025-26.`}
              >
                <FeesStructure />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper
                title={`Contact Us - ${schoolInfo.name}`}
                description={`Get in touch with ${schoolInfo.name}. Visit us at ${schoolInfo.address} or call ${schoolInfo.phone}. We're here to help!`}
              >
                <Contact />
              </PageWrapper>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
