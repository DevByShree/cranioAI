import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import faceImg from '../../assets/image.png'
import logoImg from '../../assets/logo.png'

const features = [
  { icon: 'scan', title: 'AI-Powered Analysis', desc: 'Advanced facial recognition detects 68+ landmark points for precise symmetry measurement.' },
  { icon: 'cube', title: '3D Visualization', desc: 'View your facial structure in interactive 3D models with real-time rotation and zoom.' },
  { icon: 'bulb', title: 'Personalized Plan', desc: 'Get custom exercise recommendations based on your unique facial asymmetry pattern.' },
  { icon: 'trending', title: 'Track Progress', desc: 'Monitor improvements over time with detailed analytics and progress charts.' },
]

const steps = [
  { num: '01', title: 'Upload Your Photo', desc: 'Take or upload a clear front-facing photo of your face.' },
  { num: '02', title: 'AI Analysis', desc: 'Our AI engine analyzes facial symmetry in seconds.' },
  { num: '03', title: 'View Results', desc: 'See your symmetry score and 3D visualization.' },
  { num: '04', title: 'Get Recommendations', desc: 'Receive personalized exercises to improve symmetry.' },
]

const stats = [
  { value: '10K+', label: 'Happy Users' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '50K+', label: 'Analyses Completed' },
  { value: '4.9', label: 'Average Rating' },
]

const testimonials = [
  { quote: 'CranioAI helped me understand my facial symmetry in ways I never imagined. The 3D visualization is incredible!', name: 'Dr. Emily Carter', role: 'Dental Surgeon' },
  { quote: 'As a plastic surgeon, this tool has become essential for consultations. Patients love seeing the visual analysis.', name: 'Dr. James Wilson', role: 'Plastic Surgeon' },
  { quote: 'The personalized exercise recommendations actually improved my facial symmetry over 3 months. Amazing!', name: 'Sarah Mitchell', role: 'Fitness Coach' },
]

