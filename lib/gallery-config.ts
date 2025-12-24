export type GalleryCategoryConfig = {
  slug: string;
  title: string;
  description?: string;
};

export const GALLERY_CATEGORIES: GalleryCategoryConfig[] = [
  {
    slug: 'armies',
    title: 'Armies',
    description: 'Large, themed collections. To avoid creative burnout, I always work on multiple commissions at once. These are some of my favorite army commissions I snagged pictures of over the years.',
  },
  {
    slug: 'characters',
    title: 'Characters',
    description: 'Anything that gets extra painting time within an army. Sergeants, Leaders, or just cool lookin dudes.',
  },
  {
    slug: 'big-stuff',
    title: 'Big Stuff',
    description: 'Large models, warped resin, and high-impact builds.',
  },
  {
    slug: 'squads',
    title: 'Squads',
    description: 'Units, teams, and smaller grouped projects.',
  },
  {
    slug: 'monsters',
    title: 'Monsters',
    description: 'Creatures, beasts, and monstrous minis.',
  },
  {
    slug: 'vehicles',
    title: 'Vehicles',
    description: 'Tanks, suits, and all things with engines.',
  },
  {
    slug: 'dnd-board-game',
    title: 'D&D & Board Games',
    description: 'Miniatures for tabletop RPGs and board game collections.',
  },
  {
    slug: 'kingdom-death-monster',
    title: 'Kingdom Death Monster',
    description: 'KDM survivors, monsters, and narrative collections.',
  },
];
