export type GalleryCategoryConfig = {
  slug: string;
  title: string;
  description?: string;
};

export const GALLERY_CATEGORIES: GalleryCategoryConfig[] = [
  { slug: 'armies', title: 'Armies', description: '' },
  { slug: 'characters', title: 'Characters', description: '' },
  { slug: 'big-stuff', title: 'Big Stuff', description: '' },
  { slug: 'squads', title: 'Squads', description: '' },
  { slug: 'monsters', title: 'Monsters', description: '' },
  { slug: 'vehicles', title: 'Vehicles', description: '' },
  { slug: 'dnd-board-game', title: 'D&D & Board Game', description: '' },
  {
    slug: 'kingdom-death-monster',
    title: 'Kingdom Death Monster',
    description: '',
  },
];
