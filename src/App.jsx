import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Monitor,
  Laptop,
  Keyboard,
  Palette,
  GraduationCap,
  FlaskConical,
  Calculator,
  BookOpen,
  Briefcase,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Languages,
  Check,
  ChevronDown,
  Award,
  Compass,
  ShieldCheck,
  Clock,
  Sparkles,
  ExternalLink,
  HelpCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building2,
  Users,
  Sun,
  Truck,
  Zap,
  TrendingUp
} from 'lucide-react';
import { T, COURSES, NAMES, COURSE_FULL_NAMES } from './i18n.js';

const PHONE = '917000636271';
const DISPLAY_PHONE = '+91 7000636271';
const MAIL = 'abhicomputer312377@gmail.com';
const MAP =
  'https://www.google.com/maps/search/?api=1&query=Abhi%20Computer%20Center%2C%20Near%20Railway%20Crossing%2C%20New%20Colony%2C%20Pachore%2C%20Madhya%20Pradesh%2C%20India';

const ICONS = {
  Monitor,
  Laptop,
  Keyboard,
  Palette,
  GraduationCap,
  FlaskConical,
  Calculator,
  BookOpen,
  Briefcase,
  Compass,
  ShieldCheck,
  Award,
  Clock,
  Users,
  Building2,
  Calendar,
  MessageCircle,
  Sun,
  Truck,
  Zap,
  TrendingUp
};

