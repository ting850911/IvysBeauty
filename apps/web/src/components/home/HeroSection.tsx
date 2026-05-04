import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import bgImg from "@/assets/background_1.png";

export function HeroSection() {
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
            Natural · Professional · Joyful
          </p>
          <h1 className="leading-[1.05] drop-shadow-sm">
            在日常裡，
            <br />
            <p className="text-primary">看見更好的自己</p>
          </h1>
          <p className="max-w-md leading-relaxed">
            Ivy&apos;s Beauty 透過拋棄式針具與檢驗合格色乳，專注技術與美感，找到最適合的微妝感。
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/booking">
              <Button size="lg">開始預約</Button>
            </Link>
            <Link href="#portfolio">
              <Button size="lg" variant="outline">瀏覽作品</Button>
            </Link>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-surface" />
          <div className="overflow-hidden rounded-[2rem] shadow-elevated">
            <Image
              src={heroImg}
              alt="Ivy's Beauty 自然美容"
              width={1600}
              height={1280}
              className="h-full w-full object-cover"
              priority
            />
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
