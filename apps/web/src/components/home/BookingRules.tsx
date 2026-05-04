import Image from "next/image";
import bgImg2 from "@/assets/background_2.png";

export function BookingRules() {
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

      <div className="max-w-2xl mx-auto rounded-[2rem] border border-border/50 p-8 md:p-10 space-y-10 animate-fade-up relative z-10">
        <div className="text-center space-y-8">
          <p className="text-eyebrow">Notice</p>
          <h2>預約須知</h2>
          <p className="mt-3">為保障您的權益及維持高品質服務，請務必詳閱以下約定。</p>
        </div>

        <div className="space-y-8">
          <section className="space-y-3">
            <h4>預約</h4>
            <ul className="space-y-1 pl-4 list-disc list-inside">
              <li>預約時需先支付<strong className="text-primary">訂金 2,000 元</strong>，當日到店後補齊尾款。</li>
              <li>並於 <strong className="text-primary">1 日內</strong> 完成網路轉帳。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h4>退改須知</h4>
            <ul className="space-y-1 pl-4 list-disc list-inside">
              <li>預約完成後如需取消預約，<strong className="text-primary">訂金恕不退還</strong>。</li>
              <li>若需更改時間請提前 <strong className="text-primary">48 小時告知</strong>，訂金可為您保留 3 個月。</li>
              <li>為避免影響後續客人權益，當日<strong className="text-primary">遲到超過 15 分鐘視同取消</strong>，訂金恕不退還。</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
