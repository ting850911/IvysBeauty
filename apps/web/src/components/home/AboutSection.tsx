"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bgImg2 from "@/assets/background_2.png";

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
  facebook: string;
}

export function AboutSection() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/locations").then(res => res.json()),
      fetch("/api/store-info").then(res => res.json())
    ]).then(([locRes, storeRes]) => {
      if (locRes.success) setLocations(locRes.data);
      if (storeRes.success) setStoreInfo(storeRes.data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const studioImages = locations.flatMap(l => l.imageUrls).length > 0
    ? locations.flatMap(l => l.imageUrls)
    : ["https://images.unsplash.com/photo-1629367494173-c78a56567877?w=800&q=80"];

  return (
    <>
      <section id="about" className="relative overflow-hidden w-full py-16 md:py-24 px-6 md:px-12">
        <div className="container mx-auto text-center space-y-8 relative z-10">
          <p className="text-eyebrow">
            About Us
          </p>
          <h2 className="leading-[1.1] drop-shadow-sm">
            拒絕套板，量身打造
          </h2>
          <p className="leading-relaxed max-w-2xl mx-auto">
            滿滿的自信感從愛自己開始，不為誰而改變，只想對自己更好一點💗
            <br />
            我們致力於修飾臉型、提升氣質，讓您擁有最穩定的留色與極短的修復期。
          </p>
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
                    {storeInfo?.facebook && (
                      <a href={storeInfo.facebook} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">Facebook</a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative md:w-full lg:w-[60%] justify-self-end rounded-[2rem] overflow-hidden bg-surface shadow-soft group">
              <div className="flex w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {studioImages.map((src, index) => (
                  <div key={index} className="relative w-full shrink-0 snap-center md:aspect-square lg:aspect-[3/4]">
                    <Image
                      src={src}
                      alt={`Studio space ${index + 1}`}
                      fill
                    />
                  </div>
                ))}
              </div>
              {/* Indicator dots (visual cue for scrolling) */}
              <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 pointer-events-none">
                {studioImages.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
                ))}
              </div>
              {/* Helper text overlay */}
              <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md text-xs font-medium pointer-events-none">
                往右滑動
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
