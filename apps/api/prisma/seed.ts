import { PrismaClient, Platform, Category } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type Seed = {
  username: string;
  name: string;
  email: string;
  headline: string;
  city: string;
  country: string;
  platforms: Platform[];
  categories: Category[];
  followers: { ig?: number; tt?: number; yt?: number };
  startingPrice: number;
  badges: string[];
  cover: string;
};

// Kuwait creator roster — niches reflecting the local market (food reviews,
// perfumes/oud, abaya/modest fashion, chalets/kashta, ramadan content, gaming).
// Prices in KWD units (not fils).
const SEEDS: Seed[] = [
  { username: "mat3am.q8", name: "Mat3am Q8 · مطعم الكويت", email: "mat3am@example.dev", headline: "Food & restaurant reviews · مراجعات مطاعم الكويت", city: "Kuwait City · مدينة الكويت", country: "KW", platforms: ["instagram"], categories: ["Food","Lifestyle"], followers: { ig: 380000 }, startingPrice: 320, badges: ["Top Creator","Verified"], cover: "https://picsum.photos/seed/mat3am.q8/1200/600" },
  { username: "noor.alabaya", name: "Noor Al-Abaya · نور العباية", email: "noor@example.dev", headline: "Abaya & modest luxury · عبايات راقية", city: "Hawalli · حولي", country: "KW", platforms: ["instagram"], categories: ["Fashion","Beauty"], followers: { ig: 215000 }, startingPrice: 240, badges: ["Top Creator"], cover: "https://picsum.photos/seed/noor.alabaya/1200/600" },
  { username: "oud.bukhoor", name: "Oud & Bukhoor House · بيت العود والبخور", email: "oud@example.dev", headline: "Perfumes · oud · bakhoor · عطور وبخور", city: "Salmiya · السالمية", country: "KW", platforms: ["instagram","tiktok"], categories: ["Lifestyle","Fashion"], followers: { ig: 142000, tt: 95000 }, startingPrice: 180, badges: ["Top Creator","Verified"], cover: "https://picsum.photos/seed/oud.bukhoor/1200/600" },
  { username: "chalet.kw", name: "Chalet Kuwait · شاليه الكويت", email: "chalet@example.dev", headline: "Chalets · real estate tours · شاليهات وعقارات", city: "Ahmadi · الأحمدي", country: "KW", platforms: ["tiktok","instagram"], categories: ["Travel","Lifestyle"], followers: { tt: 198000, ig: 86000 }, startingPrice: 210, badges: ["Top Creator"], cover: "https://picsum.photos/seed/chalet.kw/1200/600" },
  { username: "beautybyfatma", name: "Beauty by Fatma · فاطمة بيوتي", email: "fatma@example.dev", headline: "Beauty & skincare creator · جمال وعناية", city: "Kuwait City · مدينة الكويت", country: "KW", platforms: ["instagram","tiktok"], categories: ["Beauty","Lifestyle"], followers: { ig: 540000, tt: 320000 }, startingPrice: 420, badges: ["Top Creator","Verified","Responds Fast"], cover: "https://picsum.photos/seed/beautybyfatma/1200/600" },
  { username: "kashta.q8", name: "Kashta Q8 · كشتة الكويت", email: "kashta@example.dev", headline: "Desert camping · kashta · 4x4 · رحلات البر", city: "Jahra · الجهراء", country: "KW", platforms: ["tiktok","youtube"], categories: ["Travel","Lifestyle"], followers: { tt: 87000, yt: 28000 }, startingPrice: 130, badges: ["Responds Fast"], cover: "https://picsum.photos/seed/kashta.q8/1200/600" },
  { username: "ramadan.maa.mom", name: "Ramadan Ma'a Om Ali · رمضان مع أم علي", email: "ramadan@example.dev", headline: "Ramadan recipes & family content · وصفات رمضان", city: "Farwaniya · الفروانية", country: "KW", platforms: ["instagram","tiktok"], categories: ["Food","Family"], followers: { ig: 312000, tt: 180000 }, startingPrice: 260, badges: ["Top Creator"], cover: "https://picsum.photos/seed/ramadan.maa.mom/1200/600" },
  { username: "fit.salmiya", name: "Fit Salmiya · فِت السالمية", email: "fitsalmiya@example.dev", headline: "Fitness & wellness coach · لياقة وعافية", city: "Salmiya · السالمية", country: "KW", platforms: ["instagram"], categories: ["Fitness","Lifestyle"], followers: { ig: 96000 }, startingPrice: 140, badges: ["Responds Fast"], cover: "https://picsum.photos/seed/fit.salmiya/1200/600" },
  { username: "cars.q8.luxury", name: "Cars Q8 Luxury · سيارات الكويت", email: "carsq8@example.dev", headline: "Luxury automotive reviews · مراجعات سيارات فاخرة", city: "Kuwait City · مدينة الكويت", country: "KW", platforms: ["youtube","instagram"], categories: ["Tech","Lifestyle"], followers: { yt: 178000, ig: 92000 }, startingPrice: 280, badges: ["Top Creator","Verified"], cover: "https://picsum.photos/seed/cars.q8.luxury/1200/600" },
  { username: "gaming.aboq8", name: "Abo Q8 Gaming · أبو الكويت قيمنق", email: "abogaming@example.dev", headline: "Gaming creator · جيمر وترفيه · @teamfalconsq8", city: "Hawalli · حولي", country: "KW", platforms: ["youtube","tiktok"], categories: ["Gaming","Tech"], followers: { yt: 425000, tt: 240000 }, startingPrice: 380, badges: ["Top Creator","Verified"], cover: "https://picsum.photos/seed/gaming.aboq8/1200/600" },
];

