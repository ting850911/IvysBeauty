"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import heroImg from "@/assets/hero.jpg";
import bgImg from "@/assets/background_1.png";

interface HeroData {
  eyebrow?: string;
  title?: string | React.ReactNode;
  description?: string;
  buttonText?: string;
  imageUrls?: string[];
}

export function HeroSection({ data }: { data?: HeroData }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const content = {
    eyebrow: data?.eyebrow,
    title: data?.title,
    description: data?.description,
    buttonText: data?.buttonText || "開始預約"
  };

  const images = data?.imageUrls && data.imageUrls.length > 0 ? data.imageUrls : [heroImg.src];

  return (
    <section className="relative overflow-hidden bg-background w-full py-16 md:py-24 px-6 md:px-12">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={bgImg}
          alt="Background Texture"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="container mx-auto relative z-10 grid gap-10 md:grid-cols-2 md:gap-16 py-24 md:py-32">
        <div className="flex flex-col justify-center space-y-8 animate-fade-up">
          <p className="text-eyebrow">
            {content.eyebrow}
          </p>
          <h1 className="leading-[1.05] drop-shadow-sm whitespace-pre-wrap">
            {content.title}
          </h1>
          <p className="max-w-md leading-relaxed">
            {content.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/booking">
              <Button size="lg">{content.buttonText}</Button>
            </Link>
            <Link href="#portfolio">
              <Button size="lg" variant="outline">瀏覽作品</Button>
            </Link>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-surface" />
          <div className="overflow-hidden rounded-[2rem] shadow-elevated relative h-[500px]">
            {images.length > 1 ? (
              <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-0 h-full">
                  {images.map((src, index) => (
                    <CarouselItem key={index} className="pl-0 relative w-full h-[500px]">
                      <Image
                        src={src}
                        alt={`Banner ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselDots className="absolute bottom-6 inset-x-0 z-20" />
              </Carousel>
            ) : (
              <Image
                src={images[0]}
                alt="Banner"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-background px-6 py-4 shadow-soft md:block">
            <p className="text-3xl leading-none text-primary">12k+</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              Happy clients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
