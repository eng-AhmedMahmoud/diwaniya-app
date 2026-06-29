import type { Category } from "@diwaniya/shared-types";

export const CATEGORIES: { label: Category; ar: string; emoji: string }[] = [
  { label: "Fashion", ar: "أزياء", emoji: "👗" },
  { label: "Beauty", ar: "جمال", emoji: "💄" },
  { label: "Travel", ar: "سفر", emoji: "✈️" },
  { label: "Fitness", ar: "لياقة", emoji: "💪" },
  { label: "Food", ar: "مطاعم", emoji: "🍽️" },
  { label: "Lifestyle", ar: "أسلوب حياة", emoji: "🌿" },
  { label: "Tech", ar: "تقنية", emoji: "💻" },
  { label: "Gaming", ar: "ألعاب", emoji: "🎮" },
  { label: "Music", ar: "موسيقى", emoji: "🎵" },
  { label: "Family", ar: "عائلة", emoji: "👨‍👩‍👧" },
  { label: "Comedy", ar: "كوميديا", emoji: "😂" },
  { label: "Pets", ar: "حيوانات أليفة", emoji: "🐾" },
];

export const PLATFORMS = [
  { value: "instagram" as const, label: "Instagram", ar: "إنستغرام", icon: "📸" },
  { value: "snapchat" as const, label: "Snapchat", ar: "سناب شات", icon: "👻" },
  { value: "tiktok" as const, label: "TikTok", ar: "تيك توك", icon: "🎬" },
  { value: "youtube" as const, label: "YouTube", ar: "يوتيوب", icon: "▶️" },
  { value: "ugc" as const, label: "UGC", ar: "محتوى UGC", icon: "🎥" },
];

export const KW_CITIES = [
  { en: "Kuwait City", ar: "مدينة الكويت" },
  { en: "Hawalli", ar: "حولي" },
  { en: "Salmiya", ar: "السالمية" },
  { en: "Jahra", ar: "الجهراء" },
  { en: "Ahmadi", ar: "الأحمدي" },
  { en: "Farwaniya", ar: "الفروانية" },
  { en: "Mubarak Al-Kabeer", ar: "مبارك الكبير" },
  { en: "Fahaheel", ar: "الفحيحيل" },
  { en: "Sabah Al-Salem", ar: "صباح السالم" },
];

// Backwards-compatible alias for any caller still importing KSA_CITIES.
export const KSA_CITIES = KW_CITIES;
