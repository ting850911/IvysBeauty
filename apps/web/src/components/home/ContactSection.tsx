import Image from "next/image";

const studioImages = [
  "https://images.unsplash.com/photo-1629367494173-c78a56567877?w=800&q=80",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80",
  "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80",
];

export function ContactSection() {
  return (
    <section id="location" className="bg-background py-24 md:py-32 px-6 md:px-12 w-full">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:items-center">
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary font-bold mb-4 drop-shadow-sm">
                Location
              </p>
              <h2 className="text-4xl leading-[1.1] md:text-5xl text-foreground drop-shadow-sm">
                專屬放鬆空間
              </h2>
            </div>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-bold text-foreground mb-1">板橋工作室</h3>
                <p>新埔捷運站 1 號出口・步行 3 分鐘</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">宜蘭工作室</h3>
                <p>宜蘭縣壯圍鄉永美路</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Social media</h3>
                <div className="flex gap-4 mt-2">
                  <a href="https://www.instagram.com/honppe/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">Instagram (honppe)</a>
                  <a href="https://line.me/R/ti/p/@016qduiu?oat_content=url&ts=12010118" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">Line (@016qduiu)</a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative md:w-full lg:w-[60%] justify-self-end rounded-[2rem] overflow-hidden bg-surface shadow-soft group">
            {/* Elegant CSS Snap Carousel */}
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
            <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md text-xs font-medium text-foreground pointer-events-none">
              往右滑動
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
