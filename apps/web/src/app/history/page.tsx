import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingHistory } from "@/components/booking/BookingHistory";

export const metadata = {
  title: "預約紀錄｜艾微美學 Ivy's Beauty Studio",
  description: "查看您的預約紀錄與待付款項目。"
};

export default async function HistoryPage() {

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent-primary selection:text-white">
      <Navbar />

      <main className="container mx-auto w-full py-16 md:py-24 px-6 md:px-12">
        <BookingHistory />
      </main>

      <Footer />
    </div>
  );
}