async function main() {
  console.log("Seeding Diwaniya (Kuwait market)…");

  if (process.env.ENABLE_DEMO_ADMIN === "1") {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Refusing to seed demo admin in production. Bootstrap a real admin via secrets.");
    }
    const adminPassword = process.env.DEMO_ADMIN_PASSWORD || "Admin1234!";
    const adminEmail = process.env.DEMO_ADMIN_EMAIL || "admin@diwaniya.app";
    const adminHash = await bcrypt.hash(adminPassword, 11);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        name: "Diwaniya Admin",
        role: "admin",
        passwordHash: adminHash,
        emailVerifiedAt: new Date(),
      },
    });
    console.log(`  Admin (dev only): ${adminEmail} / ${adminPassword}`);
  } else {
    console.log("  Admin user NOT seeded. Set ENABLE_DEMO_ADMIN=1 for local dev.");
  }

  const brandHash = await bcrypt.hash("Password123!", 11);
  const brand = await prisma.user.upsert({
    where: { email: "brand@example.dev" },
    update: {},
    create: {
      email: "brand@example.dev",
      name: "Boutiqaat · بوتيكات",
      role: "brand",
      passwordHash: brandHash,
      brandProfile: { create: { brandName: "Boutiqaat · بوتيكات" } },
    },
  });

  for (const s of SEEDS) {
    const passwordHash = await bcrypt.hash("Password123!", 11);
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        email: s.email,
        name: s.name,
        role: "creator",
        passwordHash,
        avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(s.username)}`,
      },
    });
    const profile = await prisma.creatorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        username: s.username,
        headline: s.headline,
        bio: `${s.headline}. Working with brands across ${s.categories.slice(0,2).join(" and ")} to create thumb-stopping content that converts in the Kuwait market.`,
        city: s.city,
        country: s.country,
        coverUrl: s.cover,
        startingPrice: s.startingPrice,
        platforms: s.platforms,
        categories: s.categories,
        badges: s.badges,
        followersIg: s.followers.ig,
        followersTt: s.followers.tt,
        followersYt: s.followers.yt,
        avgViews: Math.round((s.followers.ig ?? s.followers.tt ?? s.followers.yt ?? 5000) * 0.18),
        engagement: Math.round((Math.random() * 4 + 2) * 10) / 10,
        portfolio: Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/${s.username}-${i}/600/600`),
        audience: {
          locations: [
            { code: "KW", flag: "🇰🇼", pct: 74 },
            { code: "SA", flag: "🇸🇦", pct: 8 },
            { code: "AE", flag: "🇦🇪", pct: 7 },
            { code: "QA", flag: "🇶🇦", pct: 5 },
            { code: "BH", flag: "🇧🇭", pct: 3 },
            { code: "OM", flag: "🇴🇲", pct: 3 },
          ],
          ages: [
            { range: "13-17", pct: 6 },
            { range: "18-24", pct: 42 },
            { range: "25-34", pct: 36 },
            { range: "35-44", pct: 12 },
            { range: "45+", pct: 4 },
          ],
          gender: { female: 62, male: 38 },
        },
      },
    });
    const existingPkgs = await prisma.package.count({ where: { creatorId: profile.id } });
    if (existingPkgs === 0) {
      await prisma.package.createMany({
        data: [
          { creatorId: profile.id, title: `1 ${s.platforms[0].toUpperCase()} Post`, price: s.startingPrice },
          { creatorId: profile.id, title: `1 ${s.platforms[0].toUpperCase()} Story`, price: Math.round(s.startingPrice * 0.6) },
          { creatorId: profile.id, title: `Bundle: 3 Posts + 5 Stories`, price: Math.round(s.startingPrice * 3.2) },
        ],
      });
    }
  }

  const camps = await prisma.campaign.count({ where: { brandId: brand.id } });
  if (camps === 0) {
    await prisma.campaign.createMany({
      data: [
        {
          brandId: brand.id,
          title: "Hala February Drop — Modest Fashion Capsule · تشكيلة هلا فبراير",
          description: "We need Kuwait fashion creators in Kuwait City and Hawalli to film honest try-on reviews of our Hala February modest capsule. Focus on fabric breathability, cut, and how it pairs with daily Kuwaiti looks.",
          budgetMin: 200, budgetMax: 4500,
          platforms: ["instagram", "tiktok"],
          categories: ["Fashion", "Beauty"],
          creatorsNeeded: 8,
        },
        {
          brandId: brand.id,
          title: "Ramadan Iftar Discoveries · اكتشافات إفطار رمضان",
          description: "نبحث عن صانعي محتوى الطعام في الكويت لمراجعة قائمة الإفطار الجديدة. تركيز على الأطباق التراثية الكويتية + خيارات صحية. سيتم الترويج على إنستغرام وسناب شات خلال أول 15 يومًا من رمضان.",
          budgetMin: 300, budgetMax: 8000,
          platforms: ["instagram", "tiktok"],
          categories: ["Food", "Lifestyle"],
          creatorsNeeded: 12,
        },
        {
          brandId: brand.id,
          title: "National Day Oud Collection · مجموعة عود اليوم الوطني",
          description: "Limited-edition oud collection launch for Kuwait National Day (Feb 25) + Liberation Day (Feb 26). Looking for perfume specialists to feature the new bottles + scent profiles.",
          budgetMin: 250, budgetMax: 6200,
          platforms: ["instagram"],
          categories: ["Lifestyle", "Fashion"],
          creatorsNeeded: 6,
        },
        {
          brandId: brand.id,
          title: "Diwaniya Talks: Young Entrepreneurs · حوارات الديوانية",
          description: "حلقات بودكاست بفيديو مع رواد أعمال كويتيين شباب. نبحث عن صناع محتوى يقدمون الحلقات ويستضيفون الضيوف من القطاعات المختلفة.",
          budgetMin: 400, budgetMax: 3500,
          platforms: ["youtube", "instagram"],
          categories: ["Lifestyle", "Tech"],
          creatorsNeeded: 4,
        },
        {
          brandId: brand.id,
          title: "Kashta Connectivity 5G — Winter Edition · كشتة الشتاء",
          description: "Showcase 5G connectivity in remote Kuwaiti desert camp (kashta) locations. Looking for kashta + outdoor creators to film weekend trips and stream live from off-grid camps.",
          budgetMin: 300, budgetMax: 5800,
          platforms: ["tiktok", "youtube"],
          categories: ["Travel", "Lifestyle"],
          creatorsNeeded: 5,
        },
      ],
    });
  }

  console.log("Seed done.");
  console.log("  Brand   : brand@example.dev / Password123!  (Boutiqaat)");
  console.log("  Creator : mat3am@example.dev / Password123!  (Kuwait City, food · 380k IG)");
  console.log(`  Seeded ${SEEDS.length} Kuwait creators + 5 Kuwait campaigns.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
