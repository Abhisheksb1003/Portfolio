import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

/* ═══════════════════════════════════════════════════════════════════
   DATA (Updated Dates)
═══════════════════════════════════════════════════════════════════ */
const NAV_LINKS = ['About', 'Skills', 'Projects', 'Certifications', 'Contact'];

const TIMELINE = [
  {
    icon: '🎓', year: '2020 – 2023',
    title: 'B.E. Computer Science — VTU',
    desc: 'Graduated with CGPA 8.10 from Visvesvaraya Technological University, Karnataka.',
  },
  {
    icon: '📚', year: '2026',
    title: 'Full-Stack Web Development Course',
    desc: 'Intensive certification covering React.js, Node.js, Express.js, PostgreSQL and modern JavaScript (ES6+). Completed February 15, 2026.',
  },
  {
    icon: '🤖', year: '2026',
    title: 'AI Literacy Certification — Credly',
    desc: 'Certified in AI foundations, machine learning concepts and AI ethics. Completed May 15, 2026. Verified badge on Credly.',
  },
  {
    icon: '🐍', year: '2023',
    title: 'Python Programming Certification',
    desc: 'Advanced Python, data structures, algorithms & real-world application development. Completed September 2023.',
  },
  {
    icon: '💼', year: '2026 – Present',
    title: 'Frontend Developer — Aspirant League',
    desc: 'Building and maintaining production-grade React UIs for education & job platforms. Started April 2026.',
  },
];

const SKILLS = [
  { cat: 'Frontend', icon: '🎨', rgb: '100,108,255',   tags: ['React.js', 'Next.js', 'Redux', 'React Router', 'HTML5', 'CSS3', 'Responsive Design'] },
  { cat: 'Backend',  icon: '⚙️', rgb: '0,255,163',   tags: ['Node.js', 'Express.js', 'REST APIs', 'API Integration'] },
  { cat: 'Database', icon: '🗄️', rgb: '255,71,87',  tags: ['PostgreSQL', 'SQL', 'Firebase', 'CRUD Ops'] },
  { cat: 'Languages',icon: '💻', rgb: '0,200,255',  tags: ['JavaScript ES6+', 'Python', 'HTML5', 'CSS3'] },
  { cat: 'Dev Tools',icon: '🛠️', rgb: '255,159,28',  tags: ['Git / GitHub', 'VS Code', 'Postman', 'Chrome DevTools'] },
  { cat: 'Core',     icon: '🧠', rgb: '193,105,255',  tags: ['DSA', 'OOP', 'System Design'] },
];

const PROJECTS = [
  {
    name: 'Aspirant League Platform',
    emoji: '🏆', year: '2026 – Present', isLive: true, featured: true,
    url: 'https://aspirantleague.com',
    gh: 'https://github.com/Abhisheksb1003',
    rgb: '100,108,255',
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
    pts: [
      'Education platform serving 10,000+ monthly active users with 99.9% uptime',
      'Improved page load times by 40% through code splitting, lazy loading & Core Web Vitals',
      'Built real-time notification system & dynamic content delivery with PostgreSQL backend',
      'Implemented responsive design across all devices for seamless user experience',
    ],
  },
  {
    name: 'Sarkari League Portal',
    emoji: '🏛️', year: '2026 – Present', isLive: true, featured: false,
    url: 'https://sarkarileague.com',
    gh: 'https://github.com/Abhisheksb1003',
    rgb: '0,255,163',
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'React Router'],
    pts: [
      'Job portal with advanced search, filtering & user profile management',
      'Integrated external APIs for real-time job listings with automated sync',
      'Accessible responsive UI across desktop, tablet & mobile',
    ],
  },
  {
    name: 'Mail Box App',
    emoji: '📬', year: '2023 – 2024', isLive: false, featured: false,
    gh: 'https://github.com/Abhisheksb1003/Mail-box',
    rgb: '255,71,87',
    stack: ['React.js', 'Redux', 'Firebase', 'CSS3'],
    pts: [
      'Full-featured email client — compose, inbox, sent & trash folders',
      'Real-time mail sync with Firebase & Redux state management',
      'Gmail-inspired responsive UI with smooth transitions',
    ],
  },
  {
    name: 'E-Commerce App',
    emoji: '🛍️', year: '2023 – 2024', isLive: false, featured: false,
    gh: 'https://github.com/Abhisheksb1003/E-commerce-app',
    rgb: '0,200,255',
    stack: ['React.js', 'Redux', 'Node.js', 'CSS3'],
    pts: [
      'Full shopping flow — product listing, cart & checkout',
      'Redux-powered cart with persistent state across sessions',
      'Mobile-first UI with category filtering & search',
    ],
  },
  {
    name: 'Restaurant Website',
    emoji: '🍽️', year: '2023 – 2024', isLive: false, featured: false,
    gh: 'https://github.com/Abhisheksb1003/Restaurant-Website',
    rgb: '255,159,28',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    pts: [
      'Pixel-perfect responsive landing page with menu sections',
      'Smooth scroll animations & elegant typography hierarchy',
      'Reservation form with client-side validation',
    ],
  },
  {
    name: 'Expense Tracker',
    emoji: '💰', year: '2023 – 2024', isLive: false, featured: false,
    gh: 'https://github.com/Abhisheksb1003/Expense-tracker-app',
    rgb: '193,105,255',
    stack: ['React.js', 'Redux', 'Chart.js', 'CSS3'],
    pts: [
      'Track income & expenses with categorized visual charts',
      'Chart.js analytics for spending pattern insights',
      'Persistent data via localStorage with minimal clean UI',
    ],
  },
];

