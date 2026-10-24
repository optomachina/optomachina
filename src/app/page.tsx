"use client";

import { useEffect, useRef, useState } from "react";

interface Project {
  slug: string;
  title: string;
  sector: string;
  partner: string;
  summary: string;
  wins: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  link?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    slug: "lsst",
    title: "LSST Lens and Metrology Tooling",
    sector: "Astronomy",
    partner: "Arizona Optical Systems",
    summary:
      "Mechanical design and metrology tooling tied to the LSST large-lens program, supporting inspection, handling, and alignment work on one of the most ambitious optics programs on the planet.",
    wins: [
      "Large-optics tooling for a flagship observatory program",
      "Precision hardware built around inspection and alignment reality",
    ],
    tags: ["Large Optics", "Metrology", "SolidWorks", "Alignment"],
    image: "/portfolio/lsst.jpg",
    imageAlt: "Large Synoptic Survey Telescope portfolio image",
    featured: true,
    link: "https://en.wikipedia.org/wiki/Vera_C._Rubin_Observatory",
  },
  {
    slug: "dkist",
    title: "DKIST Mirror Mounts",
    sector: "Astronomy",
    partner: "National Solar Observatory",
    summary:
      "Mirror mount and adjustment hardware for the world’s largest solar telescope, balancing stiffness, thermal load, adjustability, and manufacturability.",
    wins: [
      "Technician-friendly alignment hardware",
      "Designed around brutal solar thermal constraints",
    ],
    tags: ["Mirror Mounts", "FEA", "Thermal", "Observatory"],
    image: "/portfolio/dkist.jpg",
    imageAlt: "DKIST observatory engineering render",
    featured: true,
    link: "https://en.wikipedia.org/wiki/Daniel_K._Inouye_Solar_Telescope",
  },
  {
    slug: "elisa",
    title: "eLISA Testbed Telescope",
    sector: "Aerospace",
    partner: "NASA Goddard",
    summary:
      "Opto-mechanical hardware and flexure work for a gravitational-wave observatory testbed, where precision, stiffness, and documentation all mattered at once.",
    wins: [
      "FEA-backed flexure design",
      "Manufacturing package for advanced optical hardware",
    ],
    tags: ["Flexures", "FEA", "Space", "Opto-Mechanical"],
    image: "/portfolio/elisa.jpg",
    imageAlt: "eLISA testbed hardware from Blaine's portfolio",
    featured: true,
  },
  {
    slug: "restore-l",
    title: "Restore-L / OSAM-1 Satellite Work",
    sector: "Aerospace",
    partner: "Malin Space Systems / NASA",
    summary:
      "Opto-mechanical design work tied to NASA’s on-orbit servicing effort, supporting precision space hardware where packaging and integration discipline matter.",
    wins: [
      "Flight-program hardware support",
      "Precision packaging for space systems",
    ],
    tags: ["Satellite", "NASA", "Optical Systems", "Space"],
    image: "/portfolio/restore-l.jpg",
    imageAlt: "NASA Restore-L satellite render",
    link: "https://www.nasa.gov/feature/nasa-s-restore-l-mission-to-refuel-landsat-7-demonstrate-crosscutting-technologies/",
  },
  {
    slug: "pace-lens-system",
    title: "PACE UVNIR Spectrograph Lens Assembly",
    sector: "Aerospace",
    partner: "Ruda-Cardinal / NASA PACE",
    summary:
      "Mechanical and optical drafting work for the Plankton, Aerosol, Cloud, ocean Ecosystem mission lens assembly, including mechanical components, optical drawings, and technician-facing alignment tooling.",
    wins: [
      "ASME Y14.5 and ISO 10110 drawing package for flight-program optics",
      "Alignment tooling developed with technician feedback",
    ],
    tags: ["PACE", "Space Optics", "ISO 10110", "Alignment Tooling"],
    image: "/portfolio/pace-lens-barrel.jpg",
    imageAlt: "PACE UVNIR spectrograph lens barrel from Blaine's portfolio",
    featured: true,
    link: "https://pace.oceansciences.org/",
  },
  {
    slug: "sgt-weather-satellite",
    title: "SGT Weather Satellite Optics",
    sector: "Aerospace",
    partner: "Ruda-Cardinal / SGT",
    summary:
      "Opto-mechanical design and drafting support for weather-satellite optical hardware, where clean documentation and production handoff matter as much as the CAD model.",
    wins: [
      "Space-hardware design documentation support",
      "Optical assembly work tied to aerospace production standards",
    ],
    tags: ["Satellite", "Optics", "Drafting", "Aerospace"],
    image: "/portfolio/sgt-weather-satellite.jpg",
    imageAlt: "SGT weather satellite optics image from Blaine's portfolio",
  },
  {
    slug: "optics-fixture",
    title: "Optics Handling and Metrology Fixture",
    sector: "Industrial",
    partner: "Arizona Optical Systems",
    summary:
      "Design and drafting of optics handling and metrology fixture hardware used to support inspection, setup, and repeatable measurement workflows around precision optical components.",
    wins: [
      "Fixture design grounded in actual metrology workflow",
      "Production-ready drawings for precision optical support hardware",
    ],
    tags: ["Fixture Design", "Metrology", "Optics", "Drafting"],
    image: "/portfolio/optics-fixture.jpg",
    imageAlt: "Optics handling and metrology fixture from Blaine's portfolio",
  },
  {
    slug: "camplex-camera",
    title: "Surgical Visualization System",
    sector: "Biomedical",
    partner: "Ruda-Cardinal / Camplex",
    summary:
      "Mechanical and optical subsystem design for a surgical camera platform, focusing on packaging, precision, and real-world integration constraints.",
    wins: [
      "Optical alignment packaged into a usable device",
      "Mechanical layout built around actual deployment constraints",
    ],
    tags: ["Biomedical", "Optics", "Camera System", "Packaging"],
    image: "/portfolio/camplex-camera.jpg",
    imageAlt: "Camplex camera assembly from Blaine's portfolio",
  },
  {
    slug: "glock",
    title: "Glock-Mag AR Receiver",
    sector: "Defense",
    partner: "DDLES / QC10",
    summary:
      "Receiver design work for an early Glock-magazine AR platform, translating a strong market idea into manufacturable hardware and a real product.",
    wins: [
      "First-to-market category move",
      "Design translated into production reality",
    ],
    tags: ["Defense", "Product Design", "Manufacturing"],
    image: "/portfolio/glock-receiver.jpg",
    imageAlt: "Glock magazine AR receiver from Blaine's portfolio",
  },
  {
    slug: "garwood-minigun",
    title: "GE134 Minigun Receiver Redesign",
    sector: "Defense",
    partner: "Garwood Industries",
    summary:
      "Receiver redesign support for GE134 minigun hardware, balancing legacy weapon architecture, manufacturability, and real-world assembly constraints.",
    wins: [
      "Receiver redesign contribution for production defense hardware",
      "Mechanical design work constrained by existing weapon-system interfaces",
    ],
    tags: ["Defense", "Receiver Design", "Manufacturing", "SolidWorks"],
    image: "/portfolio/garwood-minigun.jpg",
    imageAlt: "Garwood Industries GE134 minigun image from Blaine's portfolio",
  },
  {
    slug: "milkor-msgl",
    title: "Mk14 MSGL Armorer Documentation",
    sector: "Defense",
    partner: "Milkor USA",
    summary:
      "Design, build, and drafting support around the Mk14 multi-shot grenade launcher, including armorer-manual documentation for field and maintenance use.",
    wins: [
      "Helped build and design launcher hardware",
      "Drafted armorer documentation for a real defense product",
    ],
    tags: ["Defense", "Documentation", "Drafting", "Product Hardware"],
    image: "/portfolio/milkor-msgl.jpg",
    imageAlt: "Milkor USA Mk14 MSGL image from Blaine's portfolio",
  },
  {
    slug: "tmt",
    title: "Thirty Meter Telescope",
    sector: "Astronomy",
    partner: "Arizona Optical Systems",
    summary:
      "Mechanical design and drafting contributions for the TMT program, supporting next-generation observatory hardware at extreme scale.",
    wins: [
      "Contributed to a flagship telescope program",
      "Manufacturing-ready design support for precision systems",
    ],
    tags: ["Telescope", "Astronomy", "Drafting", "Precision Systems"],
    image: "/portfolio/tmt.jpg",
    imageAlt: "Thirty Meter Telescope portfolio image",
    link: "https://en.wikipedia.org/wiki/Thirty_Meter_Telescope",
  },
  {
    slug: "schott-mirror",
    title: "Schott Lightweighted Mirror",
    sector: "Aerospace",
    partner: "SCHOTT / Arizona Optical Systems",
    summary:
      "Lightweighted mirror and support-structure work for precision optical hardware, where mass, stiffness, metrology, and manufacturability all collide.",
    wins: [
      "Precision structure for advanced optical hardware",
      "Design centered on metrology and integration reality",
    ],
    tags: ["Mirror", "Optics", "Lightweighting", "Metrology"],
    image: "/portfolio/schott-mirror.jpg",
    imageAlt: "Schott lightweighted mirror from Blaine's portfolio",
  },
  {
    slug: "metrology-arm",
    title: "Metrology Arm Tooling",
    sector: "Industrial",
    partner: "Arizona Optical Systems",
    summary:
      "Precision metrology hardware used for measurement, handling, and inspection workflows where repeatability matters more than pretty renders.",
    wins: [
      "Built around inspection workflow needs",
      "Designed for repeatable measurement and handling",
    ],
    tags: ["Metrology", "Tooling", "Inspection", "Precision Hardware"],
    image: "/portfolio/metrology-arm.jpg",
    imageAlt: "Metrology arm from Blaine's portfolio",
  },
];

