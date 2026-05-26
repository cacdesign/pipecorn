export type CaseStudy = {
  brand: string;
  pill?: "Case study" | "Interview";
  popup?: {
    img: string;
    name: string;
    role: string;
    quote: string; // can include <strong>...</strong> markers
    readLabel: string;
  };
};

export const LOGOS_ROW_1: CaseStudy[] = [
  {
    brand: "Uber",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      name: "Marc Lefèvre",
      role: "Head of Sales Ops, Uber",
      quote:
        '"We added <strong>40% more SQLs</strong> in one quarter without hiring a single SDR. Pipecorn pays for itself in the first week."',
      readLabel: "Read full case study →",
    },
  },
  { brand: "VISA" },
  {
    brand: "lumapps",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=600&q=80",
      name: "Élise Moreau",
      role: "VP Marketing, LumApps",
      quote:
        '"<strong>3× pipeline</strong> in 90 days. Our reps stopped sourcing and started selling. <strong>92% phone connect rate.</strong>"',
      readLabel: "Read full case study →",
    },
  },
  { brand: "Alma" },
  {
    brand: "Mantu",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      name: "Julien Rey",
      role: "Sales Director, Mantu",
      quote:
        '"We replaced 4 data tools with Pipecorn. <strong>€2M saved annually</strong> and our reps love the data quality."',
      readLabel: "Read full case study →",
    },
  },
  {
    brand: "Qevlar AI",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
      name: "Thomas Bartelt",
      role: "Go-to-Market Engineer, Qevlar AI",
      quote:
        '"We book <strong>50+ Enterprise meetings / month</strong> by catching new CISOs and SOC Managers on day 1. Pipecorn is the mobile-enrichment layer behind every warm call. <strong>85% connect rate.</strong>"',
      readLabel: "Read full case study →",
    },
  },
  {
    brand: "yousign",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
      name: "Camille Durand",
      role: "Head of Growth, Yousign",
      quote:
        '"We <strong>doubled outbound pipeline</strong> in 60 days. The waterfall enrichment alone was worth the switch."',
      readLabel: "Read full case study →",
    },
  },
  { brand: "lemlist" },
];

export const LOGOS_ROW_2: CaseStudy[] = [
  {
    brand: "weyou",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      name: "Alexis Gadrat",
      role: "Head of Sales, WeYou Group",
      quote:
        '"With Pipecorn, my 35-sales team blow up their objectives. Each SDR now books <strong>+50% more demos.</strong>"',
      readLabel: "Read full case study →",
    },
  },
  {
    brand: "qobra",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=600&q=80",
      name: "Alexis Garnier",
      role: "Co-founder, Qobra",
      quote:
        '"<strong>+38% reply rate</strong> after switching to Pipecorn. We finally call the right person at the right time."',
      readLabel: "Read full case study →",
    },
  },
  {
    brand: "Bonx",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
      name: "Malo",
      role: "Head of Sales, Bonx",
      quote:
        '"<strong>10× more verified phones</strong> than our previous stack. Our outbound team is genuinely faster."',
      readLabel: "Read full case study →",
    },
  },
  {
    brand: "Scalefast",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?auto=format&fit=crop&w=600&q=80",
      name: "Alex Jaglale",
      role: "VP Sales, Scalefast",
      quote:
        '"Pipecorn pays for itself every Monday morning. <strong>+27% closed-won.</strong>"',
      readLabel: "Read full case study →",
    },
  },
  {
    brand: "recom",
    pill: "Case study",
    popup: {
      img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
      name: "Juliette Binetruy",
      role: "Head of Growth, Recom",
      quote:
        '"We replaced 3 vendors and a Zapier mess with one Pipecorn workspace. Sales love it."',
      readLabel: "Read full case study →",
    },
  },
  { brand: "slite" },
  {
    brand: "youno",
    pill: "Interview",
    popup: {
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
      name: "Maya Chen",
      role: "Founder, Youno",
      quote:
        '"Pipecorn became the operating system of our outbound. Every signal, every contact, every CRM update."',
      readLabel: "Read interview →",
    },
  },
  {
    brand: "Hyperline",
    pill: "Interview",
    popup: {
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=600&q=80",
      name: "Quentin Kozyra",
      role: "Head of GTM, Hyperline",
      quote:
        '"We catch champion job changes <strong>before LinkedIn updates</strong>. That\'s the unfair advantage."',
      readLabel: "Read interview →",
    },
  },
];
