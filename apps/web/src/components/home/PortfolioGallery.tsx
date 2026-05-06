"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

interface PortfolioItem {
  id: string;
  title: string;
  imageUrls: string[];
  description: string;
  gender: string;
  locationId: string;
  serviceId: string;
}

export function PortfolioGallery() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<Record<string, string>>({});
  const [locations, setLocations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portRes, servRes, locRes] = await Promise.all([
          fetch("/api/portfolio"),
          fetch("/api/services"),
          fetch("/api/locations"),
        ]);

        const [portData, servData, locData] = await Promise.all([
          portRes.json(),
          servRes.json(),
          locRes.json(),
        ]);

        if (portData.success) setItems(portData.data);

        if (servData.success) {
          const sMap: Record<string, string> = {};
          servData.data.forEach((s: any) => { sMap[s.id] = s.name; });
          setServices(sMap);
        }

        if (locData.success) {
          const lMap: Record<string, string> = {};
          locData.data.forEach((l: any) => { lMap[l.id] = l.name; });
          setLocations(lMap);
        }
      } catch (error) {
        console.error("Fetch gallery data error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const GENDERS = {
    MALE: "男性",
    FEMALE: "女性",
    UNISEX: "中性",
  };

  const filtered = useMemo(
    () =>
      items.filter(
        (p) =>
          (serviceFilter === "all" || p.serviceId === serviceFilter) &&
          (locationFilter === "all" || p.locationId === locationFilter) &&
          (genderFilter === "all" || p.gender === genderFilter),
      ),
    [items, serviceFilter, locationFilter, genderFilter],
  );

  const activeCount =
    (serviceFilter !== "all" ? 1 : 0) +
    (locationFilter !== "all" ? 1 : 0) +
    (genderFilter !== "all" ? 1 : 0);

  const clearAll = () => {
    setServiceFilter("all");
    setLocationFilter("all");
    setGenderFilter("all");
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
      options: buildOptions(locations),
      value: locationFilter,
      onChange: (v: string) => setLocationFilter(v),
    },
    {
      label: "項目",
      options: buildOptions(services),
      value: serviceFilter,
      onChange: (v: string) => setServiceFilter(v),
    },
    {
      label: "性別",
      options: buildOptions(GENDERS),
      value: genderFilter,
      onChange: (v: string) => setGenderFilter(v),
    },
  ];

  return (
    <section id="portfolio" className="w-full py-16 md:py-24 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="space-y-12">
          <div className="md:flex-row md:items-end">
            <div className="max-w-xl space-y-4">
              <p className="text-eyebrow">
                Portfolio
              </p>
              <h2 className="leading-[1.1] drop-shadow-sm">
                每一道線條，
                <br className="hidden sm:inline" />
                都是慢下來的時光。
              </h2>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <p>
                依地點、項目與性別瀏覽，找到屬於你的風格。
              </p>
              <section className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  {filtered.length} / {items.length}
                </p>
                <PortfolioFilter
                  sections={filterSections}
                  activeCount={activeCount}
                  onClear={clearAll}
                />
              </section>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-border bg-surface/30 px-6 py-24 text-center">
              <p className="text-2xl text-muted-foreground">
                目前沒有符合條件的作品
              </p>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                試著調整或清除部分篩選條件
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-6 cursor-pointer"
                onClick={clearAll}
              >
                清除全部篩選
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-4 sm:grid-cols">
              {filtered.map((item: any, i) => (
                <PortfolioCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