const CERTS = [
  {
    icon: '🤖', year: '2026', rgb: '0,255,163',
    name: 'AI Literacy Certification',
    desc: 'AI foundations, ML concepts & AI ethics — completed May 15, 2026. Verified badge on Credly.',
    link: 'https://www.credly.com/badges/4635eb8c-bf53-430c-8804-01fbc25014a2/print',
    label: 'Verify on Credly ↗',
  },
  {
    icon: '📚', year: '2026', rgb: '100,108,255',
    name: 'Full-Stack Web Development',
    desc: 'Comprehensive training in React.js, Node.js, Express.js, PostgreSQL & modern JS. Completed February 15, 2026.',
    link: 'https://drive.google.com/file/d/1LdSuz9wxLaHNlFGZhs-tZg0i-c_KI4wa/view',
    label: 'View Certificate ↗',
  },
  {
    icon: '🐍', year: '2023', rgb: '0,200,255',
    name: 'Python Programming',
    desc: 'Advanced Python, data structures, algorithms & real-world application development. Completed September 2023.',
    link: 'https://drive.google.com/file/d/1S-o1h8ot7n-L4cf3YwuCxKS_uvAZG6GO/view',
    label: 'View Certificate ↗',
  },
];

const MARQUEE_ITEMS = [
  'React.js', 'JavaScript ES6+', 'Node.js', 'PostgreSQL',
  'HTML5', 'CSS3', 'Express.js', 'Git & GitHub',
  'REST APIs', 'Redux', 'Tailwind CSS', 'TypeScript', 'Responsive Design',
];

const ROLES = ['Frontend Developer', 'React.js Specialist', 'UI/UX Enthusiast', 'Open to New Roles ✨'];


/* ═══════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════ */
function useTypewriter(words, speed = 75, pause = 2000) {
  const [text, setText] = useState('');
  const [wi, setWi]     = useState(0);
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const current = words[wi];
    const delay = del ? speed / 2 : speed;
    const id = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), pause);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') { setDel(false); setWi(w => (w + 1) % words.length); }
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, del, wi, words, speed, pause]);

  return text;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}