const Logo = () => (
  <div className="brand-logo" aria-hidden="true">
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#315BFF" />
          <stop offset="100%" stopColor="#42D9F5" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0B1020" stroke="rgba(66, 217, 245, 0.3)" strokeWidth="2" />
      <path
        d="M18 46 L32 16 L46 46"
        stroke="url(#logoGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M23 37 H41" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <circle cx="48" cy="18" r="4.5" fill="#42D9F5" />
    </svg>
  </div>
);

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      if (ref.current) {
        ref.current.querySelectorAll('.rv').forEach((el) => el.classList.add('in'));
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) {
      const items = ref.current.querySelectorAll('.rv');
      items.forEach((item) => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function App() {
  const [lang, setLang] = useState('en');
  const t = T[lang];

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Course filter and explorer state
  const [courseFilter, setCourseFilter] = useState('all');
  const [explorerCategory, setExplorerCategory] = useState(0);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    mob: '',
    course: '',
    msg: '',
    consent: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [submittedUrl, setSubmittedUrl] = useState(null);

  const containerRef = useScrollReveal();

  // Sync document lang attribute
  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }, [lang]);

  // Navbar scroll detection & active link observation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const navSectionIds = ['home', 'about', 'pmkvy', 'courses', 'explorer', 'why', 'faq', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -60% 0px' }
    );

    navSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Keyboard accessibility: Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Smooth scroll handler
  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Pre-select course and scroll to enquiry form
  const handleEnquireCourse = useCallback(
    (courseId) => {
      setFormData((prev) => ({ ...prev, course: courseId }));
      scrollTo('enquire');
      // Focus name or course input after scrolling
      setTimeout(() => {
        const input = document.getElementById('f-name');
        if (input) input.focus();
      }, 500);
    },
    [scrollTo]
  );

  // Explorer categories data
  const explorerOptions = [
    {
      cat: 'computer',
      courses: ['dca', 'pgdca', 'photoshop']
    },
    {
      cat: 'typing',
      courses: ['cpct']
    },
    {
      cat: 'academic',
      courses: ['ba', 'bsc', 'bcom', 'ma', 'mcom']
    }
  ];

  // Mobile number validation (Indian 10-digit)
  const validateMobile = (value) => {
    const cleaned = value.replace(/[\s-]/g, '');
    return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
  };

  // WhatsApp Enquiry URL generator
  const generateWhatsAppUrl = () => {
    const cleanMob = formData.mob.replace(/[\s-]/g, '').slice(-10);
    const selectedCourseName = NAMES[formData.course] || formData.course;
    const fullCourseName = COURSE_FULL_NAMES[formData.course] || selectedCourseName;

    let message = `${t.msgHead}\n\n`;
    message += `• Student Name: ${formData.name.trim()}\n`;
    message += `• Mobile Number: ${cleanMob}\n`;
    message += `• Interested Program: ${fullCourseName} (${selectedCourseName})\n`;
    if (formData.msg.trim()) {
      message += `• Message / Query: ${formData.msg.trim()}\n`;
    }
    message += `\n${t.msgTail}`;

    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = t.eName;
    }
    if (!validateMobile(formData.mob)) {
      errors.mob = t.eMob;
    }
    if (!formData.course) {
      errors.course = t.eCourse;
    }
    if (!formData.consent) {
      errors.consent = t.eConsent;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(`f-${firstErrorField}`);
      if (el) el.focus();
      return;
    }

    const whatsappUrl = generateWhatsAppUrl();
    setSubmittedUrl(whatsappUrl);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Render Lucide Icon dynamically
  const RenderIcon = ({ name, size = 24, className = '' }) => {
    const IconComponent = ICONS[name] || Compass;
    return <IconComponent size={size} className={className} aria-hidden="true" />;
  };

  // Filter courses for courses section
  const visibleCourses = COURSES.filter((c) => {
    if (courseFilter === 'all') return true;
    return c[1] === courseFilter;
  });

  return (
    <div className={`app-root ${lang === 'hi' ? 'lang-hi' : 'lang-en'}`} ref={containerRef}>
      {/* ========================================================
          1. HEADER & STICKY NAVIGATION
      ======================================================== */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container wrap">
          <a
            href="#home"
            className="navbar-brand"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('home');
            }}
          >
            <Logo />
            <div className="brand-text">
              <span className="brand-title">{t.instituteName}</span>
              <span className="brand-tagline">{t.tagline}</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {t.navIds.map((id, index) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${activeNav === id ? 'active' : ''}`}
                aria-current={activeNav === id ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(id);
                }}
              >
                {t.nav[index]}
              </a>
            ))}
          </nav>

          {/* Nav Right: Language Switch & CTA & Burger */}
          <div className="navbar-actions">
            <button
              type="button"
              className="lang-toggle-btn"
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              aria-label={`Switch language to ${lang === 'en' ? 'Hindi' : 'English'}`}
            >
              <Languages size={17} />
              <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            <button
              type="button"
              className="btn btn-primary nav-enquire-btn"
              onClick={() => scrollTo('enquire')}
            >
              <span>{t.enq}</span>
              <ArrowUpRight size={17} />
            </button>

            <button
              type="button"
              className="mobile-burger-btn"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.closeMenu : t.menu}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-inner wrap">
            <div className="mobile-nav-links">
              {t.navIds.map((id, index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`mobile-nav-link ${activeNav === id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(id);
                  }}
                >
                  <span>{t.nav[index]}</span>
                  <ArrowRight size={18} />
                </a>
              ))}
            </div>

            <div className="mobile-drawer-footer">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => scrollTo('enquire')}
              >
                <span>{t.enq}</span>
                <ArrowUpRight size={18} />
              </button>

              <div className="mobile-contact-quick">
                <a href={`tel:${PHONE}`} className="mobile-quick-link">
                  <Phone size={16} />
                  <span>{DISPLAY_PHONE}</span>
                </a>
                <a
                  href={`https://wa.me/${PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-quick-link"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ========================================================
            2. HERO SECTION
        ======================================================== */}
        <section id="home" className="hero-section dark-section">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="hero-glow-blob hero-glow-1" aria-hidden="true" />
          <div className="hero-glow-blob hero-glow-2" aria-hidden="true" />

          <div className="wrap hero-layout">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-badge rv">
                <span className="badge-pulse-dot" />
                <Sparkles size={15} className="badge-icon" />
                <span>{t.heroBadge}</span>
              </div>

              <h1 className="hero-title rv">
                <span className="hero-line">{t.h1[0]}</span>
                <span className="hero-line">{t.h1[1]}</span>
                <span className="hero-line gradient-text">{t.h1[2]}</span>
              </h1>

              <p className="hero-lead rv">{t.heroP}</p>

              <div className="hero-ctas rv">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => scrollTo('courses')}
                >
                  <span>{t.explore}</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg"
                  onClick={() => scrollTo('contact')}
                >
                  <Phone size={18} />
                  <span>{t.talk}</span>
                </button>
              </div>

              <div className="hero-meta rv">
                <div className="hero-meta-item">
                  <MapPin size={17} className="meta-icon" />
                  <span>{t.loc}</span>
                </div>
                <div className="hero-status-pill">
                  <span className="status-dot" />
                  <span>{t.admissionsOpen}</span>
                </div>
              </div>

              {/* Quick stats counter */}
              <div className="hero-stats-row rv">
                {t.heroStats.map((stat, i) => (
                  <div key={i} className="stat-card">
                    <span className="stat-val">{stat.val}</span>
                    <span className="stat-lbl">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Educational Programs & Guidance Dashboard */}
            <div className="hero-visual-wrapper rv" aria-label="Educational programs and study guidance dashboard">
              {/* Top Floating Badge: Practical Learning */}
              <div className="hero-floating-badge badge-top">
                <div className="badge-ico-wrap blue">
                  <Monitor size={18} />
                </div>
                <div className="badge-text-group">
                  <strong>{t.heroDashboard.badge1.title}</strong>
                  <small>{t.heroDashboard.badge1.subtitle}</small>
                </div>
              </div>

              {/* Central Educational Dashboard Card */}
              <div className="learning-journey-dashboard" aria-label="Educational Journey Dashboard">
                {/* Dashboard Header Bar */}
                <div className="dashboard-header">
                  <div className="dashboard-header-left">
                    <div className="dashboard-header-icon" aria-hidden="true">
                      <BookOpen size={18} />
                    </div>
                    <div className="dashboard-title-wrap">
                      <h3 className="dashboard-heading">{t.heroDashboard.title}</h3>
                      <span className="dashboard-sub">{t.instituteName} · {t.tagline}</span>
                    </div>
                  </div>
                  <div className="dashboard-status-tag">
                    <span className="status-indicator-dot" />
                    <span>{t.heroDashboard.status}</span>
                  </div>
                </div>

                {/* Dashboard Categories Grid */}
                <div className="dashboard-categories-container">
                  {/* Category 1: Computer Education */}
                  <div className="dash-cat-card cat-computer">
                    <div className="dash-cat-header">
                      <div className="dash-cat-icon computer" aria-hidden="true">
                        <Monitor size={18} />
                      </div>
                      <div className="dash-cat-meta">
                        <h4 className="dash-cat-title">{t.heroDashboard.categories.computer.title}</h4>
                        <p className="dash-cat-desc">{t.heroDashboard.categories.computer.desc}</p>
                      </div>
                    </div>
                    <div className="dash-course-pills">
                      <span className="dash-pill">DCA</span>
                      <span className="dash-pill">PGDCA</span>
                      <span className="dash-pill">Adobe Photoshop</span>
                    </div>
                  </div>

                  {/* Category 2: CPCT Preparation */}
                  <div className="dash-cat-card cat-cpct">
                    <div className="dash-cat-header">
                      <div className="dash-cat-icon cpct" aria-hidden="true">
                        <Keyboard size={18} />
                      </div>
                      <div className="dash-cat-meta">
                        <div className="dash-cat-title-row">
                          <h4 className="dash-cat-title">{t.heroDashboard.categories.cpct.title}</h4>
                          <span className="dash-code-tag">CPCT</span>
                        </div>
                        <p className="dash-cat-desc">{t.heroDashboard.categories.cpct.desc}</p>
                      </div>
                    </div>
                    <div className="dash-course-pills">
                      {t.heroDashboard.categories.cpct.skills.map((skill, idx) => (
                        <span key={idx} className="dash-pill skill">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: Academic Programs */}
                  <div className="dash-cat-card cat-academic">
                    <div className="dash-cat-header">
                      <div className="dash-cat-icon academic" aria-hidden="true">
                        <GraduationCap size={18} />
                      </div>
                      <div className="dash-cat-meta">
                        <h4 className="dash-cat-title">{t.heroDashboard.categories.academic.title}</h4>
                        <p className="dash-cat-desc">{t.heroDashboard.categories.academic.desc}</p>
                      </div>
                    </div>
                    <div className="dash-course-pills academic-pills">
                      <span className="dash-pill">BA</span>
                      <span className="dash-pill">BSc</span>
                      <span className="dash-pill">BCom</span>
                      <span className="dash-pill">MA</span>
                      <span className="dash-pill">MCom</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Floating Badge: Personal Academic Guidance */}
              <div className="hero-floating-badge badge-bottom">
                <div className="badge-ico-wrap cyan">
                  <GraduationCap size={18} />
                </div>
                <div className="badge-text-group">
                  <strong>{t.heroDashboard.badge2.title}</strong>
                  <small>{t.heroDashboard.badge2.subtitle}</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. ABOUT SECTION
        ======================================================== */}
        <section id="about" className="about-section light-section">
          <div className="wrap">
            <div className="section-header-centered rv">
              <span className="section-eyebrow">{t.aBadge || t.tagline}</span>
              <h2 className="section-title">{t.aT}</h2>
              <p className="section-subtitle">{t.aP}</p>
            </div>

            {/* Quick Highlights Row */}
            {t.aboutHighlights && (
              <div className="about-highlights-row rv">
                {t.aboutHighlights.map((hl, i) => (
                  <div key={i} className="about-hl-pill">
                    <span className="hl-label">{hl.label}:</span>
                    <strong className="hl-val">{hl.val}</strong>
                  </div>
                ))}
              </div>
            )}

            {/* Core Pillars */}
            <div className="about-pillars-grid">
              {t.aboutPillars.map((pillar, i) => {
                const iconNames = ['Monitor', 'Keyboard', 'GraduationCap', 'Users'];
                return (
                  <div key={i} className="pillar-card rv" style={{ transitionDelay: `${i * 90}ms` }}>
                    <div className="pillar-card-top">
                      <div className="pillar-icon-box">
                        <RenderIcon name={iconNames[i]} size={24} />
                      </div>
                      {pillar.tag && <span className="pillar-tag">{pillar.tag}</span>}
                    </div>
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-desc">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Director Information Card */}
            <div className="leadership-highlight-card rv">
              <div className="leadership-card-header">
                <div className="leadership-badge">
                  <Building2 size={20} />
                  <span>{t.tagline}</span>
                </div>
                <div className="leadership-verified-badge">
                  <ShieldCheck size={16} />
                  <span>Verified Institute Leadership</span>
                </div>
              </div>
              <div className="leadership-content">
                <div className="director-slot current">
                  <div className="director-status-pill current">2021–Present</div>
                  <span className="director-role-label">{t.currentDirector}</span>
                  <h4 className="director-name-val">{t.directorName}</h4>
                  <p className="director-place">{t.loc}</p>
                </div>
                <div className="director-divider" />
                <div className="director-slot founder">
                  <div className="director-status-pill founder">2016–2020</div>
                  <span className="director-role-label">{t.founderDirector}</span>
                  <h4 className="director-name-val founder">{t.founderName}</h4>
                  <p className="director-place">{t.establishedYear} · Pachore</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. LEADERSHIP & JOURNEY TIMELINE
        ======================================================== */}
        <section id="journey" className="journey-section dark-section">
          <div className="wrap">
            <div className="section-header rv">
              <span className="section-eyebrow cyan">{t.jBadge || t.tagline}</span>
              <h2 className="section-title text-white">{t.jT}</h2>
              <p className="section-subtitle text-muted-light">{t.jSub}</p>
            </div>

            <div className="timeline-container rv">
              <div className="timeline-track-line" aria-hidden="true" />
              <div className="timeline-cards-grid">
                {t.tl.map((step, i) => (
                  <div key={i} className={`timeline-step-card step-${i} rv`}>
                    <div className="step-node-indicator">
                      <span className="node-dot" />
                      <span className="node-glow" />
                    </div>
                    <div className="step-header-meta">
                      <div className="step-period-badge">
                        <Calendar size={15} />
                        <span>{step.period}</span>
                      </div>
                      {step.tag && <span className="step-tag-pill">{step.tag}</span>}
                    </div>
                    <h3 className="step-role-title">{step.role}</h3>
                    {step.subtitle && <p className="step-subtitle">{step.subtitle}</p>}
                    <p className="step-description">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4B. PMKVY AUTHORISED TRAINING CENTRE & VOCATIONAL SKILLS
        ======================================================== */}
        <section id="pmkvy" className="pmkvy-section light-section alt-bg">
          <div className="wrap">
            {/* Header Badge */}
            <div className="section-badge-center rv">
              <div className="pmkvy-top-badge">
                <Award size={16} />
                <span>{t.pmkvy.badge}</span>
              </div>
            </div>

            {/* Authorised Training Centre Recognition Hero Card */}
            <div className="pmkvy-hero-card rv">
              <div className="pmkvy-hero-header">
                <div className="pmkvy-emblem-badge" aria-label="Authorised Training Centre">
                  <ShieldCheck size={28} className="emblem-icon" />
                  <span className="emblem-text">PMKVY</span>
                </div>
                <div className="pmkvy-hero-titles">
                  <span className="pmkvy-scheme-sub">{t.pmkvy.fullName}</span>
                  <h2 className="pmkvy-main-heading">{t.pmkvy.heading}</h2>
                  <p className="pmkvy-motto">{t.pmkvy.tagline}</p>
                </div>
              </div>

              <div className="pmkvy-hero-body">
                <p className="pmkvy-lead-text">{t.pmkvy.desc}</p>
                <p className="pmkvy-support-text">{t.pmkvy.supporting}</p>
              </div>

              <div className="pmkvy-hero-actions">
                <a
                  href={t.pmkvy.exploreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>{t.pmkvy.exploreBtn}</span>
                  <ExternalLink size={17} />
                </a>
                <a
                  href={t.pmkvy.skillIndiaHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <span>{t.pmkvy.skillIndiaHubBtn}</span>
                  <ExternalLink size={17} />
                </a>
              </div>
            </div>

            {/* Compact Information Area: About PMKVY */}
            <div className="pmkvy-about-box rv">
              <div className="pmkvy-about-header">
                <div className="about-ico-box">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 className="pmkvy-about-title">{t.pmkvy.aboutHeading}</h3>
                  <span className="pmkvy-about-sub">{t.pmkvy.aboutSub}</span>
                </div>
              </div>

              <p className="pmkvy-about-desc">{t.pmkvy.aboutDesc}</p>

              <div className="pmkvy-objectives-wrapper">
                <h4 className="pmkvy-obj-heading">{t.pmkvy.objectivesTitle}</h4>
                <div className="pmkvy-objectives-grid">
                  {t.pmkvy.objectives.map((obj, idx) => (
                    <div key={idx} className="pmkvy-obj-item">
                      <CheckCircle2 size={18} className="obj-check-icon" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pmkvy-compliance-notice">
                <AlertCircle size={16} />
                <span>{t.pmkvy.disclaimer}</span>
              </div>
            </div>

            {/* Training Achievements: Two Separate Historical Cards */}
            <div className="pmkvy-achievements-block rv">
              <div className="block-header-inline">
                <div>
                  <span className="section-eyebrow">{t.tagline}</span>
                  <h3 className="block-title">{t.pmkvy.achievementsTitle}</h3>
                  <p className="block-sub">{t.pmkvy.achievementsSub}</p>
                </div>
                <div className="achievements-pill-badge">
                  <Award size={16} />
                  <span>Institute Records</span>
                </div>
              </div>

              <div className="pmkvy-achievements-grid">
                {t.pmkvy.achievements.map((item) => {
                  const isLogistics = item.id === 'logistics';
                  return (
                    <div key={item.id} className={`achievement-card card-${item.id} rv`}>
                      <div className="achieve-card-top">
                        <div className="achieve-icon-wrapper">
                          <RenderIcon name={isLogistics ? 'Truck' : 'Sun'} size={26} />
                        </div>
                        <div className="achieve-period-tag">
                          <Calendar size={14} />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      <div className="achieve-count-row">
                        <span className="achieve-big-number">{item.count}</span>
                        <span className="achieve-count-label">{item.label}</span>
                      </div>

                      <div className="achieve-card-body">
                        <div className="achieve-program-meta">
                          <h4 className="achieve-program-name">{item.program}</h4>
                          <div className="achieve-meta-badges">
                            <span className="meta-badge sector">{item.sector}</span>
                            {item.council && (
                              <span className="meta-badge council">{item.council}</span>
                            )}
                          </div>
                        </div>
                        <p className="achieve-desc">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Vocational & Skill Courses */}
            <div className="pmkvy-courses-block rv">
              <div className="block-header-inline">
                <div>
                  <span className="section-eyebrow">{t.tagline}</span>
                  <h3 className="block-title">{t.pmkvy.coursesTitle}</h3>
                  <p className="block-sub">{t.pmkvy.coursesSub}</p>
                </div>
                <div className="platform-disclaimer-pill" title={t.pmkvy.platformNote}>
                  <ShieldCheck size={15} />
                  <span>{t.pmkvy.platformBadge}</span>
                </div>
              </div>

              <div className="pmkvy-courses-grid">
                {t.pmkvy.courses.map((course) => {
                  const isSolar = course.id === 'solar-pv';
                  return (
                    <div key={course.id} className={`featured-skill-card skill-card-${course.id} rv`}>
                      <div className="skill-card-top">
                        <div className={`skill-icon-container ${isSolar ? 'solar' : 'logistics'}`}>
                          <RenderIcon name={isSolar ? 'Zap' : 'Truck'} size={24} />
                        </div>
                        <div className="skill-duration-badge">
                          <Clock size={14} />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <div className="skill-card-body">
                        <span className="skill-council-tag">{course.council}</span>
                        <h4 className="skill-course-title">{course.title}</h4>
                        {course.subtitle && <p className="skill-course-subtitle">{course.subtitle}</p>}
                        <p className="skill-course-desc">{course.desc}</p>

                        {/* Distinct Skill India Digital Platform Statistics Callout */}
                        <div className="platform-stats-callout">
                          <div className="callout-header">
                            <span className="callout-badge-dot" />
                            <span className="callout-title">Skill India Digital Platform Data</span>
                          </div>
                          <div className="callout-metrics-row">
                            <div className="metric-chip">
                              <Users size={14} />
                              <span>{course.platformEnrolled}</span>
                            </div>
                            <div className="metric-chip">
                              <TrendingUp size={14} />
                              <span>{course.platformUsers}</span>
                            </div>
                          </div>
                          <small className="callout-note">National portal statistics (distinct from institute training)</small>
                        </div>
                      </div>

                      <div className="skill-card-footer">
                        {course.url ? (
                          <a
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm skill-action-btn"
                          >
                            <span>{course.urlText}</span>
                            <ExternalLink size={15} />
                          </a>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline btn-sm skill-action-btn"
                            onClick={() => scrollTo('contact')}
                          >
                            <span>{t.talk}</span>
                            <ArrowRight size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. COURSES SECTION (ALL 9 COURSES)
        ======================================================== */}
        <section id="courses" className="courses-section light-section">
          <div className="wrap">
            <div className="courses-header-wrapper rv">
              <div className="section-header">
                <span className="section-eyebrow">{t.tagline}</span>
                <h2 className="section-title">{t.cT}</h2>
                <p className="section-subtitle">{t.cP}</p>
              </div>

              {/* Filter Tabs */}
              <div className="courses-tabs-bar" role="tablist" aria-label="Course Categories">
                {['all', 'computer', 'academic'].map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={courseFilter === key}
                    className={`tab-btn ${courseFilter === key ? 'active' : ''}`}
                    onClick={() => setCourseFilter(key)}
                  >
                    {t.tabs[key]}
                  </button>
                ))}
              </div>
            </div>

            {/* Balanced 9 Course Grid */}
            <div className="courses-grid" key={courseFilter}>
              {visibleCourses.map(([id, category, iconName], i) => (
                <article
                  key={id}
                  className={`course-card card-${category} rv`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="course-card-top">
                    <div className={`course-icon-container ${category}`}>
                      <RenderIcon name={iconName} size={28} />
                    </div>
                    <span className={`course-category-tag ${category}`}>
                      {category === 'computer' ? t.catLabels.computer : t.catLabels.academic}
                    </span>
                  </div>

                  <div className="course-card-body">
                    <h3 className="course-title">{NAMES[id]}</h3>
                    <p className="course-full-name">{COURSE_FULL_NAMES[id]}</p>
                    <p className="course-desc">{t.cd[id]}</p>
                  </div>

                  <div className="course-card-footer">
                    <span className="course-fee-hint">
                      <Clock size={14} />
                      {t.feeNote}
                    </span>
                    <button
                      type="button"
                      className="course-action-btn"
                      onClick={() => handleEnquireCourse(id)}
                      aria-label={`Enquire about ${NAMES[id]}`}
                    >
                      <span>{t.ask}</span>
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            6. INTERACTIVE COURSE EXPLORER
        ======================================================== */}
        <section id="explorer" className="explorer-section light-section alt-bg">
          <div className="wrap">
            <div className="section-header-centered rv">
              <span className="section-eyebrow">{t.tagline}</span>
              <h2 className="section-title">{t.xT}</h2>
              <p className="section-subtitle">{t.xSub}</p>
            </div>

            <div className="explorer-interactive-box rv">
              {/* Category Selection Tabs */}
              <div className="explorer-categories" role="tablist" aria-label="Explorer categories">
                {t.xCats.map((catLabel, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={explorerCategory === index}
                    className={`explorer-cat-btn ${explorerCategory === index ? 'active' : ''}`}
                    onClick={() => setExplorerCategory(index)}
                  >
                    <div className="cat-btn-inner">
                      <RenderIcon
                        name={['Monitor', 'Keyboard', 'GraduationCap'][index]}
                        size={22}
                      />
                      <span>{catLabel}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Dynamic Results Card */}
              <div className="explorer-result-card" aria-live="polite">
                <div className="result-header">
                  <h3 className="result-heading">{t.xCats[explorerCategory]}</h3>
                  <span className="result-count">
                    {explorerOptions[explorerCategory].courses.length} Programs
                  </span>
                </div>

                <div className="explorer-chips-list">
                  {explorerOptions[explorerCategory].courses.map((courseId) => (
                    <button
                      key={courseId}
                      type="button"
                      className="explorer-chip"
                      onClick={() => handleEnquireCourse(courseId)}
                      title={`Click to enquire about ${NAMES[courseId]}`}
                    >
                      <span className="chip-name">{NAMES[courseId]}</span>
                      <span className="chip-arrow">
                        <ArrowUpRight size={15} />
                      </span>
                    </button>
                  ))}
                </div>

                {explorerCategory === 1 && (
                  <div className="explorer-notice-box">
                    <AlertCircle size={18} className="notice-icon" />
                    <p className="notice-text">{t.xNote}</p>
                  </div>
                )}

                <div className="result-action-row">
                  <p className="result-tip">
                    Click any course above or enquire directly for full syllabus & details:
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEnquireCourse(explorerOptions[explorerCategory].courses[0])}
                  >
                    <span>{t.xDirectAction}</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. WHY CHOOSE US SECTION
        ======================================================== */}
        <section id="why" className="why-section dark-section">
          <div className="wrap">
            <div className="section-header rv">
              <span className="section-eyebrow cyan">{t.wBadge || t.tagline}</span>
              <h2 className="section-title text-white">{t.wT}</h2>
              <p className="section-subtitle text-muted-light">{t.wSub}</p>
            </div>

            <div className="why-grid">
              {t.w.map((item, idx) => {
                const defaultIcons = ['Building2', 'Monitor', 'Keyboard', 'GraduationCap', 'MessageCircle'];
                const iconName = item.icon || defaultIcons[idx] || 'Check';
                return (
                  <div key={idx} className={`why-card why-card-${idx} rv`} style={{ transitionDelay: `${idx * 80}ms` }}>
                    <div className="why-card-top">
                      <div className="why-icon-wrapper">
                        <RenderIcon name={iconName} size={24} />
                      </div>
                      {item.tag && <span className="why-tag-pill">{item.tag}</span>}
                    </div>
                    <div className="why-content">
                      <h3 className="why-title">{item.title}</h3>
                      <p className="why-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            8. FAQ ACCORDION SECTION
        ======================================================== */}
        <section id="faq" className="faq-section light-section">
          <div className="wrap">
            <div className="section-header-centered rv">
              <span className="section-eyebrow">{t.tagline}</span>
              <h2 className="section-title">{t.faqT}</h2>
              <p className="section-subtitle">{t.faqSub}</p>
            </div>

            <div className="faq-accordion-container rv">
              {t.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-btn-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span className="faq-question-text">{faq.q}</span>
                      <span className="faq-icon-holder" aria-hidden="true">
                        <ChevronDown size={20} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      className="faq-answer-pane"
                      style={{ maxHeight: isOpen ? '240px' : '0' }}
                    >
                      <div className="faq-answer-inner">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            9. ENQUIRY FORM (WHATSAPP INTEGRATION)
        ======================================================== */}
        <section id="enquire" className="enquiry-section dark-section">
          <div className="wrap enquiry-layout">
            {/* Left Info Column */}
            <div className="enquiry-info-column rv">
              <span className="section-eyebrow cyan">{t.tagline}</span>
              <h2 className="section-title text-white">{t.fT}</h2>
              <p className="section-subtitle text-muted-light">{t.fP}</p>

              <div className="enquiry-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <strong>Direct Admission Assistance</strong>
                    <p>Transparent communication with Director Sandeep Nagar.</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <strong>Zero Hassle Registration</strong>
                    <p>Enquire instantly on WhatsApp without storing personal data on the web.</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <strong>Course Counseling</strong>
                    <p>Guidance to choose between DCA, PGDCA, CPCT, or degree options.</p>
                  </div>
                </div>
              </div>

              <div className="enquiry-quick-card">
                <Phone size={20} className="quick-icon" />
                <div>
                  <span className="quick-label">Need immediate telephone assistance?</span>
                  <a href={`tel:${PHONE}`} className="quick-phone-link">
                    {DISPLAY_PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="enquiry-form-card rv">
              <form onSubmit={handleSubmit} noValidate className="enquiry-form">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="f-name" className="form-label">
                    {t.name} <span className="req-star">*</span>
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.namePlaceholder}
                    value={formData.name}
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? 'f-name-err' : undefined}
                    className={`form-input ${formErrors.name ? 'invalid' : ''}`}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                    }}
                  />
                  {formErrors.name && (
                    <span id="f-name-err" className="form-error" role="alert">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="f-mob" className="form-label">
                    {t.mob} <span className="req-star">*</span>
                  </label>
                  <input
                    id="f-mob"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={t.mobPlaceholder}
                    value={formData.mob}
                    aria-invalid={!!formErrors.mob}
                    aria-describedby={formErrors.mob ? 'f-mob-err' : undefined}
                    className={`form-input ${formErrors.mob ? 'invalid' : ''}`}
                    onChange={(e) => {
                      setFormData({ ...formData, mob: e.target.value });
                      if (formErrors.mob) setFormErrors({ ...formErrors, mob: null });
                    }}
                  />
                  {formErrors.mob && (
                    <span id="f-mob-err" className="form-error" role="alert">
                      {formErrors.mob}
                    </span>
                  )}
                </div>

                {/* Course Selection */}
                <div className="form-group">
                  <label htmlFor="f-course" className="form-label">
                    {t.course} <span className="req-star">*</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="f-course"
                      value={formData.course}
                      aria-invalid={!!formErrors.course}
                      aria-describedby={formErrors.course ? 'f-course-err' : undefined}
                      className={`form-select ${formErrors.course ? 'invalid' : ''}`}
                      onChange={(e) => {
                        setFormData({ ...formData, course: e.target.value });
                        if (formErrors.course) setFormErrors({ ...formErrors, course: null });
                      }}
                    >
                      <option value="">{t.pick}</option>
                      <optgroup label="Computer Courses">
                        {COURSES.filter((c) => c[1] === 'computer').map(([id]) => (
                          <option key={id} value={id}>
                            {NAMES[id]} — {COURSE_FULL_NAMES[id]}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Academic Degree Programs">
                        {COURSES.filter((c) => c[1] === 'academic').map(([id]) => (
                          <option key={id} value={id}>
                            {NAMES[id]} — {COURSE_FULL_NAMES[id]}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  {formErrors.course && (
                    <span id="f-course-err" className="form-error" role="alert">
                      {formErrors.course}
                    </span>
                  )}
                </div>

                {/* Optional Message */}
                <div className="form-group">
                  <label htmlFor="f-msg" className="form-label">
                    {t.msg}
                  </label>
                  <textarea
                    id="f-msg"
                    rows="3"
                    placeholder={t.msgPlaceholder}
                    value={formData.msg}
                    className="form-textarea"
                    onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="form-group consent-group">
                  <label className="checkbox-label">
                    <input
                      id="f-consent"
                      type="checkbox"
                      checked={formData.consent}
                      aria-invalid={!!formErrors.consent}
                      aria-describedby={formErrors.consent ? 'f-consent-err' : undefined}
                      onChange={(e) => {
                        setFormData({ ...formData, consent: e.target.checked });
                        if (formErrors.consent) setFormErrors({ ...formErrors, consent: null });
                      }}
                    />
                    <span className="checkbox-text">{t.consent}</span>
                  </label>
                  {formErrors.consent && (
                    <span id="f-consent-err" className="form-error" role="alert">
                      {formErrors.consent}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  <MessageCircle size={19} />
                  <span>{t.send}</span>
                </button>

                {/* Success / Status Message */}
                {submittedUrl && (
                  <div className="form-status-box" role="status">
                    <CheckCircle2 size={20} className="status-success-icon" />
                    <div>
                      <p className="status-msg">{t.ok}</p>
                      <a
                        href={submittedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="status-fallback-link"
                      >
                        {t.fb}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ========================================================
            10. CONTACT SECTION
        ======================================================== */}
        <section id="contact" className="contact-section light-section">
          <div className="wrap">
            <div className="section-header-centered rv">
              <span className="section-eyebrow">{t.tagline}</span>
              <h2 className="section-title">{t.cT2}</h2>
              <p className="section-subtitle">{t.cSub}</p>
            </div>

            {/* Contact Action Cards */}
            <div className="contact-cards-grid">
              {/* Phone Card */}
              <a href={`tel:${PHONE}`} className="contact-card rv">
                <div className="contact-card-icon blue">
                  <Phone size={24} />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t.call}</span>
                  <strong className="contact-card-value">{DISPLAY_PHONE}</strong>
                  <span className="contact-card-hint">Mon – Sun (Daytime Hours)</span>
                </div>
                <ArrowRight size={18} className="card-arrow" />
              </a>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card rv"
              >
                <div className="contact-card-icon green">
                  <MessageCircle size={24} />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t.wa}</span>
                  <strong className="contact-card-value">{DISPLAY_PHONE}</strong>
                  <span className="contact-card-hint">Instant Chat & Enquiries</span>
                </div>
                <ArrowRight size={18} className="card-arrow" />
              </a>

              {/* Email Card */}
              <a href={`mailto:${MAIL}`} className="contact-card rv">
                <div className="contact-card-icon cyan">
                  <Mail size={24} />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t.email}</span>
                  <strong className="contact-card-value email-text">{MAIL}</strong>
                  <span className="contact-card-hint">Online Admission Queries</span>
                </div>
                <ArrowRight size={18} className="card-arrow" />
              </a>

              {/* Map Card */}
              <a href={MAP} target="_blank" rel="noopener noreferrer" className="contact-card rv">
                <div className="contact-card-icon purple">
                  <MapPin size={24} />
                </div>
                <div className="contact-card-content">
                  <span className="contact-card-label">{t.map}</span>
                  <strong className="contact-card-value address-text">{t.addr}</strong>
                  <span className="contact-card-hint">Open in Google Maps</span>
                </div>
                <ExternalLink size={18} className="card-arrow" />
              </a>
            </div>

            {/* Campus Info Banner */}
            <div className="campus-banner-card rv">
              <div className="campus-banner-info">
                <div className="campus-icon">
                  <Building2 size={28} />
                </div>
                <div>
                  <h3 className="campus-title">{t.instituteName}</h3>
                  <address className="campus-address">
                    <span>{t.addr}</span>
                    <span className="campus-director">
                      {t.currentDirector}: {t.directorName}
                    </span>
                  </address>
                </div>
              </div>
              <div className="campus-banner-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollTo('enquire')}
                >
                  <span>{t.enq}</span>
                  <ArrowRight size={17} />
                </button>
                <a
                  href={MAP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <MapPin size={17} />
                  <span>{t.map}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          11. PREMIUM FOOTER
      ======================================================== */}
      <footer className="site-footer dark-section">
        <div className="wrap footer-grid">
          {/* Col 1: Institute Brand & Info */}
          <div className="footer-col col-brand">
            <div className="footer-brand">
              <Logo />
              <div>
                <span className="footer-brand-title">{t.instituteName}</span>
                <span className="footer-brand-tag">{t.tagline}</span>
              </div>
            </div>
            <p className="footer-desc">{t.fd}</p>
            <div className="footer-director-note">
              <span>{t.currentDirector}:</span> <strong>{t.directorName}</strong>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">{t.quickLinks}</h4>
            <ul className="footer-links-list">
              {t.navIds.map((id, index) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(id);
                    }}
                  >
                    {t.nav[index]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programs Links */}
          <div className="footer-col">
            <h4 className="footer-heading">{t.courseLinks}</h4>
            <ul className="footer-links-list">
              {COURSES.map(([id]) => (
                <li key={id}>
                  <button
                    type="button"
                    className="footer-course-link"
                    onClick={() => handleEnquireCourse(id)}
                  >
                    <span>{NAMES[id]}</span>
                    <ArrowUpRight size={13} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="footer-col col-contact">
            <h4 className="footer-heading">{t.contactInfo}</h4>
            <div className="footer-contact-details">
              <a href={`tel:${PHONE}`} className="footer-contact-item">
                <Phone size={16} />
                <span>{DISPLAY_PHONE}</span>
              </a>
              <a
                href={`https://wa.me/${PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <MessageCircle size={16} />
                <span>WhatsApp ({DISPLAY_PHONE})</span>
              </a>
              <a href={`mailto:${MAIL}`} className="footer-contact-item">
                <Mail size={16} />
                <span className="email-wrap">{MAIL}</span>
              </a>
              <div className="footer-contact-item address-item">
                <MapPin size={16} />
                <span>{t.addr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="wrap footer-bottom-inner">
            <p className="copyright-text">
              © {new Date().getFullYear()} {t.instituteName}. {t.copyright}
            </p>
            <div className="footer-bottom-actions">
              <button
                type="button"
                className="footer-lang-btn"
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              >
                <Languages size={15} />
                <span>{lang === 'en' ? 'हिंदी में देखें' : 'View in English'}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
