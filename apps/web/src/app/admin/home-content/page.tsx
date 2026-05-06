"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { BookingRules } from "@/components/home/BookingRules";
import { HomeContent } from "@/components/admin/home-content/types";
import { HeroForm } from "@/components/admin/home-content/HeroForm";
import { AboutForm } from "@/components/admin/home-content/AboutForm";
import { NoticeForm } from "@/components/admin/home-content/NoticeForm";
import { Loader2 } from "lucide-react";

export default function HomeContentPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);

  // Initial states for preview
  const [content, setContent] = useState<HomeContent>({
    hero: { eyebrow: "", title: "", description: "", imageUrls: [] },
    about: { eyebrow: "", title: "", description: "" },
    notice: { eyebrow: "", title: "", description: "", rules: [] }
  });
  const [locations, setLocations] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);

  // Fetch all necessary data for editing and previewing
  useEffect(() => {
    async function fetchData() {
      try {
        const [contentRes, locRes, storeRes] = await Promise.all([
          fetch('/api/admin/home-content'),
          fetch('/api/admin/locations'),
          fetch('/api/store-info')
        ]);

        const [contentResult, locResult, storeResult] = await Promise.all([
          contentRes.json(),
          locRes.json(),
          storeRes.json()
        ]);

        if (contentResult.success && contentResult.data) {
          setContent(contentResult.data);
        }

        if (locResult.success) {
          setLocations(locResult.data);
        }

        if (storeResult.success) {
          setStoreInfo(storeResult.data);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-muted-foreground animate-pulse">載入管理介面中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-2">
      <main className="flex flex-col overflow-auto">
        <div className="flex-1 flex gap-8">
          {/* Left Form Area */}
          <div className="w-[40%] flex flex-col gap-6">
            <div className="bg-surface w-fit flex rounded-2xl p-1">
              {[
                { id: "hero", label: "Hero" },
                { id: "about", label: "About" },
                { id: "notice", label: "預約需知" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${activeTab === tab.id
                    ? "bg-white text-accent-primary shadow-sm"
                    : "hover:bg-white/60"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-auto">
              {activeTab === "hero" && (
                <HeroForm
                  initialData={content.hero}
                  allContent={content}
                  onChange={data => setContent({ ...content, hero: data })}
                />
              )}

              {activeTab === "about" && (
                <AboutForm
                  initialData={content.about}
                  allContent={content}
                  onChange={data => setContent({ ...content, about: data })}
                />
              )}

              {activeTab === "notice" && (
                <NoticeForm
                  initialData={content.notice}
                  allContent={content}
                  onChange={data => setContent({ ...content, notice: data })}
                />
              )}
            </div>
          </div>

          {/* Right Preview Area */}
          <div className="flex-1 flex flex-col gap-6">
            <h5>首頁預覽</h5>

            <div className="rounded-3xl border border-border/50 overflow-auto relative min-h-[600px] bg-background">
              <div
                className="absolute top-0 left-0 shadow-2xl origin-top-left"
                style={{
                  width: "200%",
                  transform: "scale(0.5)",
                }}
              >
                {/* Actual Frontend Components with live data */}
                <div className="pointer-events-none">
                  <HeroSection data={content.hero} />
                  <AboutSection
                    data={content.about}
                    locations={locations}
                    storeInfo={storeInfo}
                  />
                  <BookingRules data={content.notice} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
