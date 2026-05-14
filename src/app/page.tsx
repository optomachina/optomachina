import {
  Aperture,
  ArrowUpRight,
  Crosshair,
  Orbit,
  Radar,
  Satellite,
  Telescope,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

const HERO_TAGLINE = "Hardware for Earth, Sky, Space, and Light.";

type WorkItem = {
  title: string;
  client: string;
  role: string;
  materials: string;
  manufacturing: string;
  outcome: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  drawing: "mirror" | "instrument" | "fixture";
};

const work: WorkItem[] = [
  {
    title: "Solar telescope mirror assemblies",
    client: "NSF / National Solar Observatory",
    role: "Optomechanical design",
    materials: "Invar 36 · aluminum · optical glass",
    manufacturing: "CNC machining · bonding · alignment",
    outcome:
      "Precision assemblies for observatory hardware where thermal behavior, stiffness, and optical alignment all matter.",
    Icon: Telescope,
    drawing: "mirror",
  },
  {
    title: "Flight and robotic optical hardware",
    client: "ISS / NASA program work",
    role: "Mechanical design engineer",
    materials: "Titanium · aluminum · fastened assemblies",
    manufacturing: "FEA · drawing packages · vendor release",
    outcome:
      "Mechanical packages built for constrained envelopes, documentation rigor, and hardware that has to survive the trip.",
    Icon: Satellite,
    drawing: "instrument",
  },
  {
    title: "Ground support and telescope tooling",
    client: "LSST / TMT / eLISA ecosystem",
    role: "Design and drafting",
    materials: "Tool steel · 6061-T6 · composites",
    manufacturing: "Fixture design · GD&T · assembly workflow",
    outcome:
      "Fixtures and mechanisms that turn careful optomechanical intent into repeatable shop-floor reality.",
    Icon: Crosshair,
    drawing: "fixture",
  },
];

const career = [
  {
    title: "Aerospace",
    Icon: Orbit,
    items: [
      "Solar telescope and observatory mechanisms",
      "ISS robotics and optical payload hardware",
      "NASA servicing and space-instrument programs",
    ],
  },
  {
    title: "Defense",
    Icon: Radar,
    items: [
      "Receiver and small-arms manufacturing programs",
      "Production-minded mechanical design",
      "Drawing packages for suppliers and machinists",
    ],
  },
  {
    title: "Photonics / Biomedical",
    Icon: Aperture,
    items: [
      "Laser and Raman spectroscopy hardware",
      "Optical bonding and fixture development",
      "Compact precision mechanisms for lab instruments",
    ],
  },
];

function TechnicalDrawing({ variant }: { variant: WorkItem["drawing"] }) {
  const common = "fill-none stroke-current vector-effect-non-scaling-stroke";

  return (
    <svg
      aria-hidden="true"
      className="h-full w-full text-[#f2efea]"
      viewBox="0 0 640 420"
      role="img"
    >
      <defs>
        <pattern
          id={`grid-${variant}`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 24 0 L 0 0 0 24" className="fill-none stroke-[#f2efea]/10" />
        </pattern>
      </defs>
      <rect width="640" height="420" fill={`url(#grid-${variant})`} />
      {variant === "mirror" ? (
        <g className={common} strokeWidth="2">
          <ellipse cx="320" cy="210" rx="178" ry="112" />
          <ellipse cx="320" cy="210" rx="126" ry="78" className="opacity-60" />
          <path d="M142 210h356M320 98v224" className="opacity-40" />
          <path d="M194 132 446 288M446 132 194 288" className="opacity-30" />
          <circle cx="320" cy="210" r="24" />
          <path d="M92 336h456M132 336v-42M508 336v-42" className="opacity-60" />
          <path d="M132 294h376" />
        </g>
      ) : variant === "instrument" ? (
        <g className={common} strokeWidth="2">
          <path d="M144 126h276l76 82-76 86H144z" />
          <path d="M188 170h214l38 40-38 40H188z" className="opacity-70" />
          <circle cx="226" cy="210" r="34" />
          <circle cx="366" cy="210" r="54" className="opacity-70" />
          <path d="M92 110h84M92 310h84M464 110h84M464 310h84" className="opacity-50" />
          <path d="M176 110v40M176 270v40M464 110v58M464 252v58" />
          <path d="M256 88v244M310 88v244" className="opacity-30" />
        </g>
      ) : (
        <g className={common} strokeWidth="2">
          <path d="M120 294h400v48H120z" />
          <path d="M176 294V132h90v162M374 294V132h90v162" />
          <path d="M168 132h304l-34-58H202z" />
          <path d="M214 188h212M214 238h212" className="opacity-45" />
          <circle cx="320" cy="132" r="42" />
          <path d="M320 90v84M278 132h84" className="opacity-60" />
          <path d="M120 366h400M168 342v44M472 342v44" className="opacity-50" />
        </g>
      )}
    </svg>
  );
}

function WorkRow({ project }: { project: WorkItem }) {
  const Icon = project.Icon;

  return (
    <article className="border-t border-[#f2efea]/12 py-10 lg:py-14">
      <div className="grid gap-0 overflow-hidden border border-[#f2efea]/12 bg-[#0f1014] md:grid-cols-[3fr_2fr] lg:grid-cols-2">
        <div className="relative min-h-[300px] overflow-hidden bg-[#111217] p-8 sm:min-h-[360px] lg:min-h-[440px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,162,107,0.22),transparent_34%),linear-gradient(135deg,rgba(242,239,234,0.08),transparent_46%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <Icon className="h-12 w-12 text-[#c8a26b]" aria-hidden="true" strokeWidth={1.4} />
            <div className="max-w-md">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#c8a26b]">
                Program experience
              </p>
              <h3 className="mt-4 text-3xl font-medium leading-tight text-[#f2efea] sm:text-4xl">
                {project.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="min-h-[280px] bg-[#0f1014] p-4 sm:min-h-[340px] lg:min-h-[440px]">
          <TechnicalDrawing variant={project.drawing} />
        </div>
      </div>
      <div className="grid gap-6 border-x border-b border-[#f2efea]/12 bg-[#0a0b0d] p-6 md:grid-cols-4 lg:p-8">
        {[
          ["Client", project.client],
          ["Role", project.role],
          ["Materials", project.materials],
          ["Manufacturing", project.manufacturing],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#c8a26b]">
              {label}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#f2efea]">{value}</p>
          </div>
        ))}
        <p className="text-base leading-7 text-[#c9c4bc] md:col-span-4">
          {project.outcome}
        </p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f2efea]">
      <header className="absolute left-0 right-0 top-0 z-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-10">
          <a href="#" className="group block min-h-11 focus-visible:outline">
            <p className="text-2xl font-medium leading-none sm:text-3xl">Blaine Wilson</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8a26b]">
              Optomechanical Design Engineer · Tucson, Arizona
            </p>
          </a>
          <nav
            aria-label="Primary navigation"
            className="flex max-w-full flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-[#c9c4bc]"
          >
            <a href="#" className="min-h-11 py-3 hover:text-[#f2efea]">
              Home
            </a>
            <a href="#work" className="min-h-11 py-3 hover:text-[#f2efea]">
              Work
            </a>
            <a href="#career" className="min-h-11 py-3 hover:text-[#f2efea]">
              Career
            </a>
            <a
              href="https://optomachina.substack.com"
              className="min-h-11 py-3 hover:text-[#f2efea]"
            >
              Writing
            </a>
            <a href="#contact" className="min-h-11 py-3 hover:text-[#f2efea]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section
          aria-labelledby="hero-tagline"
          className="relative flex min-h-[70vh] overflow-hidden border-b border-[#f2efea]/12 lg:min-h-[80vh]"
        >
          <div className="absolute inset-0 bg-[#0f1014]" />
          <div className="absolute inset-0 opacity-70">
            <TechnicalDrawing variant="instrument" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.66),rgba(10,11,13,0.18)_42%,#0a0b0d_100%)]" />
          <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-end gap-8 px-5 pb-10 pt-40 sm:px-8 lg:px-10 lg:pb-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
              <h1
                id="hero-tagline"
                className="max-w-4xl text-[clamp(32px,5vw,64px)] font-medium leading-[1.02] tracking-normal text-[#f2efea]"
              >
                {HERO_TAGLINE}
              </h1>
              <p className="font-mono text-sm leading-6 text-[#c8a26b]">
                Available for full-time roles and consulting · 2026
              </p>
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#c8a26b]">
                Selected Work
              </p>
              <h2 id="work-heading" className="mt-4 text-4xl font-medium leading-tight">
                Engineering catalog
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[#c9c4bc]">
              Optomechanical and precision mechanical design across observatories, flight
              hardware, defense manufacturing, and photonics. Public-safe details only;
              cleared photography and drawings can be added as the asset audit is completed.
            </p>
          </div>
          <div className="mt-10">
            {work.map((project) => (
              <WorkRow key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section
          id="career"
          aria-labelledby="career-heading"
          className="border-y border-[#f2efea]/12 bg-[#0f1014] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#c8a26b]">
                  Career
                </p>
                <h2 id="career-heading" className="mt-4 text-4xl font-medium leading-tight">
                  Grouped by domain, not chronology
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-[#c9c4bc]">
                Senior mechanical design work with a bias toward optical alignment,
                manufacturable drawings, and mechanisms that have to perform outside
                normal lab conditions.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {career.map(({ title, Icon, items }) => (
                <section
                  key={title}
                  aria-labelledby={`${title.toLowerCase().replaceAll(" / ", "-")}-heading`}
                  className="border border-[#f2efea]/12 bg-[#0a0b0d] p-6"
                >
                  <Icon className="h-8 w-8 text-[#c8a26b]" aria-hidden="true" strokeWidth={1.5} />
                  <h3
                    id={`${title.toLowerCase().replaceAll(" / ", "-")}-heading`}
                    className="mt-6 font-mono text-sm uppercase tracking-[0.18em] text-[#f2efea]"
                  >
                    {title}
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-[#c9c4bc]">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section
          id="writing"
          aria-labelledby="writing-heading"
          className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_340px] lg:px-10 lg:py-28"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#c8a26b]">
              Writing
            </p>
            <h2 id="writing-heading" className="mt-4 text-4xl font-medium leading-tight">
              Notes from the edge of space.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#c9c4bc]">
              Essays and field notes live on Optomachina’s Substack while the portfolio
              stays focused on engineering work.
            </p>
          </div>
          <a
            href="https://optomachina.substack.com"
            className="group flex min-h-24 items-center justify-between border border-[#f2efea]/12 bg-[#0f1014] p-6 text-[#f2efea] transition-colors hover:border-[#c8a26b]"
          >
            <span className="font-mono text-sm uppercase tracking-[0.16em]">
              Read on Substack
            </span>
            <ArrowUpRight
              className="h-5 w-5 text-[#c8a26b] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </a>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="border-t border-[#f2efea]/12 px-5 py-16 sm:px-8 lg:px-10"
        >
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#c8a26b]">
                Contact
              </p>
              <h2 id="contact-heading" className="mt-4 text-4xl font-medium leading-tight">
                Full-time roles, consulting, and optomechanical problems.
              </h2>
            </div>
            <div className="space-y-3 font-mono text-sm leading-7 text-[#c9c4bc]">
              <a
                href="mailto:blaineswilson@gmail.com"
                className="inline-flex min-h-11 items-center text-[#f2efea] underline decoration-[#c8a26b] underline-offset-4"
              >
                blaineswilson@gmail.com
              </a>
              <p>Blaine Wilson · Tucson, Arizona</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#f2efea]/12 px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#9a9690] sm:flex-row sm:items-center sm:justify-between">
          <p>Optomachina</p>
          <p>Precision mechanical systems for light, sky, space, and earth.</p>
        </div>
      </footer>
    </div>
  );
}
