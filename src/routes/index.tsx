import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import couple from "@/assets/couple.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pavan & Tisha — Wedding Invitation | Dec 1–3, 2026" },
      { name: "description", content: "Join us for our wedding celebrations at Matoshree Party Plot, Latuda, Surendranagar, December 1–3, 2026." },
      { property: "og:title", content: "Pavan & Tisha — Wedding Invitation" },
      { property: "og:description", content: "Celebrate with us, December 1–3, 2026 in Surendranagar." },
    ],
  }),
  component: Index,
});

const WEDDING = new Date("2026-12-03T00:00:00+05:30").getTime();

function Motif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={`mx-auto w-48 text-burgundy ${className}`} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 20 H70 M130 20 H200" />
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <ellipse key={r} cx="100" cy="20" rx="5" ry="14" transform={`rotate(${r} 100 20)`} />
      ))}
      <circle cx="100" cy="20" r="3" fill="currentColor" />
      <path d="M70 20 q-8 -10 -16 0 q8 10 16 0 M130 20 q8 -10 16 0 q-8 10 -16 0" />
    </svg>
  );
}

function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`text-burgundy ${className}`} fill="none" stroke="currentColor" strokeWidth="0.6">
      {Array.from({ length: 16 }).map((_, i) => (
        <ellipse key={i} cx="100" cy="55" rx="12" ry="45" transform={`rotate(${i * 22.5} 100 100)`} />
      ))}
      {[90, 70, 30, 12].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
    </svg>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`absolute h-9 w-9 text-burgundy opacity-30 ${className}`} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 3 H22 M3 3 V22" />
      <path d="M3 10 q13 0 17 4 q4 4 4 17" />
      <circle cx="9" cy="9" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-jali opacity-[0.08]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-multiply" />
      
      {/* Animated gradient orbs */}
      <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-dusty-soft opacity-50 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-burgundy-soft opacity-50 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 -right-16 h-56 w-56 rounded-full bg-rose opacity-30 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      
      {/* Floating mandala patterns */}
      <svg viewBox="0 0 200 200" className="absolute top-20 right-10 w-32 text-burgundy opacity-[0.06] animate-[spin_40s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx="100" cy="55" rx="12" ry="45" transform={`rotate(${i * 30} 100 100)`} />
        ))}
        {[70, 50, 30].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
      </svg>
      
      <svg viewBox="0 0 200 200" className="absolute bottom-32 left-16 w-24 text-dusty opacity-[0.06] animate-[spin_50s_linear_infinite_reverse]" fill="none" stroke="currentColor" strokeWidth="0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="100" cy="60" rx="10" ry="40" transform={`rotate(${i * 45} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="50" />
        <circle cx="100" cy="100" r="30" />
      </svg>
      
      <svg viewBox="0 0 200 200" className="absolute top-1/3 left-8 w-20 text-rose opacity-[0.05] animate-[spin_60s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="0.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1="100" y1="50" x2="100" y2="100" transform={`rotate(${i * 22.5} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="45" />
      </svg>
      
      <div className="absolute inset-2 border border-burgundy/15" />
      <Corner className="left-3 top-3" />
      <Corner className="right-3 top-3 rotate-90" />
      <Corner className="bottom-3 right-3 rotate-180" />
      <Corner className="bottom-3 left-3 -rotate-90" />
    </div>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Section({ title, kicker, children }: { title: string; kicker: string; children: ReactNode }) {
  return (
    <section className="px-6 py-20 text-center">
      <Reveal>
        <p className="font-script text-3xl text-burgundy">{kicker}</p>
        <h2 className="mx-auto mt-1 w-fit font-display text-4xl text-dusty-gradient">{title}</h2>
        <Motif className="mt-4" />
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.max(0, WEDDING - (now ?? WEDDING));
  const parts = [
    ["Days", Math.floor(d / 864e5)],
    ["Hours", Math.floor(d / 36e5) % 24],
    ["Minutes", Math.floor(d / 6e4) % 60],
    ["Seconds", Math.floor(d / 1e3) % 60],
  ] as const;
  return (
    <div className="mx-auto grid max-w-sm grid-cols-4 gap-3">
      {parts.map(([l, v]) => (
        <div key={l} className="rounded-lg border bg-card py-4 shadow-sm">
          <div className="font-display text-3xl text-dusty">{now === null ? "--" : String(v).padStart(2, "0")}</div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-burgundy">{l}</div>
        </div>
      ))}
    </div>
  );
}

const events = [
  { day: "Dec 1, 2026", name: "Muda Vidhi", time: "9:30 AM", note: "Auspicious Beginnings With Ganesh Sthapana" },
  { day: "Dec 1, 2026", name: "Haldi & Music Carnival", time: "10:00 AM", note: "A Multi-Colour Theme, Flower Haldi & Sindhi Lada" },
  { day: "Dec 1, 2026", name: "Sangeet Sandhya", time: "6:00 PM", note: "DJ Night & Garba" },
  { day: "Dec 1, 2026", name: "Sat Son & Ghadiyu", time: "11:00 PM", note: "Traditional Sindhi Rituals" },
  { day: "Dec 1, 2026", name: "Dinner", time: "8:00 PM", note: "A Joyful Evening Feast With Family And Friends" },
  { day: "Dec 2, 2026", name: "Dikh", time: "10:00 AM", note: "Mugat Vidhi Celebration" },
  { day: "Dec 2, 2026", name: "Departure For Wedding", time: "02:00 PM", note: "A Travel With Love, Joy & Excitement" },
];

const venueDetails = [
  { date: "Dec 3, 2026", time: "8:00 AM", title: "Wedding Procession", note: "Band Baaja Baraat" },
  { date: "Dec 3, 2026", time: "11:00 AM", title: "Laavaan", note: "Sikh Wedding Ceremony" },
];

function Index() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [open]);

  if (!open) {
    return (
    <>
      <Backdrop />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Mandala className="absolute -top-24 -left-24 w-72 opacity-30 animate-[spin_60s_linear_infinite]" />
        <Mandala className="absolute -bottom-24 -right-24 w-72 opacity-30 animate-[spin_60s_linear_infinite]" />
        <p className="animate-in fade-in duration-1000 text-xs uppercase tracking-[0.4em] text-burgundy">Shubh Vivah</p>
        <button
          onClick={() => { setOpen(true); window.scrollTo(0, 0); }}
          className="group relative mt-8 h-56 w-80 rounded-lg border-2 border-burgundy bg-card shadow-xl transition hover:-translate-y-1 animate-in zoom-in-95 duration-1000"
          aria-label="Tap to open invitation"
        >
          <svg viewBox="0 0 320 224" className="absolute inset-0 h-full w-full text-burgundy" fill="none" stroke="currentColor">
            <path d="M0 0 L160 120 L320 0" strokeWidth="1.5" />
            <path d="M0 224 L130 100 M320 224 L190 100" strokeWidth="0.8" />
          </svg>
          <span className="absolute left-1/2 top-[100px] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-dusty font-script text-2xl text-primary-foreground shadow-lg ring-4 ring-burgundy-soft group-hover:scale-110 transition">
            P&T
          </span>
        </button>
        <h1 className="mx-auto mt-10 w-fit font-display text-4xl text-dusty-gradient">You're Invited</h1>
        <p className="mt-3 animate-pulse text-sm uppercase tracking-[0.3em] text-burgundy">Tap To Open</p>
      </main>
    </>
    );
  }

  return (
    <>
      <Backdrop />
    <main className="mx-auto max-w-xl overflow-hidden animate-in fade-in duration-1000">
      {/* Couple */}
      <section className="relative px-6 pt-20 pb-12 text-center">
        <Mandala className="absolute -top-20 left-1/2 w-80 -translate-x-1/2 opacity-20" />
        <Reveal>
          <p className="text-base font-bold uppercase tracking-[0.35em] text-burgundy sm:text-lg">|| Shree Ganeshay Namah ||</p>
          <h1 className="mt-6 font-script text-[3.25rem] leading-tight text-burgundy-gradient sm:text-[3.75rem]">
            Pavan <span className="font-script text-[2.5rem]">&</span> Tisha
          </h1>
          <Motif className="mt-4" />
          <p className="mx-auto mt-6 max-w-sm font-display text-lg italic text-burgundy">
            Together with their families, Pavan and Tisha request the honour of your presence as we begin our journey of love, laughter, and blessings.
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <div className="arch mx-auto w-64 border-2 border-burgundy p-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-burgundy-gradient">
            <img src={couple} alt="Pavan and Tisha" width={768} height={1024} className="arch aspect-[3/4] w-full object-cover transition-all duration-500 hover:scale-105" />
          </div>
        </Reveal>
      </section>

      {/* Date */}
      <Section kicker="Save The Date" title="December 1 – 3, 2026">
        <Reveal>
          <div className="animate-in zoom-in-95 duration-700">
            <Countdown />
          </div>
        </Reveal>
      </Section>

      {/* Itinerary */}
      <Section kicker="Celebrations" title="Event Itinerary">
        <ol className="relative mx-auto max-w-sm border-l border-burgundy text-left">
          {events.map((e) => (
            <li key={e.name} className="reveal mb-10 ml-6 last:mb-0">
              <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rotate-45 bg-burgundy-gradient ring-4 ring-background" />
              <p className="text-xs uppercase tracking-widest text-burgundy">{e.day} · {e.time}</p>
              <h3 className="font-display text-2xl font-bold text-dusty">{e.name}</h3>
              <p className="text-sm font-normal text-burgundy">{e.note}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Venue */}
      <section className="-mt-8 px-6 pt-0 pb-20 text-center">
        <Reveal>
          <p className="font-script text-3xl text-burgundy">The Venue</p>
          <Motif className="mt-4" />
        </Reveal>
        <Reveal>
          <div className="mx-auto mt-10 max-w-sm rounded-lg border-2 border-burgundy bg-card p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-burgundy-gradient">
            <h3 className="font-display text-3xl text-dusty">Matoshree Party Plot</h3>
            <p className="mt-2 text-burgundy">Latuda, Surendranagar<br />Gujarat, India</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Matoshree%20Party%20Plot%2C%20Latuda%2C%20Surendranagar%2C%20Gujarat"
              target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-burgundy-gradient px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
            >
              View On Google Maps
            </a>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-sm text-left">
          <ol className="relative space-y-10 border-l border-burgundy">
            {venueDetails.map((detail) => (
              <li key={`${detail.title}-${detail.time}`} className="relative ml-6">
                <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rotate-45 bg-burgundy-gradient ring-4 ring-background" />
                <p className="text-xs uppercase tracking-[0.25em] text-burgundy">{detail.date} · {detail.time}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-dusty">{detail.title}</h3>
                <p className="mt-1 text-sm font-normal text-burgundy">{detail.note}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-12">
          <p className="font-script text-3xl text-burgundy">The Venue</p>
          <Motif className="mt-4" />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-10 max-w-sm rounded-lg border-2 border-burgundy bg-card p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-burgundy-gradient">
            <h3 className="font-display text-3xl text-dusty">Gurudwara</h3>
            <p className="mt-2 text-burgundy">Gurudwara Rd, Limda Ln<br />Jamnagar, Gujarat 361006</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Gurudwara%20Rd%2C%20Limda%20Ln%2C%20Jamnagar%2C%20Gujarat%20361006"
              target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-burgundy-gradient px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
            >
              View On Google Maps
            </a>
          </div>
        </Reveal>
      </section>

      {/* Invitation introduction */}
      <section className="px-6 py-20 text-center">
        <Reveal>
          <Motif />
          <p className="mt-8 font-script text-3xl italic text-burgundy">Together With Their Families,</p>
          <p className="mt-8 font-display text-4xl font-bold tracking-[0.18em] text-dusty">PAVAN</p>
          <p className="mx-auto mt-3 max-w-sm font-display text-base italic text-burgundy">
            ( s/o Mr. Arjundas Dolatram Kriplani & Mrs. Monika Arjundas Kriplani )
          </p>
          <p className="mt-8 font-script text-4xl text-burgundy">&</p>
          <p className="mt-6 font-display text-4xl font-bold tracking-[0.18em] text-dusty">TISHA</p>
          <p className="mx-auto mt-3 max-w-sm font-display text-base italic text-burgundy">
            ( d/o Mr. Naresh Thavrani & Mrs. Daksha Thavrani )
          </p>
          <p className="mx-auto mt-10 max-w-sm font-display text-xl italic text-burgundy">
            Request The Honour Of Your Presence As We Begin With Our Journey Of Love, Laughter And Blessings
          </p>
        </Reveal>
      </section>

      <footer className="relative px-6 pt-12 pb-20 text-center">
        <Reveal>
          <Motif />
          <p className="mx-auto mt-6 max-w-xs font-display text-2xl text-dusty">
            We can't wait to celebrate this special beginning with you.
          </p>
          <p className="mt-6 font-script text-4xl text-burgundy">Pavan & Tisha</p>
        </Reveal>
      </footer>
    </main>
    </>
  );
}
