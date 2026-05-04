import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = {
  title: "會員登入｜艾微美學 Ivy's Beauty Studio",
  description: "登入您的會員帳號，管理預約紀錄與專屬服務。",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent-primary selection:text-white pt-24">
      <Navbar />

      <main className="flex-1 flex items-center justify-center container mx-auto py-12 md:py-16">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