/* ═══════════════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════════════ */
function Cursor() {
  const dot   = useRef(null);
  const trail = useRef(null);
  const pos   = useRef({ x: 0, y: 0 });
  const tpos  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    let raf;
    const animate = () => {
      if (dot.current) {
        dot.current.style.left = pos.current.x + 'px';
        dot.current.style.top  = pos.current.y + 'px';
      }
      tpos.current.x += (pos.current.x - tpos.current.x) * 0.12;
      tpos.current.y += (pos.current.y - tpos.current.y) * 0.12;
      if (trail.current) {
        trail.current.style.left = tpos.current.x + 'px';
        trail.current.style.top  = tpos.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="cursor" ref={dot} />
      <div className="cursor-trail" ref={trail} />
    </>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════════ */
function Nav({ scrolled }) {
  const go = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#home" className="nav-logo" onClick={e => { e.preventDefault(); go('home'); }}>
        Abhishek<span className="dot">.</span>
      </a>
      <ul className="nav-links">
        {NAV_LINKS.map(n => (
          <li key={n}>
            <a href={`#${n.toLowerCase()}`}
               onClick={e => { e.preventDefault(); go(n.toLowerCase()); }}>
              {n}
            </a>
          </li>
        ))}
      </ul>
      <a href="mailto:abhishekbikkannavar1@gmail.com" className="nav-cta">
        Hire Me 🚀
      </a>
    </nav>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   HERO CODE CARD
═══════════════════════════════════════════════════════════════════ */
function CodeCard() {
  return (
    <div className="code-card">
      <div className="code-dots"><span /><span /><span /></div>
      <div className="cline"><span className="ck">const</span> <span className="cv">developer</span> <span> = {'{'}</span></div>
      <div className="cline ci"><span className="cs">name</span><span>: </span><span className="cx">"Abhishek S Bikkannavar"</span><span>,</span></div>
      <div className="cline ci"><span className="cs">role</span><span>: </span><span className="cx">"Frontend Developer"</span><span>,</span></div>
      <div className="cline ci"><span className="cs">company</span><span>: </span><span className="cx">"Aspirant League"</span><span>,</span></div>
      <div className="cline ci"><span className="cs">location</span><span>: </span><span className="cx">"Bangalore, India"</span><span>,</span></div>
      <div className="cline ci"><span className="cs">stack</span><span>: [</span></div>
      <div className="cline ci2"><span className="cx">"React.js"</span><span>, </span><span className="cx">"Redux"</span><span>,</span></div>
      <div className="cline ci2"><span className="cx">"Node.js"</span><span>, </span><span className="cx">"PostgreSQL"</span></div>
      <div className="cline ci"><span>],</span></div>
      <div className="cline ci"><span className="cs">openToWork</span><span>: </span><span className="cn">true</span><span>,</span></div>
      <div className="cline ci"><span className="cs">users</span><span>: </span><span className="cn">10_000</span><span>, </span><span className="cs">uptime</span><span>: </span><span className="cx">"99.9%"</span></div>
      <div className="cline"><span>{'}'}</span><span className="cm"> // always building</span></div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════ */
function Hero() {
  const role = useTypewriter(ROLES, 75, 2000);

  return (
    <section className="hero" id="home">
      {/* LEFT */}
      <div className="hero-left">
        <div className="hero-badge">
          <span className="badge-dot" />
          Available for Opportunities
        </div>

        <h1 className="hero-title">
          <span className="name-line">Abhishek S</span>
          <span className="name-colored">Bikkannavar</span>
        </h1>

        <p className="hero-role">
          &gt;&nbsp;{role}<span className="blink">_</span>
        </p>

        <p className="hero-desc">
          <strong>Frontend Developer</strong> with <span className="accent">1+ year</span> 
          experience at Aspirant League,Certified in Full-Stack Development &amp; AI Literacy.
        </p>

        <div className="hero-btns">
          <a href="#projects"
             className="btn-primary"
             onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Projects ↓
          </a>
          <a href="https://github.com/Abhisheksb1003" target="_blank" rel="noopener noreferrer"
             className="btn-ghost">
            GitHub ↗
          </a>
        </div>

        <div className="hero-stats">
          {[
            ['20+', 'Projects'],
            ['1+', 'Yr Exp'],
          ].map(([n, l]) => (
            <div className="hstat" key={l}>
              <span className="hstat-n">{n}</span>
              <span className="hstat-l">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-right-panel">
        <div className="hero-geo">
          <div className="hero-geo-ring" />
          <div className="hero-geo-ring" />
          <div className="hero-geo-ring" />
        </div>
        <div className="hero-card-wrap">
          <CodeCard />
        </div>
        <div className="fchip fchip-1"><span>⚛️</span> React.js</div>
        <div className="fchip fchip-2"><span>🎨</span> UI / UX</div>
        <div className="fchip fchip-3"><span>🤖</span> AI Certified</div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════════════════ */
function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            {i < doubled.length - 1 && <span className="marquee-sep">◆</span>}
          </span>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════════ */
function About() {
  return (
    <div className="about-wrap" id="about">
      <div className="section">
        <div className="sec-header reveal">
          <div className="sec-eyebrow">Who I Am</div>
          <h2 className="sec-title">Building <span className="hl">Interfaces</span> That Scale</h2>
        </div>

        <div className="about-grid">
          {/* avatar */}
          <div className="avatar-block reveal-l">
            <div className="avatar-box">
              <div className="av-mesh" />
              <div className="av-ring av-ring-1" />
              <div className="av-ring av-ring-2" />
              <span className="av-initials">ASB</span>
              <span className="av-label">FRONTEND DEV</span>
            </div>

            <div className="quick-info">
              {[
                ['📍', 'Bangalore, India'],
                ['🎓', 'B.E. CS — VTU (8.10 CGPA)'],
                ['💼', 'Aspirant League · 1+ yr'],
                ['🚀', 'Open to Opportunities'],
              ].map(([ic, txt]) => (
                <div className="qinfo" key={txt}>
                  <span className="qinfo-icon">{ic}</span>
                  <span>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* content */}
          <div className="about-content reveal-r">
            <p className="about-intro">
              I'm a passionate <strong>Frontend Developer</strong> from Bangalore, India with{' '}
              <span className="g">1+ year of production experience</span>. I work at{' '}
              <span className="g">Aspirant League</span> where I craft the React interfaces
              that serve thousands of students and job seekers daily.
            </p>
            <p className="about-intro">
              After earning my B.E. in Computer Science from VTU with a <strong>CGPA of 8.10</strong>,
              I completed a rigorous full-stack development course — building 20+ real-world projects
              along the way. I love the challenge of turning complex requirements into clean,
              performant UI experiences.
            </p>

            <div className="timeline">
              {TIMELINE.map((t, i) => (
                <div className="tl-item reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="tl-dot">{t.icon}</div>
                  <div>
                    <div className="tl-yr">{t.year}</div>
                    <div className="tl-tit">{t.title}</div>
                    <div className="tl-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════════════════ */
function Skills() {
  return (
    <div className="skills-wrap" id="skills">
      <div className="skills-inner">
        <div className="sec-header reveal">
          <div className="sec-eyebrow">Tech Stack</div>
          <h2 className="sec-title">My <span className="hl">Arsenal</span></h2>
        </div>

        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div
              className="skill-card reveal"
              key={s.cat}
              style={{ '--skc': s.rgb, transitionDelay: `${i * 0.07}s` }}
            >
              <div className="sk-icon">{s.icon}</div>
              <div className="sk-name">{s.cat}</div>
              <div className="sk-pills">
                {s.tags.map(t => <span className="sk-pill" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════════════════════ */
function Projects() {
  return (
    <div className="projects-outer" id="projects">
      <div className="projects-inner">
        <div className="sec-header reveal">
          <div className="sec-eyebrow">Portfolio</div>
          <h2 className="sec-title">Featured <span className="hl">Projects</span></h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              className={`proj-card reveal${p.featured ? ' featured' : ''}`}
              key={p.name}
              style={{ '--pc': p.rgb, transitionDelay: `${i * 0.1}s` }}
            >
              <div className="proj-visual">
                <div className="proj-visual-grid" />
                <span className="proj-emoji">{p.emoji}</span>
              </div>
              <div>
                <div className="proj-top-bar" />
                <div className="proj-body">
                  <div className="proj-meta">
                    <span className="proj-yr">{p.year}</span>
                    {p.isLive && <span className="proj-live-dot">LIVE</span>}
                  </div>
                  <h3 className="proj-name">{p.name}</h3>
                  <div className="proj-tags">
                    {p.stack.map(s => <span className="proj-tag" key={s}>{s}</span>)}
                  </div>
                  <ul className="proj-pts">
                    {p.pts.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                  <div className="proj-actions">
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="plink plink-live">
                        🌐 Live Site
                      </a>
                    )}
                    <a href={p.gh} target="_blank" rel="noopener noreferrer" className="plink plink-gh">
                      ⌥ GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="github-cta reveal">
          <p>…and <strong>20+ more projects</strong> available on GitHub</p>
          <a href="https://github.com/Abhisheksb1003" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            View All Projects ↗
          </a>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   CERTIFICATIONS
═══════════════════════════════════════════════════════════════════ */
function Certifications() {
  return (
    <div className="certs-outer" id="certifications">
      <div className="certs-inner">
        <div className="sec-header reveal">
          <div className="sec-eyebrow">Credentials</div>
          <h2 className="sec-title">Certifications <span className="hl">&amp; Courses</span></h2>
        </div>

        <div className="certs-grid">
          {CERTS.map((c, i) => (
            <div
              className="cert-card reveal"
              key={c.name}
              style={{ '--cc': c.rgb, transitionDelay: `${i * 0.1}s` }}
            >
              <div className="cert-glow-bg" />
              <div className="cert-icon-box">{c.icon}</div>
              <span className="cert-yr">{c.year}</span>
              <h3 className="cert-name">{c.name}</h3>
              <p className="cert-desc">{c.desc}</p>
              <a href={c.link} target="_blank" rel="noopener noreferrer" className="cert-btn">
                {c.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <div className="contact-outer" id="contact">
      <div className="contact-inner">
        <div className="sec-header reveal">
          <div className="sec-eyebrow">Get In Touch</div>
          <h2 className="sec-title">Let's <span className="hl">Work Together</span></h2>
        </div>

        <div className="contact-grid">
          <div className="reveal-l">
            <h3 className="contact-headline">
              Looking for a<br /><span className="g">Frontend Developer</span> 🚀
            </h3>
            <p className="contact-sub">
              I'm actively seeking frontend, UI, or full-stack developer roles. Whether you
              have a project, a position, or just want to connect — I'd love to hear from you!
            </p>

            <div className="clinks">
              {[
                { icon: '📧', lbl: 'EMAIL', val: 'abhishekbikkannavar1@gmail.com', href: 'mailto:abhishekbikkannavar1@gmail.com' },
                { icon: '📱', lbl: 'PHONE', val: '+91 9113032141', href: 'tel:+919113032141' },
                { icon: '💻', lbl: 'GITHUB', val: 'github.com/Abhisheksb1003', href: 'https://github.com/Abhisheksb1003' },
                { icon: '📍', lbl: 'LOCATION', val: 'Bangalore, India', href: '#' },
              ].map(l => (
                <a key={l.lbl} href={l.href}
                   target={l.href.startsWith('http') ? '_blank' : '_self'}
                   rel="noopener noreferrer" className="clink">
                  <div className="clink-ic">{l.icon}</div>
                  <div>
                    <div className="clink-lbl">{l.lbl}</div>
                    <div className="clink-val">{l.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="form-box reveal-r">
            <div className="form-row">
              <div className="fg">
                <label className="flbl">YOUR NAME</label>
                <input className="finput" placeholder="John Doe" />
              </div>
              <div className="fg">
                <label className="flbl">EMAIL ADDRESS</label>
                <input className="finput" type="email" placeholder="john@company.com" />
              </div>
            </div>
            <div className="fg">
              <label className="flbl">SUBJECT</label>
              <input className="finput" placeholder="Job Opportunity / Collaboration" />
            </div>
            <div className="fg">
              <label className="flbl">MESSAGE</label>
              <textarea className="ftextarea" placeholder="Hi Abhishek, I'd love to discuss..." />
            </div>
            <a
              href="mailto:abhishekbikkannavar1@gmail.com?subject=Opportunity from Portfolio"
              className="btn-send"
            >
              Send Message ✉️
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      
      <Cursor />
      <Nav scrolled={scrolled} />

      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />

      <footer className="footer">
        <span className="footer-logo">Abhishek S Bikkannavar<span className="dot">.</span></span>
        <p>Frontend Developer · Bangalore, India</p>
        <p>Specialized in React.js · Open to opportunities 🚀</p>
        <div className="footer-copy">© 2026 Abhishek S Bikkannavar. All rights reserved.</div>
      </footer>
    </>
  );
}