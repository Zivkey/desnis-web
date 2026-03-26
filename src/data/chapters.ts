export interface Chapter {
  id: number;
  name: string;
  slug: string;
  scrollRange: [number, number];
  background: string;
}

const COUNT = 7;
const SIZE = 1 / COUNT;

export const chapters: Chapter[] = [
  { id: 0, name: "HERO", slug: "hero", scrollRange: [0, SIZE], background: "chapter-bg-0" },
  { id: 1, name: "SEO", slug: "seo", scrollRange: [SIZE, SIZE * 2], background: "chapter-bg-1" },
  { id: 2, name: "DESIGN", slug: "design", scrollRange: [SIZE * 2, SIZE * 3], background: "chapter-bg-2" },
  { id: 3, name: "DEV", slug: "development", scrollRange: [SIZE * 3, SIZE * 4], background: "chapter-bg-3" },
  { id: 4, name: "WORK", slug: "work", scrollRange: [SIZE * 4, SIZE * 5], background: "chapter-bg-4" },
  { id: 5, name: "TESTIMONIALS", slug: "testimonials", scrollRange: [SIZE * 5, SIZE * 6], background: "chapter-bg-5" },
  { id: 6, name: "CONTACT", slug: "contact", scrollRange: [SIZE * 6, 1], background: "chapter-bg-6" },
];
