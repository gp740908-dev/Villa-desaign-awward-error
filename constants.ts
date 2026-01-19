
import { Villa, BlogPost, Experience, Testimonial, GuideLocation } from './types';

export const VILLAS: Villa[] = [
  {
    id: '1',
    name: 'Villa Amara',
    description: 'A sanctuary of silence overlooking the Ayung River valley. Infinity pool included.',
    longDescription: "Perched on the edge of the sacred Ayung River valley, Villa Amara is a testament to the harmony between modern luxury and raw nature. Designed by renowned architect Ketut Arthana, the structure utilizes sustainable bamboo and recycled ironwood to create an open-air living experience that dissolves the boundaries between indoors and outdoors.\n\nWaking up in Villa Amara is a spiritual experience. The morning mist rolls off the river, revealing the dense emerald canopy that surrounds your private sanctuary. The infinity pool appears to drop directly into the jungle below, offering a swimming experience that feels like floating above the treetops.",
    pricePerNight: 7000000,
    bedrooms: 3,
    guests: 6,
    bathrooms: 4,
    area: 450,
    location: 'Sayan Ridge',
    coordinates: { lat: -8.5049, lng: 115.2536 },
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop', // Interior
        'https://images.unsplash.com/photo-1576013551627-5cc20b32557a?q=80&w=2070&auto=format&fit=crop', // Pool detail
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop'  // Bedroom
    ],
    amenities: ['Infinity Pool', 'Private Chef', 'Yoga Shala', 'High-speed Fiber Wi-Fi', 'Sonos Sound System', 'Butler Service']
  },
  {
    id: '2',
    name: 'The Bamboo House',
    description: 'Sustainable luxury architecture entirely made of bamboo, immersed in the jungle.',
    longDescription: "A masterpiece of sustainable engineering, The Bamboo House redefines eco-luxury. Every curve, column, and rafter is constructed from locally sourced bamboo, treated naturally to last a lifetime. This multi-level structure features an open-concept design that invites the cool jungle breeze to flow freely through the living spaces.\n\nLocated near the famous Tegalalang rice terraces, this villa offers seclusion without isolation. The unique basket-weave architecture creates stunning patterns of light and shadow throughout the day, making it a photographer's dream and a peaceful retreat for the soul.",
    pricePerNight: 5000000,
    bedrooms: 2,
    guests: 4,
    bathrooms: 2,
    area: 280,
    location: 'Tegalalang',
    coordinates: { lat: -8.4357, lng: 115.2801 },
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1512918760513-95f69295d4eb?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: ['River Access', 'Organic Garden', 'Open-air Bathtub', 'Daily Housekeeping', 'Scooter Rental', 'Breakfast Included']
  },
  {
    id: '3',
    name: 'Estate Indrani',
    description: 'Colonial luxury meets Balinese spirituality. Featuring a private yoga shala.',
    longDescription: "Estate Indrani captures the essence of old-world Bali with a touch of colonial elegance. Antique Javanese Joglos have been repurposed and modernized to create a sprawling estate perfect for large families or retreats. The manicured gardens are dotted with frangipani trees and ancient stone statues, leading the way to a private river ghat.\n\nThe centerpiece of the estate is the dedicated Yoga Shala, positioned to face the rising sun. Inside, the villa features curated art pieces from across the archipelago, blending museum-quality aesthetics with the comfort of a luxury home.",
    pricePerNight: 13500000,
    bedrooms: 5,
    guests: 10,
    bathrooms: 6,
    area: 800,
    location: 'Penestanan',
    coordinates: { lat: -8.5100, lng: 115.2505 },
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-e32cb1656157?q=80&w=2071&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: ['Private Driver', 'Full Staff', 'Media Room', 'Massage Room', 'Wine Cellar', 'BBQ Area']
  },
  {
    id: '4',
    name: 'Villa Komenka',
    description: 'Modern minimalist design surrounded by heritage rice terraces.',
    longDescription: "For those who appreciate sharp lines and modern aesthetics, Villa Komenka offers a striking contrast to the organic shapes of the surrounding rice paddies. Floor-to-ceiling glass walls ensure that the view is never obstructed, flooding the interiors with natural light. The decor is strictly minimalist, using a palette of concrete, wood, and linen to create a calm, uncluttered atmosphere.\n\nDespite its modern look, the villa respects its location in Campuhan, known as the artist's village. It serves as a blank canvas for nature's colors, allowing the vibrant greens of the rice fields to take center stage.",
    pricePerNight: 8500000,
    bedrooms: 4,
    guests: 8,
    bathrooms: 5,
    area: 550,
    location: 'Campuhan',
    coordinates: { lat: -8.5020, lng: 115.2570 },
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop'
    ],
    amenities: ['Lap Pool', 'Smart Home System', 'Gym', 'Roof Terrace', 'Work Space', 'Concierge']
  }
];