const iconPaths = {
  scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" /></>,
  cube: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></>,
  bulb: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6M10 22h4" /></>,
  trending: <><path d="M22 7 13.5 15.5 8.5 10.5 2 17" /><path d="M16 7h6v6" /></>,
  check: <><path d="M20 6 9 17l-5-5" /></>,
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="home">
      {/* ---------- Navbar ---------- */}
      <nav className={`home-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="home-nav-inner">
          <Link to="/" className="home-brand">
            <div className="home-brand-logo">
              {/* <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a9 9 0 0 1 0 18M12 3a9 9 0 0 0 0 18" />
              </svg> */}
              <img src={logoImg} alt="Logo" />
            </div>
            <div>
              <span>CranioAI</span>
              <div>3D Face Analysis</div>
            </div>
          </Link>
          <div className="home-nav-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="home-nav-actions">
            {/* <Link to="/login" className="home-login-btn">Login</Link> */}
            <Link to="/login" className="home-btn-outline ">Login</Link>
            <Link to="/signup" className="home-cta-btn">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ---------- Hero ---------- */}
      <section className="home-hero" id="home">
        <div className="home-hero-bg" />
        <div className="home-hero-inner">
          <div className="home-hero-left">
            <div className="home-hero-badge">
              <span className="home-badge-dot" />
              AI Powered Facial Symmetry Analysis
            </div>
            <h1 className="home-hero-title">
              Discover Your <div className="home-hero-highlight">Best Version.</div>
            </h1>
            <p className="home-hero-desc">
              Advanced AI technology analyzes your facial symmetry with precision, providing
              personalized insights and 3D visualizations to help you understand and enhance
              your natural beauty.
            </p>
            <div className="home-hero-cta">
              <Link to="/dashboard/analyzer" className="home-btn-primary">
                Analyze Your Face
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <a href="#how" className="home-btn-outline">See How It Works</a>
            </div>
            <div className="home-hero-pills">
              <span className="home-pill"><span className="home-pill-dot" />AI Powered</span>
              <span className="home-pill"><span className="home-pill-dot" />3D Visualization</span>
              <span className="home-pill"><span className="home-pill-dot" />Personalized Plan</span>
              <span className="home-pill"><span className="home-pill-dot" />Track Progress</span>
            </div>
          </div>

          <div className="home-hero-right">
            {/* <div className="home-hero-img-wrap"> */}
              {/* </div> */}
              {/* <div className="home-scan-line" />
              <div className="home-scan-dot top-left" />
              <div className="home-scan-dot top-right" />
              <div className="home-scan-dot bottom-left" />
              <div className="home-scan-dot bottom-right" /> */}
              <img src={faceImg} alt="Face analysis" className="home-hero-img" />


            <div className='home-float-cards' >

              <div className="home-float-card">
                <div className="home-float-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                </div>
                <div>
                  <div className="home-float-label">Symmetry Score</div>
                  <div className="home-float-value">87%</div>
                </div>
              </div>
              <div className="home-float-card">
                <div className="home-float-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M3 12h18" /></svg>
                </div>
                <div>
                  <div className="home-float-label">Left/Right Balance</div>
                  <div className="home-float-value">85%</div>
                </div>
              </div>
              <div className="home-float-card">
                <div className="home-float-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                </div>
                <div>
                  <div className="home-float-label">3D Face Model</div>
                  <div className="home-float-value">Ready</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ---------- Why Choose ---------- */}
      <section className="home-section" id="features">
        <div className="home-section-head">
          <span className="home-section-tag">Why Choose CranioAI</span>
          <h2 className="home-section-title">Advanced Technology, <span className="home-text-green">Real Results</span></h2>
          <p className="home-section-desc">Cutting-edge AI meets facial aesthetics in one powerful platform</p>
        </div>
        <div className="home-feature-grid">
          {features.map((f) => (
            <div className="home-feature-card" key={f.title}>
              <div className="home-feature-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {iconPaths[f.icon]}
                </svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- How It Works ---------- */}
      <section className="home-section home-how" id="how">
        <div className="home-section-head">
          <span className="home-section-tag">How It Works</span>
          <h2 className="home-section-title">Simple Process, <span className="home-text-green">Powerful Insights</span></h2>
          <p className="home-section-desc">Get your facial symmetry analysis in four easy steps</p>
        </div>
        <div className="home-steps">
          {steps.map((s, i) => (
            <div className="home-step" key={s.num}>
              <div className="home-step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="home-step-connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 3D Visualization Section ---------- */}
      <section className="home-section" id="about">
        <div className="home-viz-card">
          <div className="home-viz-left">
            <span className="home-section-tag">3D Visualization</span>
            <h2 className="home-section-title">See Your Face <span className="home-text-green">In 3D</span></h2>
            <p className="home-section-desc">
              Explore your facial structure from every angle with our interactive 3D modeling technology.
            </p>
            <ul className="home-viz-bullets">
              <li><span className="home-check"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg></span>360° rotation and zoom</li>
              <li><span className="home-check"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg></span>Wireframe mesh overlay</li>
              <li><span className="home-check"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg></span>Before/after comparison</li>
              <li><span className="home-check"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg></span>Downloadable reports</li>
            </ul>
            <Link to="/dashboard/visualization" className="home-btn-primary">Try 3D Viewer
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="home-viz-center">
            <div className="home-viz-face">
              <svg viewBox="0 0 200 240" width="100%" height="100%">
                <ellipse cx="100" cy="120" rx="70" ry="100" fill="none" stroke="rgba(108,240,174,0.4)" strokeWidth="1" />
                <ellipse cx="100" cy="120" rx="55" ry="85" fill="none" stroke="rgba(108,240,174,0.3)" strokeWidth="1" />
                <ellipse cx="100" cy="120" rx="40" ry="65" fill="none" stroke="rgba(108,240,174,0.2)" strokeWidth="1" />
                <line x1="100" y1="20" x2="100" y2="220" stroke="rgba(108,240,174,0.5)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="30" y1="120" x2="170" y2="120" stroke="rgba(108,240,174,0.5)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="80" cy="95" r="5" fill="rgba(108,240,174,0.6)" />
                <circle cx="120" cy="95" r="5" fill="rgba(108,240,174,0.6)" />
                <path d="M 90 140 Q 100 150 110 140" fill="none" stroke="rgba(108,240,174,0.6)" strokeWidth="1.5" />
                <path d="M 85 165 Q 100 175 115 165" fill="none" stroke="rgba(108,240,174,0.6)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="home-viz-right">
            <div className="home-viz-compare">
              <div className="home-viz-compare-label">Before</div>
              <div className="home-viz-compare-face">
                <svg viewBox="0 0 100 120" width="100%" height="100%">
                  <ellipse cx="50" cy="60" rx="35" ry="50" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
                  <circle cx="38" cy="48" r="3" fill="var(--text-muted)" />
                  <circle cx="62" cy="50" r="3" fill="var(--text-muted)" />
                  <path d="M 42 75 Q 50 80 58 75" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="home-viz-compare-score">72%</div>
            </div>
            <div className="home-viz-compare after">
              <div className="home-viz-compare-label">After</div>
              <div className="home-viz-compare-face">
                <svg viewBox="0 0 100 120" width="100%" height="100%">
                  <ellipse cx="50" cy="60" rx="35" ry="50" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                  <circle cx="38" cy="48" r="3" fill="var(--accent)" />
                  <circle cx="62" cy="48" r="3" fill="var(--accent)" />
                  <path d="M 42 75 Q 50 80 58 75" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="home-viz-compare-score green">89%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="home-section home-stats-section">
        <div className="home-stats">
          {stats.map((s) => (
            <div className="home-stat" key={s.label}>
              <div className="home-stat-value">{s.value}</div>
              <div className="home-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="home-section" id="testimonials">
        <div className="home-section-head">
          <span className="home-section-tag">Testimonials</span>
          <h2 className="home-section-title">What Our <span className="home-text-green">Users Say</span></h2>
        </div>
        <div className="home-testimonial">
          <div className="home-testimonial-quote">&ldquo;{testimonials[activeTestimonial].quote}&rdquo;</div>
          <div className="home-testimonial-author">
            <div className="home-testimonial-avatar">{testimonials[activeTestimonial].name.charAt(0)}</div>
            <div>
              <div className="home-testimonial-name">{testimonials[activeTestimonial].name}</div>
              <div className="home-testimonial-role">{testimonials[activeTestimonial].role}</div>
            </div>
          </div>
          <div className="home-testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`home-dot ${i === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA Banner ---------- */}
      <section className="home-section">
        <div className="home-cta-banner">
          <h2>Ready to Discover a Better You?</h2>
          <p>Join thousands of users who have transformed their understanding of facial symmetry</p>
          <Link to="/signup" className="home-cta-banner-btn">
            Get Started Now
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="home-footer" id="contact">
        <div className="home-footer-inner">
          <div className="home-footer-col">
            <Link to="/" className="home-brand">
              <div className="home-brand-logo">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a9 9 0 0 1 0 18M12 3a9 9 0 0 0 0 18" />
                </svg>
              </div>
              <span>CranioAI</span>
            </Link>
            <p className="home-footer-desc">AI-powered facial symmetry analysis for everyone.</p>
          </div>
          <div className="home-footer-col">
            <h4>Products</h4>
            <a href="#">Face Analyzer</a>
            <a href="#">3D Visualization</a>
            <a href="#">Progress Tracking</a>
            <a href="#">API Access</a>
          </div>
          <div className="home-footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Press</a>
          </div>
          <div className="home-footer-col">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="home-footer-col">
            <h4>Stay Updated</h4>
            <p className="home-footer-desc">Get the latest updates and offers.</p>
            <div className="home-footer-form">
              <input type="email" placeholder="Your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="home-footer-bottom">
          <p>© 2024 CranioAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
