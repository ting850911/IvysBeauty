export interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  imageUrls: string[];
}

export interface AboutData {
  eyebrow: string;
  title: string;
  description: string;
}

export interface BookingRuleItem {
  title: string;
  content: string; // HTML string
}

export interface NoticeData {
  eyebrow: string;
  title: string;
  description: string;
  rules: BookingRuleItem[];
}

export interface HomeContent {
  id?: string;
  hero: HeroData;
  about: AboutData;
  notice: NoticeData;
}
