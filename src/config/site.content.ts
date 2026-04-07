import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Image sharing & creator profiles',
  },
  footer: {
    tagline: 'Visual posts and public profiles',
  },
  hero: {
    badge: 'Latest visuals & creators',
    title: ['A home for', 'images, galleries, and creator profiles.'],
    description:
      'Explore image-led posts, browse creator profiles, and move between visual work and the people behind it in one focused experience.',
    primaryCta: {
      label: 'Browse image sharing',
      href: '/image-sharing',
    },
    secondaryCta: {
      label: 'Explore profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search images, creators, and profiles',
    focusLabel: 'Focus',
    featureCardBadge: 'latest cover rotation',
    featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
    featureCardDescription:
      'Recent images and creator surfaces stay at the center of the experience without changing any core platform behavior.',
  },
  home: {
    metadata: {
      title: 'Image sharing, galleries, and creator profiles',
      description:
        'Browse image-led posts, discover creators, and explore public profiles through a calmer, visual-first experience.',
      openGraphTitle: 'Image sharing, galleries, and creator profiles',
      openGraphDescription:
        'Discover visual posts and creator profiles through a gallery-style platform built for images and people.',
      keywords: ['image sharing', 'creator profiles', 'photo gallery', 'visual discovery', 'photography'],
    },
    introBadge: 'About the platform',
    introTitle: 'Built for images, creators, and the stories behind the work.',
    introParagraphs: [
      'This site brings together image sharing and public profiles so visitors can move naturally between visual posts and the creators who publish them.',
      'Instead of scattering visuals and identity across disconnected surfaces, the platform keeps galleries and profiles connected with consistent navigation.',
      'Whether someone starts with a feed of images or a creator profile, they can keep exploring related work without friction.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Image-first browsing with a gallery-style rhythm.',
      'Profiles that anchor trust and context for every creator.',
      'Cleaner exploration between visuals and the people behind them.',
      'Lightweight interactions that keep the experience fast and visual.',
    ],
    primaryLink: {
      label: 'Browse image sharing',
      href: '/image-sharing',
    },
    secondaryLink: {
      label: 'Explore profiles',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Start exploring',
    title: 'Explore image sharing and creator profiles in one connected experience.',
    description:
      'Move between visual posts and public profiles through one clearer, image-led system.',
    primaryCta: {
      label: 'Get Started Free',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Image sharing and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from creators across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover creator and brand profiles—identity surfaces that connect to image sharing and galleries.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'When listings are enabled, they can complement image sharing and profiles so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context and discover related visual work from connected profiles.',
    ],
    links: [
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'When articles are enabled, they can sit alongside image sharing and profiles so reading can lead naturally into visual work and creator identity.',
      'Use this section to browse thoughtful posts, then continue into galleries and profiles when you want more context.',
    ],
    links: [
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'When enabled, they can sit alongside image sharing and profiles so short updates connect to visual work and creators.',
      'Browse by category to find announcements quickly, then continue into image sharing or profiles when you need more context.',
    ],
    links: [
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
    ],
  },
  image: {
    title: 'Image sharing and visual stories',
    paragraphs: [
      'Image sharing highlights visual posts, galleries, and story-led content where photography and design take the lead.',
      'Every post connects to the people behind the work—open a profile to learn more about the creator behind a series.',
      'Browse the feed, discover new work, and follow creators through their profiles.',
    ],
    links: [
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Search', href: '/search' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a creator, brand, or project and help visitors understand who is behind the work they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with image galleries and visual posts from the same source.',
      'Browse profiles to understand creators more clearly, then dive into image sharing to see the full picture.',
    ],
    links: [
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'When enabled, bookmarks stay easy to pair with image sharing and profiles so saved links stay connected to visual discovery.',
      'Use this section to organize helpful sources, then explore profiles and galleries for related work.',
    ],
    links: [
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources.',
      'When enabled, these resources can sit alongside image sharing and profiles so files stay connected to creators and visual work.',
      'Browse to find relevant files, then continue into profiles or galleries for more context.',
    ],
    links: [
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with image sharing and profiles by helping visitors move from brief updates into galleries and creator pages.',
      'Use these posts as lightweight entry points into visual work and public profiles.',
    ],
    links: [
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected to posts and help keep discussion close to the content it belongs to.',
      'This layer adds perspective without needing a separate standalone format.',
      'Use comments as supporting context, then continue exploring image sharing and profiles in the same topic area.',
    ],
    links: [
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'When enabled, they can sit alongside image sharing and profiles to create a clearer structure for how work is presented.',
      'Connect organization pages with related galleries and creator profiles for a unified presence.',
    ],
    links: [
      { label: 'Browse image sharing', href: '/image-sharing' },
      { label: 'Explore profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
    ],
  },
}
