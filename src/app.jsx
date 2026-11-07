import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import studioData from './data/studio.json';
import projectsData from './data/projects.json';
import demosData from './data/demos.json';

import { MotionProvider, useMotionPreference } from './components/MotionContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { ProjectDialog } from './components/ProjectDialog.jsx';

import { HeroSection } from './sections/HeroSection.jsx';
import { PillarsSection } from './sections/PillarsSection.jsx';
import { LiveDemoHubSection } from './sections/LiveDemoHubSection.jsx';
import { RealPortfolioSection } from './sections/RealPortfolioSection.jsx';
import { CostEstimatorSection } from './sections/CostEstimatorSection.jsx';
import { ArchitectureFounderSection } from './sections/ArchitectureFounderSection.jsx';
import { PackagesSection } from './sections/PackagesSection.jsx';
import { ContactFooterSection } from './sections/ContactFooterSection.jsx';

function RakitStudioApp() {
  const { motionEnabled } = useMotionPreference();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeExternalTab, setActiveExternalTab] = useState(null);
  const [prefilledInquiry, setPrefilledInquiry] = useState(null);

  const scrollToElement = (id) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: motionEnabled ? 'smooth' : 'auto',
          block: 'start'
        });
      }
    }, 60);
  };

  const handleInquireProject = (proj) => {
    setPrefilledInquiry({
      systemNeed: 'Business Operations (Cloud POS / Web App + DOKU QRIS)',
      projectNotes: `Tertarik membangun sistem serupa dengan studi kasus portofolio [${proj.code}] ${proj.title}.`
    });
    scrollToElement('contact');
  };

  const handleJumpToDemoTab = (tabId) => {
    setActiveExternalTab(tabId);
    scrollToElement('live-demo');
  };

  const handleSelectPackage = (pkg) => {
    const mapNeed = {
      'starter-engine': 'Starter Engine (High-Converting Company Profile + WA CRM)',
      'business-operations': 'Business Operations (Cloud POS / Web App + DOKU QRIS)',
      'enterprise-custom': 'Enterprise Custom (Full ERP / Client Portal / Multi-Cabang)'
    };
    setPrefilledInquiry({
      systemNeed: mapNeed[pkg.id] || pkg.name,
      projectNotes: `Memilih paket ${pkg.name} (${pkg.priceRange} • Estimasi ${pkg.timeline}).`
    });
    scrollToElement('contact');
  };

  return (
    <div className="site-wrapper">
      <div className="editorial-grain-overlay" aria-hidden="true" />

      <Navbar studio={studioData} />

      <main id="main-content">
        <HeroSection studio={studioData} />
        <PillarsSection studio={studioData} />
        <LiveDemoHubSection
          demos={demosData}
          activeExternalTab={activeExternalTab}
          whatsappNumber={studioData.contact.whatsappNumber}
        />
        <RealPortfolioSection
          projects={projectsData}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
        <CostEstimatorSection
          estimatorData={demosData.estimator}
          whatsappNumber={studioData.contact.whatsappNumber}
        />
        <ArchitectureFounderSection studio={studioData} />
        <PackagesSection
          packages={studioData.packages}
          onSelectPackage={handleSelectPackage}
        />
        <ContactFooterSection
          studio={studioData}
          prefilledInquiry={prefilledInquiry}
        />
      </main>

      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireProject={handleInquireProject}
        onJumpToDemoTab={handleJumpToDemoTab}
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <MotionProvider>
        <RakitStudioApp />
      </MotionProvider>
    </React.StrictMode>
  );
}
