import Image from "next/image";
import bgImg2 from "@/assets/background_2.png";

interface BookingRuleItem {
  title: string;
  content: string;
}

interface BookingRulesData {
  eyebrow?: string;
  title?: string;
  description?: string;
  rules?: BookingRuleItem[];
}

export function BookingRules({ data }: { data?: BookingRulesData }) {
  const content = {
    eyebrow: data?.eyebrow,
    title: data?.title,
    description: data?.description,
    rules: data?.rules || []
  };

  return (
    <section id="bookingInfo" className="relative overflow-hidden w-full py-16 md:py-24 px-6 md:px-12">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={bgImg2}
          alt="About Background Texture"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-2xl mx-auto rounded-[2rem] border border-border/50 p-8 md:p-10 space-y-10 animate-fade-up relative z-10 bg-background/30 backdrop-blur-sm">
        <div className="text-center space-y-4">
          <p className="text-eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p className="mt-3 text-muted-foreground">{content.description}</p>
        </div>

        <div className="grid gap-8">
          {content.rules.map((rule, idx) => (
            <section key={idx} className="space-y-3">
              <h4>{rule.title}</h4>
              <div 
                className="prose prose-sm max-w-none text-muted-foreground pl-1"
                dangerouslySetInnerHTML={{ __html: rule.content }}
              />
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
