import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

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
  const serviceName = item.service?.name || "未知項目";
  const locationName = item.location?.name || "未知地點";
  const images = (item.imageUrls && item.imageUrls.length > 0)
    ? item.imageUrls
    : ["https://images.unsplash.com/photo-1629367494173-c78a56567877?w=800&q=80"];

  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  return (
    <figure
      className="group relative overflow-hidden rounded-[2rem] shadow-soft transition-all duration-500 hover:shadow-elevated animate-fade-up border border-border/30 delay-[var(--delay)]"
      style={{ '--delay': `${index * 60}ms` } as React.CSSProperties}
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        {images.length > 1 ? (
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full h-full"
          >
            <CarouselContent className="-ml-0 h-full">
              {images.map((src, i) => (
                <CarouselItem key={i} className="pl-0 relative w-full h-full">
                  <Image
                    src={src}
                    alt={item.description || `Portfolio Image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <Image
            src={images[0]}
            alt={item.description || "Portfolio Image"}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 pointer-events-none flex flex-col gap-1 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent p-6 pt-20 text-background opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10">
        <p className="text-xl leading-tight text-white drop-shadow-md line-clamp-2">{item.description}</p>
        <p className="text-[10px] font-light tracking-wider opacity-90 text-white/90 drop-shadow-sm flex items-center gap-1.5 uppercase">
          {serviceName} · {locationName}
        </p>
      </figcaption>
    </figure>
  );
}
