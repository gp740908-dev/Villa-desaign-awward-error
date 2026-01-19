
export interface Villa {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  pricePerNight: number;
  bedrooms: number;
  guests: number;
  bathrooms: number;
  area: number; // in sqm
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  gallery: string[];
  amenities: string[];
}

export interface ContentBlock {
    type: 'paragraph' | 'header' | 'image' | 'quote' | 'divider';
    value: string;
    caption?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string; // 'Culture' | 'Dining' | 'Wellness' | 'Stays'
  date: string;
  readTime: string;
  author: string;
  imageUrl: string;
  content: ContentBlock[];
  relatedVillaId?: string; // Optional link to a Villa for "Shop the Stay"
  isFeatured?: boolean;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  icon: 'yoga' | 'dining' | 'culture';
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
}

export type GuideCategory = 'Eat & Drink' | 'Sacred Places' | 'Nature' | 'Wellness';

export interface GuideLocation {
  id: string;
  title: string;
  category: GuideCategory;
  description: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  conciergeTip: string;
  relatedVillaId?: string; // For smart linking
}