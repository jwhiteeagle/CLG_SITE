export type GalleryCategoryConfig = {
  slug: string;
  title: string;
  description?: string;
};

export const GALLERY_CATEGORIES: GalleryCategoryConfig[] = [
  {
    slug: 'armies',
    title: 'Armies',
    description: 'Large collections, armies, and themed projects. Army painting is a LOT of repitition. To avoid creative burnout, I always work on multiple commissions at once. Usually, this is 1-2 full armies alongside 1-2 smaller projects.',
  },
  {
    slug: 'big-stuff',
    title: 'Big Stuff',
    description: 'I have had the privilege of painting some really large kits over the years. Working on the big Forgeworld resin kits is a totally different set of challenges. Each build is a truly unique case of problem solving to ensure they are sturdy and durable. I love getting to use my engineering brain and woodworking skillset to assemble these models and create safe storage or transportation methods for them.',
  },
  {
    slug: 'characters',
    title: 'Characters',
    description: 'I am generally an "army painter" or "titan painter". I am super envious of the true Box Art "Studio Painters" and have been trying to push my skills more into that sphere as time allows. These are some of my favorite pieces to paint, as they allow me to really focus on the details and push my skills further.',
  },
  {
    slug: 'vehicles',
    title: 'Vehicles',
    description: 'Tanks, suits, and all things with engines. Vehicles are a great way to practice different painting techniques, weathering effects, and detailing. I have a lot of random WIP / Airbrush bombed models in this gallery along with finished pieces.',
  },
  {
    slug: 'monsters',
    title: 'Monsters',
    description: 'Creatures, beasts, and monsters. If I HAD to pick a favorite subject to paint, this would be it! I love the organic shapes and textures that come with painting monsters. You can often get really wild with color choices and effects too.',
  },
  {
    slug: 'squads',
    title: 'Squads',
    description: 'Units, teams, and smaller grouped projects. Some of the shots here are smaller groups from bigger army commissions.',
  },
  {
    slug: 'studio',
    title: 'Studio',
    description: 'I get a ton of questions about my workspace and setup- here are some photos of my studio and how it has changed over the years.',
  },
  {
    slug: 'kingdom-death-monster',
    title: 'Kingdom Death Monster',
    description: 'KDM survivors, monsters, and more. I LOVE painting Kingdom Death Monster minis. I have been fortunate enough to paint multiple core sets and play the game myself!',
  },
  {
    slug: 'in-game-shots',
    title: 'In-Game Shots',
    description: 'I used to play a good amount of Warhammer 40k, 30k, and Age of Sigmar. I even recorded battle reports for a while on YouTube! This gallery contains a bunch of in game shots I took over the years.',
  },
  {
    slug: 'bases-and-terrain',
    title: 'Bases & Terrain',
    description: 'Bases, terrain, scenic elements, etc. I love building custom terrain, display boards, or display plinths to enhance the overall look of my miniatures.',
  },
];