export const TEAM_MEMBERS = [
    {
        id: 't1',
        name: 'Elara Vance',
        role: 'Head Curator',
        bio: 'With a decade of experience in luxury hospitality across the archipelago, Elara handpicks every property in our collection.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'
    },
    {
        id: 't2',
        name: 'Wayan Sudra',
        role: 'Concierge Director',
        bio: 'Born in the heart of Ubud, Wayan holds the keys to the island’s most exclusive and sacred experiences.',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 't3',
        name: 'Isabella Ross',
        role: 'Wellness Architect',
        bio: 'A certified yoga instructor and sound healer, ensuring your stay rejuvenates both body and spirit.',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
    }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Slow Living in Ubud',
    excerpt: 'Discover why the creative heart of Bali demands you to pause, breathe, and reconnect with the rhythm of nature.',
    category: 'Wellness',
    date: 'October 12, 2023',
    readTime: '6 min read',
    author: 'Isabella Ross',
    imageUrl: 'https://images.unsplash.com/photo-1559390648-dd4d941e9645?q=80&w=2000&auto=format&fit=crop',
    isFeatured: true,
    relatedVillaId: '1',
    content: [
      { type: 'paragraph', value: 'There is a distinct frequency to Ubud. It hums in the background, a low-vibration chant composed of rustling palm fronds, distant gamelan practice, and the ceaseless flow of the Ayung River. To arrive here is to step out of the linear march of time and into a cyclical existence.' },
      { type: 'quote', value: 'We do not visit Ubud to escape life, but for life not to escape us.' },
      { type: 'paragraph', value: 'Slow living here isn’t a curated aesthetic; it’s a survival mechanism. The heat demands it. The humidity insists upon it. But more than that, the culture rewards it. The Balinese philosophy of Tri Hita Karana—harmony between people, nature, and the divine—cannot be practiced in a rush.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop', caption: 'Morning rituals at the water temple.' },
      { type: 'header', value: 'The Sanctuary of Silence' },
      { type: 'paragraph', value: 'In the western world, silence is often viewed as empty space—something to be filled. In Ubud, silence is a presence. It is heavy, rich, and informative. When staying at properties like Villa Amara, nestled on the Sayan Ridge, you begin to understand that luxury is not just about thread count or infinity pools; it is about the luxury of undistracted attention.' }
    ]
  },
  {
    id: '2',
    title: 'Culinary Secrets: Beyond Nasi Goreng',
    excerpt: 'A guide to the high-end gastronomy scene emerging in the jungle, from fermentation labs to 12-course degustations.',
    category: 'Dining',
    date: 'November 05, 2023',
    readTime: '4 min read',
    author: 'Marcus Chen',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
    content: [
      { type: 'paragraph', value: 'Ubud has long been the capital of health food, raw vegan cheesecakes, and turmeric lattes. But a new wave of chefs is pushing the boundaries of Indonesian cuisine, elevating heritage recipes with modern French techniques.' },
      { type: 'paragraph', value: 'At the forefront is the movement towards hyper-locality. Chefs are no longer just sourcing from the market; they are cultivating their own gardens in the volcanic soil of the highlands.' },
      { type: 'quote', value: 'To taste the soil is to understand the soul of the island.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop', caption: 'Private dining experiences in the jungle.' }
    ]
  },
  {
    id: '3',
    title: 'Hidden Waterfalls of the North',
    excerpt: 'Trekking paths less traveled for the adventurous soul seeking solitude in the raw power of nature.',
    category: 'Adventure',
    date: 'December 20, 2023',
    readTime: '5 min read',
    author: 'Elena Fisher',
    imageUrl: 'https://images.unsplash.com/photo-1519336367661-eba9c1dfa5e9?q=80&w=2070&auto=format&fit=crop',
    content: [
      { type: 'paragraph', value: 'Most guidebooks will point you to Tegenungan. While beautiful, it has become a carnival of selfie sticks. For the true explorer, the magic lies further north, where the air gets thinner and the jungle denser.' },
      { type: 'paragraph', value: 'Sekumpul Waterfall requires effort. It asks for sweat and stamina. But as you descend the hundreds of stairs into the ravine, the roar of the water drowns out the noise of the modern world.' }
    ]
  },
  {
    id: '4',
    title: 'Architecture of the Spirit',
    excerpt: 'How sustainable bamboo structures are redefining luxury and blending seamlessley with the environment.',
    category: 'Stays',
    date: 'January 15, 2024',
    readTime: '7 min read',
    author: 'Ketut Arthana',
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
    relatedVillaId: '2',
    content: [
      { type: 'paragraph', value: 'Bamboo is grass, yet it has the tensile strength of steel. In Bali, a revolution is taking place. Architects are moving away from concrete boxes and returning to organic curves that mimic the shapes found in nature.' },
      { type: 'quote', value: 'A house should not sit on the hill, but be of the hill.' },
      { type: 'paragraph', value: 'The Bamboo House in Tegalalang is a prime example. There are no walls, only woven screens. The wind passes through the structure, naturally cooling it. To stay here is to sleep inside a living basket woven by giants.' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: 'Holistic Wellness',
    description: 'Private yoga sessions and sound healing in the comfort of your villa.',
    icon: 'yoga',
    imageUrl: 'https://images.unsplash.com/photo-1599447421405-0c3072a73195?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Fine Dining',
    description: 'Private chefs bringing the 5-star restaurant experience to your dining table.',
    icon: 'dining',
    imageUrl: 'https://images.unsplash.com/photo-1559390648-dd4d941e9645?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Cultural Immersion',
    description: 'Exclusive access to temple ceremonies and traditional dance performances.',
    icon: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "StayinUBUD didn't just find us a villa; they curated an existence we didn't want to leave.",
    author: "Elena Fisher",
    location: "New York, USA"
  },
  {
    id: '2',
    quote: "The attention to detail is unparalleled. From the scent of the linens to the morning coffee selection.",
    author: "Marcus Chen",
    location: "Singapore"
  }
];

export const BALI_GUIDE_DATA: GuideLocation[] = [
  {
    id: 'g1',
    title: 'Locavore NXT',
    category: 'Eat & Drink',
    description: 'A culinary pilgrimage. This sustainably-minded restaurant serves "hyper-local" cuisine where every ingredient is sourced from Indonesia. The tasting menu is an edible narrative of the archipelago.',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
    coordinates: { lat: -8.5080, lng: 115.2630 },
    conciergeTip: 'Book the "Chef\'s Counter" at least two months in advance for the full theatrical experience.',
    relatedVillaId: '4' // Villa Komenka
  },
  {
    id: 'g2',
    title: 'Pura Tirta Empul',
    category: 'Sacred Places',
    description: 'The holy water temple. Locals and pilgrims come here for "Melukat", a ritual purification in the fresh mountain spring water. It is a place of profound energy and silence amidst the crowds.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
    coordinates: { lat: -8.4149, lng: 115.3160 },
    conciergeTip: 'Arrive at 6:00 AM to witness the morning prayers before the tour buses arrive.',
    relatedVillaId: '2' // Bamboo House
  },
  {
    id: 'g3',
    title: 'Campuhan Ridge Walk',
    category: 'Nature',
    description: 'An emerald spine running through the valley. This paved trail offers sweeping views of the Sungai Wos river and the surrounding hillsides. A favorite for sunrise meditations.',
    imageUrl: 'https://images.unsplash.com/photo-1555400038-63f5ba517a91?q=80&w=1964&auto=format&fit=crop',
    coordinates: { lat: -8.5034, lng: 115.2546 },
    conciergeTip: 'Start at the south end near Ibah Temple and finish at Karsa Kafe for a fresh coconut.',
    relatedVillaId: '1' // Villa Amara
  },
  {
    id: 'g4',
    title: 'Pyramids of Chi',
    category: 'Wellness',
    description: 'Ancient sound healing technology meets modern comfort. Two massive pyramids built to scale with the Great Pyramid of Giza, dedicated to sound therapy and gong baths.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2600&auto=format&fit=crop',
    coordinates: { lat: -8.4870, lng: 115.2580 },
    conciergeTip: 'Try the "Ancient Sound Healing" session during the full moon for a heightened experience.',
  },
  {
    id: 'g5',
    title: 'Room4Dessert',
    category: 'Eat & Drink',
    description: 'Will Goldfarb\'s legendary dessert tasting venue. A multi-stage journey through sugar, texture, and local botanicals, set in a garden that supplies the kitchen.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
    coordinates: { lat: -8.5010, lng: 115.2500 },
    conciergeTip: 'Do not eat dinner beforehand. The 9-course dessert menu is a meal in itself.',
    relatedVillaId: '3' // Estate Indrani
  }
];
