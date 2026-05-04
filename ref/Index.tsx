import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PortfolioFilter } from "@/components/PortfolioFilter";
import { PortfolioCard } from "@/components/PortfolioCard";
import {
  portfolioItems,
  SERVICES,
  LOCATIONS,
  GENDERS,
  type ServiceKey,
  type LocationKey,
  type Gender,
} from "@/data/portfolio";
import heroImg from "@/assets/hero.jpg";

const Index = () => {
  const [service, setService] = useState<ServiceKey | "all">("all");
  const [location, setLocation] = useState<LocationKey | "all">("all");
  const [gender, setGender] = useState<Gender | "all">("all");

  const filtered = useMemo(
    () =>
      portfolioItems.filter(
        (p) =>
          (service === "all" || p.service === service) &&
          (location === "all" || p.location === location) &&
          (gender === "all" || p.gender === gender),
      ),
    [service, location, gender],
  );

  const activeCount =
    (service !== "all" ? 1 : 0) +
    (location !== "all" ? 1 : 0) +
    (gender !== "all" ? 1 : 0);

  const clearAll = () => {
    setService("all");
    setLocation("all");
    setGender("all");
  };

  const buildOptions = <T extends string>(map: Record<T, string>) => [
    { value: "all", label: "全部" },
    ...(Object.entries(map) as [T, string][]).map(([value, label]) => ({
      value,
      label,
    })),
  ];

  const filterSections = [
    {
      label: "地點",
      options: buildOptions(LOCATIONS),
      value: location,
      onChange: (v: string) => setLocation(v as LocationKey | "all"),
    },
    {
      label: "項目",
      options: buildOptions(SERVICES),
      value: service,
      onChange: (v: string) => setService(v as ServiceKey | "all"),
    },
    {
      label: "性別",
      options: buildOptions(GENDERS),
      value: gender,
      onChange: (v: string) => setGender(v as Gender | "all"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="container flex items-center justify-between py-6">
          <a href="/" className="font-display text-2xl tracking-wide text-foreground">
            Ivy<span className="text-primary">.</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-light text-foreground/80 md:flex">
            <a href="#portfolio" className="transition-colors hover:text-foreground">作品集</a>
            <a href="#about" className="transition-colors hover:text-foreground">關於</a>
            <a href="#contact" className="transition-colors hover:text-foreground">聯絡</a>
          </div>
          <Button variant="outline" size="sm">立即預約</Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden gradient-warm">
        <div className="container relative grid gap-10 pb-24 pt-32 md:grid-cols-2 md:gap-16 md:pb-32 md:pt-40">
          <div className="flex flex-col justify-center space-y-8 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Natural · Professional · Friendly
            </p>
            <h1 className="font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
              在日常裡，
              <br />
              <em className="not-italic text-primary">遇見更好的自己</em>
            </h1>
            <p className="max-w-md text-base font-light leading-relaxed text-muted-foreground">
              Ivy&apos;s Beauty 以溫柔光感的奶茶色調，為你打造自然舒適的霧眉、美睫與美甲體驗。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg">開始預約</Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#portfolio">瀏覽作品</a>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-surface" />
            <div className="overflow-hidden rounded-[2rem] shadow-elevated">
              <img
                src={heroImg}
                alt="Ivy's Beauty 自然光感美容"
                width={1600}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-background px-6 py-4 shadow-soft md:block">
              <p className="font-display text-3xl leading-none text-primary">12k+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                Happy clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="bg-background py-24 md:py-32">
        <div className="container space-y-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Portfolio
              </p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                每一道線條，
                <br className="hidden sm:inline" />
                都是慢下來的時光。
              </h2>
              <p className="text-sm font-light text-muted-foreground">
                依地點、項目與性別瀏覽，找到屬於你的靈感。
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-light text-muted-foreground">
                {filtered.length} / {portfolioItems.length} 件
              </p>
              <PortfolioFilter
                sections={filterSections}
                activeCount={activeCount}
                onClear={clearAll}
              />
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-surface/30 px-6 py-24 text-center">
              <p className="font-display text-2xl text-foreground">
                目前沒有符合條件的作品
              </p>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                試著調整或清除部分篩選條件
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-6"
                onClick={clearAll}
              >
                清除全部篩選
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <PortfolioCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border bg-surface">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 text-sm font-light text-muted-foreground md:flex-row">
          <p className="font-display text-xl text-foreground">
            Ivy<span className="text-primary">.</span> Beauty
          </p>
          <p>© {new Date().getFullYear()} Ivy&apos;s Beauty. 以溫柔對待每一位客人。</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
