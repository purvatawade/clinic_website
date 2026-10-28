'use client';

import React, { useState, useEffect } from 'react';

export default function DoctorClinicWebsite() {
  // Dr. Sarika B. Singh's verified WhatsApp Number
  const clinicPhone = '919867519567';
  const clinicAddress =
    'Shop No 7, Priyal Enclave Building, Opposite R K Hotel, Near Bharti Park, Mira Road East, Thane, Maharashtra 401107';
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    clinicAddress
  )}`;
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    clinicAddress
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  // Real-time Clock & Clinic Live Status
  const [currentTime, setCurrentTime] = useState<string>('');
  const [opdStatus, setOpdStatus] = useState<{ text: string; isOpen: boolean }>({
    text: 'Checking Live Status...',
    isOpen: false,
  });

  useEffect(() => {
    const updateTimeAndStatus = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const decimalTime = hours + minutes / 60;

      // Morning: 11:00 AM - 02:00 PM (11.0 to 14.0)
      // Evening: 06:30 PM - 09:30 PM (18.5 to 21.5)
      if (decimalTime >= 11.0 && decimalTime < 14.0) {
        setOpdStatus({ text: 'LIVE: Morning OPD Session Open', isOpen: true });
      } else if (decimalTime >= 18.5 && decimalTime < 21.5) {
        setOpdStatus({ text: 'LIVE: Evening OPD Session Open', isOpen: true });
      } else if (decimalTime < 11.0) {
        setOpdStatus({ text: 'Morning OPD Begins at 11:00 AM', isOpen: false });
      } else if (decimalTime >= 14.0 && decimalTime < 18.5) {
        setOpdStatus({ text: 'Evening OPD Begins at 06:30 PM', isOpen: false });
      } else {
        setOpdStatus({ text: 'OPD Closed for Today • Opens 11:00 AM', isOpen: false });
      }
    };

    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  // WhatsApp quick inquiry state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (11:00 AM – 02:00 PM)');
  const [selectedService, setSelectedService] = useState('Panchakarma & Ayurvedic Detox');

  // Interactive Treatments Tab State
  const [activeTab, setActiveTab] = useState<'all' | 'ayurveda' | 'primary' | 'chronic'>('all');

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Testimonials Carousel State (3 items per page)
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Verma',
      locality: 'Shanti Park, Mira Road',
      review: 'Dr. Sarika Singh provides reassuring advice and never prescribes unneeded medicine. The consultation is always thorough and genuine.',
      rating: '★★★★★',
    },
    {
      name: 'Priya Kulkarni',
      locality: 'Pleasant Park',
      review: 'Evening clinic timing till 9:30 PM is super convenient after office hours. Very patient doctor who explains everything clearly.',
      rating: '★★★★★',
    },
    {
      name: 'Amit Deshmukh',
      locality: 'Sheetal Nagar',
      review: 'Our family doctor for over 5 years. Her diagnosis for seasonal fever, chronic symptoms, and health advice is always spot on.',
      rating: '★★★★★',
    },
    {
      name: 'Sunita Sharma',
      locality: 'Silver Park',
      review: 'Very polite and knowledgeable. She listens patiently to all health concerns and guides with both modern and Ayurvedic care.',
      rating: '★★★★★',
    },
    {
      name: 'Manoj Tiwari',
      locality: 'Kanakia, Mira Road',
      review: 'Consulted for chronic joint stiffness. The Ayurvedic dietary guidance and pain relief therapies provided great long-term comfort.',
      rating: '★★★★★',
    },
    {
      name: 'Kavita Patel',
      locality: 'Beverly Park',
      review: 'Doctor Sarika is very calm and explains dosage timing very properly. Very happy with the clinical treatment for our kids.',
      rating: '★★★★★',
    },
  ];

  // Carousel navigation logic (showing 3 per slide)
  const itemsPerPage = 3;
  const maxPages = Math.ceil(testimonials.length / itemsPerPage);

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % maxPages);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + maxPages) % maxPages);
  };

  const currentTestimonials = testimonials.slice(
    testimonialIndex * itemsPerPage,
    testimonialIndex * itemsPerPage + itemsPerPage
  );

  // Form submit handler
  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const message = `Namaste Dr. Sarika Singh,%0A%0AMy name is *${encodeURIComponent(
      patientName.trim()
    )}*.%0A📞 Contact: *${encodeURIComponent(patientPhone.trim())}*%0A🕒 Preferred Slot: *${encodeURIComponent(
      preferredSlot
    )}*%0A🌿 Service/Inquiry: *${encodeURIComponent(selectedService)}*%0A%0AI would like to consult at Dhanwantri Clinic, Mira Road (East).`;

    window.open(`https://wa.me/${clinicPhone}?text=${message}`, '_blank');
  };

  // Treatments & Ayurvedic Services List
  const treatmentsData = [
    {
      category: 'ayurveda',
      title: 'Panchakarma & Ayurvedic Detox',
      desc: 'Authentic traditional purification therapies, dosha balancing, and cellular detoxification tailored to your condition.',
      icon: '🏺',
      badge: 'Ayurveda & Detox',
    },
    {
      category: 'ayurveda',
      title: 'Ayurvedic Wellness & Dietetics',
      desc: 'Holistic dietary regimens based on individual Prakriti, digestive revitalization, and natural herbal therapies.',
      icon: '🌿',
      badge: 'Holistic Health',
    },
    {
      category: 'primary',
      title: 'Viral & Seasonal Fevers',
      desc: 'Prompt diagnostic assessment and therapeutic management of acute fevers, viral syndromes, and seasonal infections.',
      icon: '🌡️',
      badge: 'Acute Care',
    },
    {
      category: 'chronic',
      title: 'Hypertension & BP Profiling',
      desc: 'Systematic blood pressure monitoring, vitals evaluation, and cardiovascular risk reduction plans.',
      icon: '🫀',
      badge: 'Cardiac Health',
    },
    {
      category: 'chronic',
      title: 'Diabetes & Sugar Control',
      desc: 'Balanced regimens for glycemic stabilization, routine HbA1c review, and personalized lifestyle counseling.',
      icon: '🩸',
      badge: 'Metabolic Care',
    },
    {
      category: 'primary',
      title: 'Respiratory & Chest Illnesses',
      desc: 'Care for persistent coughs, bronchitis, throat infections, and seasonal allergic rhinitis.',
      icon: '🫁',
      badge: 'Pulmonary Care',
    },
    {
      category: 'ayurveda',
      title: 'Joint, Vata & Pain Relief',
      desc: 'Traditional Ayurvedic management for arthritis, chronic back stiffness, sciatica, and joint inflammation.',
      icon: '🧘',
      badge: 'Ayurvedic Relief',
    },
    {
      category: 'primary',
      title: 'Pediatric & Family Healthcare',
      desc: 'Empathetic primary care for infants, growing children, and senior citizens with multiple conditions.',
      icon: '👨‍👩‍👧‍👦',
      badge: 'Family OPD',
    },
  ];

  const filteredTreatments =
    activeTab === 'all'
      ? treatmentsData
      : treatmentsData.filter((item) => item.category === activeTab);

  const faqData = [
    {
      q: 'What are the OPD consultation timings?',
      a: 'The clinic runs daily in two sessions: Morning from 11:00 AM to 02:00 PM, and Evening from 06:30 PM to 09:30 PM (Monday to Sunday).',
    },
    {
      q: 'How is the treatment and consultation structured?',
      a: 'Consultation and treatment recommendations are personalized based on the specific health condition, required clinical assessments, or specialized Ayurvedic therapies.',
    },
    {
      q: 'Can I walk in directly without prior appointment?',
      a: 'Yes, Dhanwantri Clinic primarily accommodates walk-in patients on a first-come, first-served basis. You can also send a WhatsApp message to verify clinic rush before arriving.',
    },
    {
      q: 'Where exactly is the clinic located in Mira Road?',
      a: 'It is situated at Shop No. 7, Priyal Enclave Building, Opposite R.K. Hotel, Near Bharti Park, Mira Road East, Thane – 401107.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#faf7f2] text-slate-900 font-sans selection:bg-[#062c1e] selection:text-white overflow-hidden">
      {/* =========================================================================
          ANIMATED FLOATING MESH BACKGROUND
      ========================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-amber-200/25 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '-3s' }}
        />
        <div
          className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '-5s' }}
        />
      </div>

      {/* =========================================================================
          LIVE CLINIC STATUS TICKER
      ========================================================================== */}
      <div className="relative z-30 bg-[#041d14] text-white py-2.5 px-4 border-b border-emerald-900/60 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                opdStatus.isOpen ? 'bg-emerald-400 animate-pulse-ring' : 'bg-amber-400'
              }`}
            />
            <span className="font-extrabold tracking-wide uppercase text-amber-200">
              {opdStatus.text}
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-200/80 font-medium">
            <span>
              🕒 Current Time: <strong className="text-white">{currentTime || '--:--'}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">📍 Shop No. 7, Priyal Enclave, Mira Road (E)</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HERO SECTION: WARM CREAM & PEACH WITH CRISP DARK GREEN ACCENTS
      ========================================================================== */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-b from-[#f5ede2] via-[#faf5ee] to-[#faf7f2] py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Doctor Identity */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-900/10 border border-emerald-800/20 text-[#062c1e] text-xs font-bold tracking-wide shadow-sm backdrop-blur-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span>Mira Road East, Thane • 23+ Years Clinical Practice</span>
            </div>

            <div className="space-y-2">
              <span className="text-emerald-800 font-black tracking-widest uppercase text-xs">
                Welcome To Dhanwantri Clinic
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Dr. Sarika. B. <span className="text-[#062c1e]">Singh</span>
              </h1>
              <p className="text-[#062c1e] font-extrabold text-base sm:text-lg tracking-wide flex items-center gap-2">
                <span>⚕</span> B.A.M.S. (Mumbai) • Family Physician & Surgeon
              </p>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl">
              Specialized family healthcare, Ayurvedic healing, Panchakarma consultation,
              hypertension & diabetes monitoring, and acute seasonal ailment management.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`https://wa.me/${clinicPhone}?text=Hello%20Dr.%20Sarika%20Singh,%20I%20would%20like%20to%20consult%20at%20Dhanwantri%20Clinic.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 bg-[#062c1e] hover:bg-emerald-900 active:scale-95 text-white font-extrabold px-6 py-3.5 rounded-xl transition duration-200 shadow-lg shadow-emerald-950/20 text-sm"
              >
                <span className="group-hover:rotate-12 transition-transform">💬</span>
                <span>WhatsApp (+91 98675 19567)</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-amber-50 active:scale-95 text-[#062c1e] font-bold px-6 py-3.5 rounded-xl border border-emerald-900/20 transition text-sm shadow-sm"
              >
                <span>📍</span>
                <span>Navigate to Clinic</span>
              </a>
            </div>

            {/* High-Contrast Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-amber-200/80">
              <div className="bg-white p-3.5 rounded-2xl border border-amber-200/60 shadow-sm text-center hover:scale-105 transition-transform duration-200">
                <p className="text-2xl sm:text-3xl font-black text-[#062c1e]">23+</p>
                <p className="text-xs font-bold text-slate-600 mt-0.5">Years Exp.</p>
              </div>

              <div className="bg-[#f2e7d5] p-3.5 rounded-2xl border border-amber-300/80 shadow-sm text-center hover:scale-105 transition-transform duration-200">
                <p className="text-lg sm:text-xl font-black text-[#062c1e]">Personalized</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">Care Plans</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-amber-200/60 shadow-sm text-center hover:scale-105 transition-transform duration-200">
                <p className="text-2xl sm:text-3xl font-black text-[#062c1e]">7 Days</p>
                <p className="text-xs font-bold text-slate-600 mt-0.5">Daily OPD</p>
              </div>
            </div>
          </div>

          {/* Right Column: Signboard & Quick Inquiry Box */}
          <div className="lg:col-span-6 space-y-5">
            {/* Edge-to-Edge Signboard Container */}
            <div className="rounded-3xl overflow-hidden border-2 border-[#062c1e] shadow-xl bg-black">
              <img
                src="/board.jpg"
                alt="Dhanwantri Clinic Official Signboard"
                className="w-full h-auto block object-contain"
              />
              <div className="bg-[#062c1e] py-3 px-4 text-center border-t border-emerald-800 flex items-center justify-between text-xs text-white">
                <span className="font-bold text-amber-200">📍 Priyal Enclave, Mira Road (E)</span>
                <span className="bg-emerald-800 text-emerald-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  Official Signboard
                </span>
              </div>
            </div>

            {/* WhatsApp Inquiry Form Card */}
            <div className="rounded-3xl bg-white p-6 shadow-xl border border-amber-200/80 text-slate-900">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#062c1e] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  Quick Patient Connect
                </h3>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                  Direct WhatsApp
                </span>
              </div>

              <form onSubmit={handleWhatsAppSend} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#062c1e] outline-none bg-slate-50 transition"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Number"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#062c1e] outline-none bg-slate-50 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#062c1e] outline-none bg-slate-50 font-medium"
                  >
                    <option value="Morning (11:00 AM – 02:00 PM)">Morning: 11:00 AM – 02:00 PM</option>
                    <option value="Evening (06:30 PM – 09:30 PM)">Evening: 06:30 PM – 09:30 PM</option>
                  </select>

                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#062c1e] outline-none bg-slate-50 font-medium"
                  >
                    <option value="Panchakarma & Ayurvedic Detox">Panchakarma & Ayurvedic Detox</option>
                    <option value="Ayurvedic Wellness & Dietetics">Ayurvedic Wellness & Diet</option>
                    <option value="Joint, Vata & Pain Relief">Joint, Vata & Pain Relief</option>
                    <option value="General Outpatient Care">General Outpatient Care</option>
                    <option value="Viral Fever / Cold / Flu">Viral Fever / Cold / Flu</option>
                    <option value="BP & Diabetes Review">BP & Diabetes Review</option>
                    <option value="Pediatric Care">Child / Pediatric Care</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#062c1e] hover:bg-emerald-900 active:scale-[0.99] text-white font-black py-3 rounded-xl text-xs transition duration-200 flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20"
                >
                  <span>💬</span> Send Inquiry on WhatsApp (+91 98675 19567)
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COHESIVE OPD TIMINGS SECTION
      ========================================================================== */}
      <section id="timings" className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white border-2 border-emerald-900/15 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1">
            <span className="text-[#062c1e] font-black text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              Consultation Schedule
            </span>
            <h2 className="text-2xl font-black text-slate-900">OPD Timings</h2>
            <p className="text-xs text-slate-600">
              Open 7 days a week for walk-in primary care & Ayurvedic consultations.
            </p>
          </div>

          {/* Morning Slot */}
          <div className="bg-[#fef9f2] border border-amber-200 rounded-2xl p-5 shadow-sm hover:border-[#062c1e] transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                ☀️ Morning Session
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                Daily
              </span>
            </div>
            <p className="text-2xl font-black text-[#062c1e]">11:00 AM – 02:00 PM</p>
            <p className="text-xs text-slate-600 mt-1">Walk-ins & routine health checks</p>
          </div>

          {/* Evening Slot */}
          <div className="bg-[#f3f7f4] border border-emerald-200 rounded-2xl p-5 shadow-sm hover:border-[#062c1e] transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                🌙 Evening Session
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                Daily
              </span>
            </div>
            <p className="text-2xl font-black text-[#062c1e]">06:30 PM – 09:30 PM</p>
            <p className="text-xs text-slate-600 mt-1">Convenient after-work family OPD</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE 3-CARD CAROUSEL (CONTROLLED WITH LEFT/RIGHT ARROWS)
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#062c1e] bg-amber-100/80 px-3 py-1 rounded-full">
              Patient Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Trusted by Mira Road Families
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Showing page {testimonialIndex + 1} of {maxPages} • Click arrows to view more reviews
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevTestimonial}
              aria-label="Previous Testimonials"
              className="w-12 h-12 rounded-2xl bg-white border border-amber-200 text-[#062c1e] hover:bg-[#062c1e] hover:text-white transition-all duration-200 flex items-center justify-center font-bold text-lg shadow-sm hover:scale-105 active:scale-95"
            >
              ←
            </button>
            <button
              onClick={handleNextTestimonial}
              aria-label="Next Testimonials"
              className="w-12 h-12 rounded-2xl bg-white border border-amber-200 text-[#062c1e] hover:bg-[#062c1e] hover:text-white transition-all duration-200 flex items-center justify-center font-bold text-lg shadow-sm hover:scale-105 active:scale-95"
            >
              →
            </button>
          </div>
        </div>

        {/* Clean 3-Card Grid Interface */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-amber-200/80 p-7 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#062c1e] transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="text-amber-400 text-sm tracking-wider">{item.rating}</div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{item.review}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#062c1e]">{item.name}</span>
                <span className="text-[11px] text-slate-400 font-semibold">{item.locality}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxPages }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setTestimonialIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                testimonialIndex === dotIdx
                  ? 'w-8 bg-[#062c1e]'
                  : 'w-2.5 bg-amber-200 hover:bg-amber-300'
              }`}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SERVICES SECTION
      ========================================================================== */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16 space-y-10 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#062c1e] font-extrabold text-xs uppercase tracking-widest bg-emerald-100/80 px-3.5 py-1.5 rounded-full">
            Panchakarma, Ayurveda & Primary OPD
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Clinical & Ayurvedic Treatments
          </h2>
          <p className="text-slate-600 text-sm">
            Click on any service inquiry to chat directly with Dr. Sarika B. Singh on WhatsApp.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'ayurveda', label: '🌿 Panchakarma & Ayurveda' },
            { id: 'primary', label: '🩺 General OPD' },
            { id: 'chronic', label: '🫀 BP & Diabetes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#062c1e] text-white shadow-md shadow-emerald-950/20 scale-105'
                  : 'bg-white border border-amber-200/70 text-slate-700 hover:bg-amber-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid Display: Every Card & Link Targets WhatsApp Directly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((srv, idx) => (
            <div
              key={idx}
              className="group bg-white border border-amber-200/70 hover:border-[#062c1e] p-6 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-3 bg-[#faf5ee] rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-[#062c1e] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
              </div>

              {/* Direct WhatsApp Consultation Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-[#062c1e]">✓ Daily OPD</span>
                <a
                  href={`https://wa.me/${clinicPhone}?text=Namaste%20Dr.%20Sarika%20Singh,%20I%20am%20interested%20in%20an%20inquiry%20regarding%20*${encodeURIComponent(
                    srv.title
                  )}*%20at%20Dhanwantri%20Clinic.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-800 hover:text-[#062c1e] transition flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200"
                >
                  <span>💬 Inquire on WhatsApp</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INSIDE THE CLINIC: GALLERY SHOWCASE
      ========================================================================== */}
      <section id="gallery" className="bg-[#f4ebe1]/60 py-20 px-4 border-y border-amber-200/60 relative z-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[#062c1e] font-extrabold text-xs uppercase tracking-widest bg-emerald-100/80 px-3.5 py-1.5 rounded-full">
              Clinic Premises
            </span>
            <h2 className="text-3xl font-black text-slate-900">Inside Dhanwantri Clinic</h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Equipped consultation chamber, diagnostic instruments, and dispensary storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Card 1 */}
            <div className="group bg-white rounded-3xl border border-amber-200/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#062c1e] transition-all duration-300">
              <div className="h-80 w-full overflow-hidden bg-slate-900 relative">
                <img
                  src="/consultation-desk.jpg"
                  alt="Doctor Prescription Desk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-700 px-2.5 py-1 rounded-md mb-1 inline-block">
                    Consultation Zone
                  </span>
                  <p className="text-base font-bold">Doctor's Clinical Desk</p>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <p className="text-xs text-slate-600 leading-relaxed max-w-md">
                  Prescription and consultation desk for diagnosis, clinical evaluation, and health records.
                </p>
                <a
                  href={`https://wa.me/${clinicPhone}?text=Hello%20Dr.%20Sarika%20Singh,%20I%20would%20like%20to%20visit%20your%20consultation%20desk%20at%20Dhanwantri%20Clinic.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#062c1e] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Chat Desk</span> →
                </a>
              </div>
            </div>

            {/* Image Card 2 */}
            <div className="group bg-white rounded-3xl border border-amber-200/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#062c1e] transition-all duration-300">
              <div className="h-80 w-full overflow-hidden bg-slate-900 relative">
                <img
                  src="/clinic-cabin.jpg"
                  alt="Patient Examination Bed & Dispensary"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-700 px-2.5 py-1 rounded-md mb-1 inline-block">
                    Examination Zone
                  </span>
                  <p className="text-base font-bold">Patient Examination Bed & Dispensary</p>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <p className="text-xs text-slate-600 leading-relaxed max-w-md">
                  Clinical examination bed, sphygmomanometer unit for blood pressure profiling, and essential medicines.
                </p>
                <a
                  href={`https://wa.me/${clinicPhone}?text=Hello%20Dr.%20Sarika%20Singh,%20I%20would%20like%20to%20ask%20about%20OPD%20examination%20hours.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#062c1e] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Inquire</span> →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ ACCORDION
      ========================================================================== */}
      <section className="max-w-4xl mx-auto px-4 py-20 space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <span className="text-[#062c1e] font-extrabold text-xs uppercase tracking-widest bg-emerald-100/80 px-3.5 py-1.5 rounded-full">
            Help & Information
          </span>
          <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-amber-200/70 rounded-2xl overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center text-sm font-bold text-slate-900 hover:text-[#062c1e] transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#062c1e] text-xl font-black">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          LOCATION & GOOGLE MAPS NAVIGATION
      ========================================================================== */}
      <section id="contact" className="max-w-6xl mx-auto px-4 pb-24 relative z-10">
        <div className="bg-[#062c1e] text-white rounded-3xl p-8 lg:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-emerald-800">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-amber-200 font-bold text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Directions & Landmark
            </span>

            <h2 className="text-3xl sm:text-4xl font-black">Reach Dhanwantri Clinic</h2>

            <div className="space-y-4 text-xs text-emerald-100/90 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-base p-2 bg-white/10 rounded-xl">📍</span>
                <div>
                  <strong className="text-white block text-sm mb-0.5">Physical Address:</strong>
                  Shop No 7, Priyal Enclave Building, Opposite R K Hotel, Near Bharti Park, Mira Road East, Thane – 401107.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base p-2 bg-white/10 rounded-xl">⏰</span>
                <div>
                  <strong className="text-white block text-sm mb-0.5">Consultation Timings (Daily):</strong>
                  Morning: 11:00 AM – 02:00 PM <br />
                  Evening: 06:30 PM – 09:30 PM
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base p-2 bg-white/10 rounded-xl">📱</span>
                <div>
                  <strong className="text-white block text-sm mb-0.5">Doctor Contact / WhatsApp:</strong>
                  +91 98675 19567
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-[#062c1e] font-black py-4 px-6 rounded-2xl transition duration-200 text-sm shadow-xl"
              >
                <span>🗺️</span> Open Google Maps Navigation
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-emerald-700 shadow-xl relative bg-emerald-950">
            <iframe
              title="Dhanwantri Clinic Mira Road Map"
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${clinicPhone}?text=Hello%20Dr.%20Sarika%20Singh,%20I%20would%20like%20to%20consult%20at%20Dhanwantri%20Clinic.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#062c1e] font-black py-3 px-5 rounded-full shadow-2xl transition-all duration-300 border-2 border-white hover:scale-105 active:scale-95 animate-pulse-ring"
      >
        <span className="text-xl">💬</span>
        <span className="text-xs tracking-wide">WhatsApp Doctor</span>
      </a>
    </div>
  );
}