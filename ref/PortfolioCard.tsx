import type { PortfolioItem } from "@/data/portfolio";
import { SERVICES, LOCATIONS } from "@/data/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

export function PortfolioCard({ item, index }: PortfolioCardProps) {
  return (
    <figure
      className="group relative overflow-hidden rounded-3xl bg-surface shadow-soft transition-all duration-500 hover:shadow-elevated animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.description}
          loading="lazy"
          width={1024}
          height={1280}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent p-5 pt-16 text-background opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="font-display text-xl leading-tight">{item.description}</p>
        <p className="text-xs font-light tracking-wider opacity-80">
          {SERVICES[item.service]} · {LOCATIONS[item.location]}
        </p>
      </figcaption>
    </figure>
  );
}
