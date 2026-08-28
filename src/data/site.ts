export const SITE = {
  name: "Rashmi Uprety",
  role: "Actor · Theatre Artist",
  domain: "rashmiuprety.com.np",
  email: "rashmiuprety6@gmail.com",
  professions: [
    "Nepalese Actor",
    "Theatre Artist",
    "Screen Performer",
    "Cultural Practitioner",
  ],
  statement:
    "I am a Nepalese actor and theatre artist working across stage and screen, with a practice rooted in character, voice and presence.",
  socials: {
    instagram: "https://www.instagram.com/rashmi_uprety",
    tiktok: "https://www.tiktok.com/@rashmiuprety",
    youtubeChannel: "https://www.youtube.com/channel/UCgmOJMMkGPSp97WDvGHeieg",
    featuredVideo: "https://youtu.be/IzliWJkELqU",
    featuredVideoEmbedId: "IzliWJkELqU",
  },
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
  "I am a Nepalese actor and theatre artist with experience in stage and screen performance. I am associated with Kadam Theatre in Damak, and was part of its first batch — the pioneering group of performers trained there.",
  "My practice focuses on acting, character development, dialogue delivery, emotional expression, improvisation, voice and body movement, and performance for both stage and screen.",
  "Alongside performance, I have been actively involved in theatre-related creative and production activities, including props, costume, set and stage support, as well as mentoring and workshop-related work.",
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
  videoUrl?: string;
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

export const SCREEN_CREDITS: Credit[] = [
  {
    index: "01",
    title: "Featured Performance",
    discipline: "Screen / Performance",
    role: "Actor",
    videoUrl: "https://youtu.be/IzliWJkELqU",
  },
];
