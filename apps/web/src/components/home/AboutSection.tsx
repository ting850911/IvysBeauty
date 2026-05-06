"use client";
import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

interface Location {
  id: string;
  name: string;
  address: string;
  imageUrls: string[];
}

interface StoreInfo {
  phone: string;
  line: string;
  instagram: string;
  threads: string;
}

interface AboutData {
  eyebrow?: string;
  title?: string;
  description?: string;
}

interface AboutSectionProps {
  data?: AboutData;
  locations?: Location[];
  storeInfo?: StoreInfo | null;
}

export function AboutSection({ data, locations = [], storeInfo }: AboutSectionProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const content = {
    eyebrow: data?.eyebrow,
    title: data?.title,
    description: data?.description
  };

  const studioImages = locations.flatMap(l => l.imageUrls).length > 0
    ? locations.flatMap(l => l.imageUrls)
    : ["https://images.unsplash.com/photo-1629367494173-c78a56567877?w=800&q=80"];

  return (
    <>
      <section id="about" className="relative overflow-hidden w-full py-16 md:py-24 px-6 md:px-12">
        <div className="container mx-auto text-center space-y-8 relative z-10">
          <p className="text-eyebrow">
            {content.eyebrow}
          </p>
          <h2 className="leading-[1.1] drop-shadow-sm">
            {content.title}
          </h2>
          <div className="leading-relaxed max-w-2xl mx-auto text-muted-foreground whitespace-pre-wrap">
            {content.description}
          </div>
          <div className="bg-background/60 backdrop-blur-md shadow-soft p-8 rounded-3xl space-y-3 max-w-2xl mx-auto border border-white/20">
            <h4>合法營業登記・全預約制</h4>
            <p>
              高隱私居家工作室，空間有限且服務皆為一對一。<br />
              為維持最高操作品質，<strong>謝絕攜伴</strong>，感謝您的配合！
            </p>
          </div>
        </div>

        <div className="container mx-auto mt-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-primary font-bold mb-4 drop-shadow-sm">
                  Location
                </p>
                <h2 className="leading-[1.1] drop-shadow-sm">
                  專屬放鬆空間
                </h2>
              </div>
              <div className="space-y-6 text-muted-foreground">
                {locations.length > 0 ? locations.map(loc => (
                  <div key={loc.id}>
                    <h6 className="mb-1">{loc.name}</h6>
                    <p>{loc.address}</p>
                  </div>
                )) : (
                  <>
                    <div>
                      <h6 className="mb-1">板橋工作室</h6>
                      <p>新埔捷運站 1 號出口・步行 3 分鐘</p>
                    </div>
                    <div>
                      <h6 className="mb-1">宜蘭工作室</h6>
                      <p>宜蘭縣壯圍鄉永美路</p>
                    </div>
                  </>
                )}
                <div>
                  <h6 className="mb-1">Social media</h6>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {storeInfo?.instagram && (
                      <a href={storeInfo.instagram.startsWith('http') ? storeInfo.instagram : `https://instagram.com/${storeInfo.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">Instagram</a>
                    )}
                    {storeInfo?.line && (
                      <a href={storeInfo.line.startsWith('http') ? storeInfo.line : `https://line.me/R/ti/p/${storeInfo.line}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">Line</a>
                    )}
                    {storeInfo?.threads && (
                      <a href={storeInfo.threads.startsWith('http') ? storeInfo.threads : `https://threads.net/${storeInfo.threads.replace('@', '')}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">Threads</a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-full lg:w-[60%] justify-self-end rounded-[2rem] overflow-hidden shadow-soft relative aspect-square lg:aspect-[3/4]">
              {studioImages.length > 1 ? (
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
                    {studioImages.map((src, index) => (
                      <CarouselItem key={index} className="pl-0 relative w-full h-full">
                        <Image
                          src={src}
                          alt={`Studio space ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselDots className="absolute bottom-6 inset-x-0 z-20" />
                </Carousel>
              ) : (
                <Image
                  src={studioImages[0]}
                  alt="Studio space"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
