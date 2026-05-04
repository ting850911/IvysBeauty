import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingContainer } from "@/components/booking/BookingContainer";

export const metadata = {
  title: "線上預約｜艾微美學 Ivy's Beauty Studio",
  description: "立即預約艾微美學服務，包含霧眉、霧唇與客製化設計。快速選擇時間，享受專屬放鬆體驗。"
};

export default async function BookingPage() {

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent-primary selection:text-white pt-24">
      <Navbar />

      <main className="container mx-auto w-full py-16 md:py-24 px-6 md:px-12">
        <BookingContainer />
      </main>

      <Footer />
    </div>
  );
}
