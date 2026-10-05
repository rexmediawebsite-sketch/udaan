import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import PageTransition from './components/PageTransition';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

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

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedStall, setPreselectedStall] = useState(null);
  const [preselectedCategory, setPreselectedCategory] = useState(null);

  const handleOpenBooking = (category = null) => {
    setPreselectedCategory(typeof category === 'string' ? category : null);
    setPreselectedStall(null);
    setBookingModalOpen(true);
  };

  const handleSelectStallForBooking = (stall) => {
    setPreselectedStall(stall);
    setPreselectedCategory(stall.category !== 'Open Category' ? stall.category : null);
    setBookingModalOpen(true);
  };

  return (
    <Router>
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
                  path="/become-an-exhibitor"
                  element={<BecomeAnExhibitorPage />}
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
                <Route path="/gallery" element={<GalleryPage />} />
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

          {/* Global Stall Booking & Allotment Modal */}
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            preselectedStall={preselectedStall}
            preselectedCategory={preselectedCategory}
          />
        </div>
      </SmoothScroll>
    </Router>
  );
}
