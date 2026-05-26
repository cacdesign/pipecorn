type Hero = {
  kind: "hero";
  photo: string;
  quote: string; // can have <strong>
  name: string;
  role: string;
};

type Li = {
  kind: "li";
  avatar: string;
  name: string;
  role: string;
  body: string; // can have <strong>
  reactions: { emoji: string; count: number }[];
  time: string;
};

type Card = Hero | Li;

// Pronto's wall — 3 hero cards + 12 LinkedIn-style cards
const CARDS: Card[] = [
  {
    kind: "hero",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    quote:
      'With Pipecorn, my 35-sales team blow up their objectives. Each SDR now books <strong>+50% more demos</strong>.',
    name: "Alexis Gadrat",
    role: "Head of Sales · WeYou Group",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    name: "Louis Deslus",
    role: "CEO · ERAB2B",
    body: "Pipecorn is a powerful tool for finding key profiles much more efficiently than Clay's Find People.",
    reactions: [
      { emoji: "🔥", count: 4 },
      { emoji: "🤝", count: 2 },
    ],
    time: "2w · ↗",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80",
    name: "Sylvain Bellemare",
    role: "Sales Lead · FormulaNow",
    body: "We tried Apollo, ZoomInfo, Lusha. Pipecorn buries them on phone quality. <strong>9.3 / 10 contacts reach a real human.</strong>",
    reactions: [
      { emoji: "🔥", count: 7 },
      { emoji: "🚀", count: 3 },
    ],
    time: "5d · ↗",
  },
  {
    kind: "hero",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
    quote:
      "Switching to Pipecorn was a game changer. We now build <strong>3× more high-quality prospect lists</strong>.",
    name: "Loïc Roux",
    role: "Head of Growth · Grof",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    name: "Étienne Marchal",
    role: "CRO · L'Escadrille",
    body: "First week with Pipecorn: <strong>+22% pipeline</strong> with zero new headcount. The waterfall is the unfair part.",
    reactions: [
      { emoji: "🔥", count: 5 },
      { emoji: "🤝", count: 4 },
    ],
    time: "1w · ↗",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80",
    name: "Guillaume Vidal",
    role: "Founder · each One",
    body: "We catch new hires in 24h. Our SDRs reach them <strong>before LinkedIn updates</strong>. Pipecorn is the calendar of the warm market.",
    reactions: [
      { emoji: "🚀", count: 8 },
      { emoji: "🔥", count: 2 },
    ],
    time: "3d · ↗",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
    name: "Marine Lefort",
    role: "Head of Sales · Lead2Close",
    body: "Our reps stopped sourcing and started <strong>actually selling</strong>. That's the whole story.",
    reactions: [
      { emoji: "🤝", count: 6 },
      { emoji: "🎯", count: 3 },
    ],
    time: "2w · ↗",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&q=80",
    name: "Carla Ruiz",
    role: "VP Growth · FoodCheri",
    body: "Pipecorn replaced 4 vendors. <strong>−68% data spend</strong>. Sales love it. Finance loves it more.",
    reactions: [
      { emoji: "🔥", count: 11 },
      { emoji: "💰", count: 4 },
    ],
    time: "4d · ↗",
  },
  {
    kind: "hero",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    quote:
      "<strong>15% of our new pipeline</strong> last quarter came from new hires. We wouldn't have spotted them without Pipecorn.",
    name: "Baptiste Roux",
    role: "Sales Director · Uber Eats",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    name: "Victor Bardin",
    role: "Founder · Scaleo",
    body: "30-min onboarding. <strong>First verified list before lunch.</strong> That was Tuesday. We're still impressed.",
    reactions: [
      { emoji: "🚀", count: 9 },
      { emoji: "🍿", count: 5 },
    ],
    time: "1w · ↗",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?auto=format&fit=crop&w=200&q=80",
    name: "Julieta Hernández",
    role: "Head of Outbound · Urbyn",
    body: "The signal layer alone is worth the subscription. We call champions on the day they change job. <strong>40% answer rate</strong>.",
    reactions: [
      { emoji: "🔥", count: 6 },
      { emoji: "🎯", count: 4 },
    ],
    time: "6d · ↗",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    name: "Ben Cohen",
    role: "Head of Sales Ops · Comeen",
    body: "I've been doing GTM ops for 12 years. Pipecorn is the cleanest CRM-sync I've ever wired up. <strong>10 min setup.</strong>",
    reactions: [
      { emoji: "🤝", count: 7 },
      { emoji: "🔥", count: 2 },
    ],
    time: "2w · ↗",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
    name: "Thomas Bartelt",
    role: "GTM Engineer · Qevlar AI",
    body: "We book <strong>50+ Enterprise meetings/month</strong> by catching new CISOs on day 1. <strong>85% connect rate</strong>.",
    reactions: [
      { emoji: "🚀", count: 14 },
      { emoji: "🎯", count: 6 },
    ],
    time: "3d · ↗",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    name: "Quentin Kozyra",
    role: "Head of GTM · Hyperline",
    body: "We catch champion job changes <strong>before LinkedIn updates</strong>. That's the unfair advantage.",
    reactions: [
      { emoji: "🔥", count: 8 },
      { emoji: "🤝", count: 3 },
    ],
    time: "5d · ↗",
  },
  {
    kind: "li",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    name: "Alex Jaglale",
    role: "VP Sales · Scalefast",
    body: "<strong>+27% closed-won.</strong> Pipecorn pays for itself every Monday morning.",
    reactions: [
      { emoji: "💰", count: 5 },
      { emoji: "🔥", count: 4 },
    ],
    time: "1w · ↗",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-eyebrow">Loved by sales teams</div>
      <h2 className="section-title">
        Join 1,000+ teams winning their <span className="hl">market.</span>
      </h2>
      <div className="testi-wall">
        {CARDS.map((c, i) =>
          c.kind === "hero" ? (
            <article key={i} className="tw-card hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="tw-hero-photo" src={c.photo} alt="" />
              <div className="tw-hero-body">
                <p
                  className="tw-hero-quote"
                  dangerouslySetInnerHTML={{ __html: `"${c.quote}"` }}
                />
                <div className="tw-head">
                  <div className="tw-meta">
                    <div className="nm">{c.name}</div>
                    <div className="rl">{c.role}</div>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <article key={i} className="tw-card">
              <div className="tw-head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="tw-avatar" src={c.avatar} alt="" />
                <div className="tw-meta">
                  <div className="nm">{c.name}</div>
                  <div className="rl">{c.role}</div>
                </div>
                <span className="tw-li-mark">in</span>
              </div>
              <div
                className="tw-body"
                dangerouslySetInnerHTML={{ __html: c.body }}
              />
              <div className="tw-foot">
                <div className="tw-reactions">
                  {c.reactions.map((r, j) => (
                    <span key={j}>
                      {r.emoji} {r.count}
                    </span>
                  ))}
                </div>
                <div className="tw-time">{c.time}</div>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}
