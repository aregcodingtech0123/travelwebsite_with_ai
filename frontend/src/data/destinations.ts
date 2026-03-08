export interface Destination {
  id: string
  name: string
  slug: string
  description: string
  image: string
}

export const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    slug: 'paris',
    description: 'The City of Light awaits with iconic landmarks and timeless charm',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    slug: 'tokyo',
    description: 'Where ancient traditions meet cutting-edge innovation',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    slug: 'barcelona',
    description: 'Gaudí\'s masterpieces and Mediterranean vibes',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    slug: 'istanbul',
    description: 'Where East meets West in stunning harmony',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
  },
  {
    id: 'new-york',
    name: 'New York',
    slug: 'new-york',
    description: 'The city that never sleeps, always inspiring',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    slug: 'dubai',
    description: 'Modern marvels rise from golden desert sands',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  },
  {
    id: 'london',
    name: 'London',
    slug: 'london',
    description: 'Royal heritage meets contemporary culture',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
  },
  {
    id: 'rome',
    name: 'Rome',
    slug: 'rome',
    description: 'Ancient empire echoes through cobblestone streets',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    slug: 'santorini',
    description: 'Whitewashed beauty overlooking the Aegean Sea',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
  },
]
