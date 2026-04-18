export const en = {
  meta: {
    title: 'TobVision · Conversion copy for DACH performance agencies',
    description:
      'Conversion copy for DACH performance agencies. A post-click audit first - then the copy that fixes what the audit found. Full English version launching this week.',
    ogTitle: 'TobVision · Conversion copy for DACH performance agencies',
    ogDescription:
      'Diagnosis first. Copy second. Conversion Copy Sprint for DACH agencies - 10 business days.',
  },
  header: {
    ctaLabel: 'Book a quick chat',
    ctaHref: '/en/buchen/',
    logoAlt: 'TobVision',
  },
  footer: {
    company: 'TobVision Marketing LLC · Tobias V. Huber',
    links: [
      { label: 'Impressum', href: '/de/impressum/' },
      { label: 'Datenschutz', href: '/de/datenschutz/' },
    ],
  },
  press: {
    label: 'Featured in',
    linkLabel: 'Read article',
    outlets: [
      { name: 't3n', slug: 't3n', href: '#' },
      { name: 'Startup Valley', slug: 'startup-valley', href: '#' },
      { name: 'lifePR', slug: 'lifepr', href: '#' },
    ],
  },
  placeholder: {
    title: 'English version coming this week.',
    body: 'The full English version of this site is being finalized and will be live within days.',
    options: [
      'View the German version (most browsers offer one-click translation in the address bar).',
      'Contact me directly: tobias@tobvision.com',
      'Or book a 15-min chat below.',
    ],
    ctaLabel: 'Book a quick chat',
    closing: 'Thanks for your patience. - Tobias',
    switchToGermanLabel: 'Zur deutschen Version',
    switchToGermanHref: '/de/',
  },
  notFound: {
    title: 'Page not found · TobVision',
    heading: "This page doesn't exist (yet).",
    body: 'Maybe an old link, or I moved something.',
    homeLabel: 'Back to home',
    homeHref: '/en/',
    ctaLabel: 'Book a quick chat',
  },
  buchen: {
    title: 'Book a quick chat · TobVision',
    description: 'Book a 15-minute slot. We check together if the Conversion Copy Sprint is a fit.',
    heading: 'Book a quick chat',
    intro: 'Pick a slot. 15 minutes - we check if it fits.',
    tidyCalUrl: 'https://tidycal.com/tobvision/15-min-project-talk',
  },
};

export type EnContent = typeof en;
