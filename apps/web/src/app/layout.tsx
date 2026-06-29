import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeScript } from "@/components/theme-script";
import { getLocale, dirOf, messages, type Dict } from "@/lib/i18n";
import { LocaleProvider } from "@/components/locale-provider";

export const metadata: Metadata = {
  title: "Diwaniya — Hire Kuwait Influencers & UGC Creators",
  description:
    "Hire creators in Kuwait across Instagram, TikTok, YouTube, Snapchat, and UGC. Vetted talent, secure KWD payments, real results.",
  applicationName: "Diwaniya",
  keywords: ["Kuwait", "Kuwait", "influencer marketing", "UGC", "TikTok", "Instagram", "Snapchat", "Kuwait City", "Hawalli", "ديوانية", "مؤثرين", "السعودية"],
  openGraph: {
    title: "Diwaniya — ديوانية",
    description: "Hire vetted creators across the Kingdom. Pay in KWD. Ship campaigns in days.",
    locale: "en_KW",
    alternateLocale: ["ar_KW"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const dict = messages[locale] as Dict;
  return (
    <html lang={locale} dir={dirOf(locale)} className="h-full antialiased" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <LocaleProvider locale={locale} t={dict}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
