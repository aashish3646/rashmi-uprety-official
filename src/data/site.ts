export const SITE = {
  name: "Rashmi Uprety",
  role: "Actor · Theatre Artist",
  domain: "rashmiuprety.com.np",
  professions: [
    "Nepalese Actor",
    "Theatre Artist",
    "Screen Performer",
    "Cultural Practitioner",
  ],
  statement:
    "A Nepalese actor and theatre artist working across stage and screen, with a practice rooted in character, voice and presence.",
} as const;

export const NAV = [
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Theatre", to: "/theatre" },
  { label: "Gallery", to: "/gallery" },
  { label: "Showreel", to: "/showreel" },
  { label: "Contact", to: "/contact" },
] as const;

export const BIO = [
  "Rashmi Uprety is a Nepalese actor and theatre artist with experience in stage and screen performance. She is associated with Kadam Theatre in Damak, and was part of its first batch — the pioneering group of performers trained there.",
  "Her practice focuses on acting, character development, dialogue delivery, emotional expression, improvisation, voice and body movement, and performance for both stage and screen.",
  "Alongside performance, she has been involved in theatre-related creative and production activities, including props, costume, set and stage support, as well as mentoring and workshop-related work.",
];

export const TRAINING = [
  {
    title: "Kadam Theatre, Damak",
    detail: "Pioneer — First Batch",
  },
  {
    title: "Bachelor of Business Administration (BBA)",
    detail: "Damak Multiple Campus, Tribhuvan University",
  },
];

export const PRACTICE = [
  "Screen Acting",
  "Stage / Theatre Acting",
  "Character Development",
  "Dialogue Delivery",
  "Emotional Expression",
  "Improvisation",
  "Voice & Body Movement",
  "Classical Dance",
];

export const CRAFT_SUPPORT = [
  "Props",
  "Costume",
  "Set Support",
  "Production / Stage Support",
  "Mentoring & Workshops",
];

export type Credit = {
  title: string;
  discipline: string;
  role: string;
  association?: string;
  index: string;
};

export const THEATRE_CREDITS: Credit[] = [
  {
    index: "01",
    title: "Pratyansha",
    discipline: "Theatre",
    role: "Senapati / Military Commander",
  },
  {
    index: "02",
    title: "Malami",
    discipline: "Theatre",
    role: "Lead Performer",
    association: "Doksiri Festival",
  },
];
