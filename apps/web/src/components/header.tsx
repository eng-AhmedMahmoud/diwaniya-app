import Link from "next/link";
import { getSession } from "@/lib/session";
import { UserMenu } from "./user-menu";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { t } from "@/lib/i18n";

/**
 * Diwaniya header — two-row stacked layout. Top row: centered wordmark with
 * actions on the trailing edge. Bottom row: pill-style nav strip with a thin
 * accent rule. Distinct silhouette from Nakhla's single-row horizontal flex.
 */
export async function Header() {
  const me = await getSession();
  const i = await t();
  const items = [
    { href: "/influencers", label: i.nav.find },
    { href: "/campaigns", label: i.nav.campaigns },
    { href: "/for-creators", label: i.nav.forCreators },
    { href: "/pricing", label: i.nav.pricing },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top row: brand centered, actions trailing */}
        <div className="h-14 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex items-center gap-2 justify-self-start text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
            <span className="hidden sm:inline">🇰🇼 Kuwait · ديوانية</span>
          </div>

          <Link href="/" className="flex items-center gap-2.5 justify-self-center group">
            <span className="h-10 w-10 rounded-2xl brand-gradient brand-glow grid place-items-center text-white font-black text-xl group-hover:scale-105 transition-transform">د</span>
            <span className="font-display text-2xl text-fg tracking-tight">{i.brand.name}</span>
          </Link>

          <div className="flex items-center gap-2 justify-self-end">
            <LocaleSwitcher />
            <ThemeToggle />
            {me ? (
              <UserMenu me={me} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full border border-brand-300 text-brand-700 dark:text-brand-300 text-sm font-bold hover:bg-brand-50 dark:hover:bg-brand-900/30 transition"
                >
                  {i.nav.login}
                </Link>
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex items-center px-5 py-1.5 rounded-full brand-gradient brand-glow text-white text-sm font-bold hover:opacity-95 transition"
                >
                  {i.nav.signup}
                </Link>
              </>
            )}
            <MobileNav items={items} loginLabel={i.nav.login} signupLabel={i.nav.signup} authed={!!me} />
          </div>
        </div>

        {/* Bottom row: pill nav with center underline accent */}
        <nav className="hidden md:flex items-center justify-center gap-1.5 pb-2.5 pt-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-fg/75 hover:text-fg hover:bg-brand-50 dark:hover:bg-brand-900/30 transition"
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
      {/* Accent rule — indigo→saffron, signature stripe */}
      <div aria-hidden className="h-[2px] bg-gradient-to-r from-brand-600 via-brand-400 to-accent" />
    </header>
  );
}