const SKILLS = [
  "SolidWorks expert",
  "Opto-mechanical design",
  "GD&T and ISO 10110",
  "Tolerance analysis",
  "FEA and thermal reasoning",
  "3D scanning and reverse engineering",
  "Vendor-ready drawing packages",
  "Design for manufacture",
];

const EXPERIENCE = [
  "UCAR, opto-mechanical engineer on NASA instrument work",
  "Baymar Solutions, mechanical engineer on sequencing hardware",
  "Arizona Pump & Machine, reverse-engineering and manufacturing work",
  "Mako Mfg. Services, founder and principal engineer",
  "Ruda-Cardinal, opto-mechanical designer on aerospace and medical systems",
  "Arizona Optical Systems, large telescope and precision optics programs",
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useProjectImagePreload() {
  useEffect(() => {
    const preload = () => {
      PROJECTS.forEach((project) => {
        const image = new window.Image();
        image.decoding = "async";
        image.src = project.image;
      });
    };

    const timeout = window.setTimeout(preload, 600);
    return () => window.clearTimeout(timeout);
  }, []);
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.32em] text-accent">
            OptoMachina
          </p>
          <h1 className="text-sm font-semibold text-text-primary">
            Mechanical Design Portfolio, Blaine Wilson
          </h1>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-text-secondary">
          <a href="#projects" className="hover:text-text-primary">
            Projects
          </a>
          <a href="#capabilities" className="hover:text-text-primary">
            Capabilities
          </a>
          <a href="#contact" className="hover:text-text-primary">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.95fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.34em] text-accent">
            Mechanical design portfolio
          </p>
          <h2 className="max-w-4xl text-5xl font-black leading-[0.92] text-text-primary md:text-7xl">
            Blaine Wilson
          </h2>
          <p className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
            Opto-mechanical design, drafting, and production-facing engineering.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
            Selected work in aerospace, optics, biomedical devices, industrial tooling, and defense hardware.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-text-muted md:text-base">
            Focus areas include SolidWorks-based mechanical design, opto-mechanical systems, GD&T, ISO 10110 drafting, tolerance analysis, and vendor-ready drawing packages.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="primary-button">
              Review projects
            </a>
            <a href="#contact" className="secondary-button">
              Start a conversation
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <p className="text-xs font-mono uppercase tracking-[0.28em] text-accent">
            Technical summary
          </p>
          <div className="hero-gallery mt-4">
            {[
              { src: "/portfolio/lsst.jpg", alt: "LSST project image" },
              { src: "/portfolio/dkist.jpg", alt: "DKIST project image" },
              { src: "/portfolio/elisa.jpg", alt: "eLISA project image" },
            ].map((image) => (
              <div key={image.src} className="hero-shot">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="hero-shot-image"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          <div className="spec-grid mt-6">
            {[
              ["Focus", "Opto-mechanical design, drafting, manufacturing handoff"],
              ["Tools", "SolidWorks, FEA, reverse engineering, metrology tooling"],
              ["Standards", "ASME Y14.5 GD&T, ISO 10110 optical drawings"],
              ["Output", "CAD, drawings, fixtures, assemblies, vendor-ready data"],
            ].map(([label, value]) => (
              <div key={label} className="spec-row">
                <span className="spec-label">{label}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["15+", "years in design"],
              ["14", "image-matched projects"],
              ["60%", "parts reduction win"],
            ].map(([value, label]) => (
              <div key={label} className="stat-card">
                <div className="text-3xl font-black text-text-primary">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-text-muted">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const { ref, inView } = useInView();
  const [filter, setFilter] = useState<string>("All");
  const [selectedSlug, setSelectedSlug] = useState<string>(PROJECTS[0]?.slug || "");

  const sectors = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.sector)))];
  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((project) => project.sector === filter);

  const selectedProject =
    filteredProjects.find((project) => project.slug === selectedSlug) || filteredProjects[0];

  return (
    <section id="projects" className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className={inView ? "animate-fade-in-up" : "opacity-0"}>
          <p className="section-kicker">Selected work</p>
          <h3 className="section-title">Representative projects and hardware.</h3>
          <p className="section-copy max-w-3xl">
            Each image below matches the project it is attached to. If there was no clean image match in the portfolio set, it was left out.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <button
              key={sector}
              type="button"
              onClick={() => {
                setFilter(sector);
                const nextProject =
                  sector === "All"
                    ? PROJECTS[0]
                    : PROJECTS.find((project) => project.sector === sector);
                setSelectedSlug(nextProject?.slug || "");
              }}
              className={filter === sector ? "filter-chip filter-chip-active" : "filter-chip"}
            >
              {sector}
            </button>
          ))}
        </div>

        <div className={inView ? "mt-8 animate-fade-in-up" : "mt-8 opacity-0"}>
          <div className="blueprint-table-wrap">
            <table className="blueprint-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Sector</th>
                  <th>Partner</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => {
                  const isSelected = project.slug === selectedProject?.slug;
                  return (
                    <tr
                      key={project.slug}
                      className={isSelected ? "is-selected" : undefined}
                      onClick={() => setSelectedSlug(project.slug)}
                    >
                      <td>
                        <div className="table-project-cell">
                          <span className="table-project-name">{project.title}</span>
                          {project.featured ? <span className="featured-pill">Featured</span> : null}
                        </div>
                      </td>
                      <td className="table-mono">{project.sector}</td>
                      <td>{project.partner}</td>
                      <td className="table-tags">{project.tags.slice(0, 3).join(" · ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selectedProject ? (
            <div className="selected-project-panel mt-6">
              <div className="project-image-frame selected-project-image-frame">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  className="project-image"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.28em] text-accent">
                      {selectedProject.sector}
                    </p>
                    <h4 className="mt-3 text-3xl font-black text-text-primary">
                      {selectedProject.title}
                    </h4>
                    <p className="mt-2 text-sm font-medium text-text-muted">
                      {selectedProject.partner}
                    </p>
                  </div>
                  {selectedProject.link ? (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-button"
                    >
                      Open reference
                    </a>
                  ) : null}
                </div>

                <p className="mt-6 text-sm leading-8 text-text-secondary">
                  {selectedProject.summary}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {selectedProject.wins.map((win) => (
                    <div key={win} className="selected-project-note">
                      <span className="selected-project-dot" />
                      <span>{win}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="px-6 py-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          "SolidWorks Certified Expert",
          "GD&T and ISO 10110 fluent",
          "Observatory, aerospace, biomedical, industrial, and defense work",
          "CAD, drawings, tooling, and production-facing hardware",
        ].map((item) => (
          <div key={item} className="proof-strip-card">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsAndExperience() {
  return (
    <section id="capabilities" className="px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="section-card">
          <p className="section-kicker">Capabilities</p>
          <h3 className="mt-3 text-3xl font-black text-text-primary">What you actually get</h3>
          <div className="mt-6 grid gap-3">
            {SKILLS.map((skill) => (
              <div key={skill} className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <p className="section-kicker">Career path</p>
          <h3 className="mt-3 text-3xl font-black text-text-primary">Programs and shops behind the work</h3>
          <div className="mt-6 space-y-4">
            {EXPERIENCE.map((item) => (
              <div key={item} className="timeline-row">
                <span className="timeline-dot" />
                <p className="text-sm leading-7 text-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-bg-card/80 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.25)] md:p-12">
        <p className="section-kicker">Contact</p>
        <h3 className="mt-3 text-4xl font-black text-text-primary md:text-5xl">
          Need mechanical design or drafting support?
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary">
          Available for project-based work involving assemblies, optical hardware, tooling, drawing packages, tolerance cleanup, and manufacturing handoff.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="mailto:blaineswilson@gmail.com" className="primary-button text-center">
            blaineswilson@gmail.com
          </a>
          <a href="tel:+15203924967" className="secondary-button text-center">
            (520) 392-4967
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 pb-12 pt-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-border pt-6 text-xs uppercase tracking-[0.22em] text-text-muted md:flex-row md:items-center md:justify-between">
        <p>OptoMachina, Blaine Wilson</p>
        <p>Matched project imagery, expanded source set</p>
      </div>
    </footer>
  );
}

export default function Home() {
  useProjectImagePreload();

  return (
    <main data-theme="blueprint" className="theme-root min-h-screen">
      <Navbar />
      <Hero />
      <ProofStrip />
      <Projects />
      <SkillsAndExperience />
      <Contact />
      <Footer />
    </main>
  );
}
