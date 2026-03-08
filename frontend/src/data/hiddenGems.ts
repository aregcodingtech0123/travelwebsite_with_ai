export interface HiddenGem {
  id: string
  name: string
  slug: string
  description: string
  image: string
}

export const hiddenGems: HiddenGem[] = [
  {
    id: 'hallstatt',
    name: 'Hallstatt',
    slug: 'hallstatt',
    description: 'Alpine village mirrored in a glassy lake',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80',
  },
  {
    id: 'santorini-oia',
    name: 'Oia, Santorini',
    slug: 'oia-santorini',
    description: 'White caves and golden sunsets over the caldera',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
  },
  {
    id: 'cinque-terre',
    name: 'Cinque Terre',
    slug: 'cinque-terre',
    description: 'Five colourful villages clinging to the Italian coast',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
  },
  {
    id: 'plitvice',
    name: 'Plitvice Lakes',
    slug: 'plitvice',
    description: 'Turquoise waterfalls and wooden walkways',
    image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80',
  },
  {
    id: 'capadoccia',
    name: 'Cappadocia',
    slug: 'cappadocia',
    description: 'Fairy chimneys and hot-air balloon dawns',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80',
  },
  {
    id: 'faroe',
    name: 'Faroe Islands',
    slug: 'faroe-islands',
    description: 'Dramatic cliffs and green hills in the North Atlantic',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
  },
]
