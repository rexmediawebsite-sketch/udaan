import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import PageTransition from './components/PageTransition';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import BecomeAnExhibitorPage from './pages/BecomeAnExhibitorPage';
import StallsPage from './pages/StallsPage';
import ExhibitorsPage from './pages/ExhibitorsPage';
import VisitorsPage from './pages/VisitorsPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import ExhibitorApplicationPage from './pages/ExhibitorApplicationPage';
import BookAStallPage from './pages/BookAStallPage';
import ArchivePage from './pages/ArchivePage';

function AppContent() {
  const navigate = useNavigate();

  const handleOpenBooking = (categoryOrEvent = null) => {
    const params = new URLSearchParams();
    if (typeof categoryOrEvent === 'string' && categoryOrEvent) {
      params.set('category', categoryOrEvent);
    }
    navigate(`/book-a-stall${params.toString() ? '?' + params.toString() : ''}`);
  };

  const handleSelectStallForBooking = (stall) => {
    const params = new URLSearchParams();
    if (stall && stall.id) params.set('stall', stall.id);
    if (stall && stall.type) params.set('plan', stall.type);
    navigate(`/book-a-stall${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#FBF4EA] text-[#2B1B17] relative flex flex-col justify-between selection:bg-[#D9A441]/30 selection:text-[#4A1620]">
        {/* Centered Floating Award-Level Navigation Pill */}
        <Navigation onOpenBooking={() => handleOpenBooking()} />

        {/* Dynamic Page Transitions and Multi-Page Routes */}
        <PageTransition>
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    onOpenBooking={handleOpenBooking}
                    onSelectStall={handleSelectStallForBooking}
                  />
                }
              />
              <Route
                path="/events"
                element={<EventsPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/events/:slug"
                element={<EventDetailPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/events/glamour-gala-5"
                element={<EventDetailPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/book-a-stall"
                element={<BookAStallPage />}
              />
              <Route
                path="/become-an-exhibitor"
                element={<BookAStallPage />}
              />
              <Route
                path="/apply"
                element={<BookAStallPage />}
              />
              <Route
                path="/apply-stall"
                element={<BookAStallPage />}
              />
              <Route
                path="/exhibitor-stall-application"
                element={<BookAStallPage />}
              />
              <Route
                path="/stalls"
                element={
                  <StallsPage onSelectStall={handleSelectStallForBooking} />
                }
              />
              <Route
                path="/exhibitors"
                element={<ExhibitorsPage onOpenBooking={handleOpenBooking} />}
              />
              <Route path="/visitors" element={<VisitorsPage />} />
              <Route
                path="/archive"
                element={<ArchivePage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/gallery"
                element={<ArchivePage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/about"
                element={<AboutPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/our-story"
                element={<AboutPage onOpenBooking={handleOpenBooking} />}
              />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Editorial Footer with Gold Band & Diya Accents */}
          <Footer onOpenBooking={() => handleOpenBooking()} />
        </PageTransition>
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
