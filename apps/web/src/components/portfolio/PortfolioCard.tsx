import Image from "next/image";

interface PortfolioCardProps {
  item: {
    id: string;
    imageUrls: string[];
    description: string | null;
    service?: { name: string };
    location?: { name: string };
  };
  index: number;
}

export function PortfolioCard({ item, index }: PortfolioCardProps) {
  const displayImage = item.imageUrls[0] || "https://images.unsplash.com/photo-1629367494173-c78a56567877?w=800&q=80";
  const serviceName = item.service?.name || "未知項目";
  const locationName = item.location?.name || "未知地點";

  return (
    <figure
      className="group relative overflow-hidden rounded-[2rem] bg-surface shadow-soft transition-all duration-500 hover:shadow-elevated animate-fade-up border border-border/30 delay-[var(--delay)]"
      style={{ '--delay': `${index * 60}ms` } as any}
    >
      <div className="aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={displayImage}
          alt={item.description || "Portfolio Image"}
          width={400}
          height={500}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent p-6 pt-20 text-background opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="text-2xl leading-tight text-white drop-shadow-md">{item.description}</p>
        <p className="text-xs font-light tracking-wider opacity-90 text-white/90 drop-shadow-sm flex items-center gap-1.5">
          {serviceName} · {locationName}
        </p>
      </figcaption>
    </figure>
  );
}
