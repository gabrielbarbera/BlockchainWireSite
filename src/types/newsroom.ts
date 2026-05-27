export interface IndustryNewsItem {
  title: string;
  link: string;
  isoDate: string;
  pubDate: string;
  contentSnippet: string;
  feedTitle: string;
  feedDefaultImage: string;
  creator: string;
  categories: string[];
  image: string | null;
}

export interface IndustryNewsSource {
  id: string;
  name: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  creator: string;
  category: string;
  organization: string;
  guid: string;
  slug: string;
  image: string | null;
}
