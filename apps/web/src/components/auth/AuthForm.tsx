"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthFormInner() {
  const { isInitializing } = useAuth();
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get("error");

  const handleLineLogin = () => {
    window.location.href = "/api/auth/line/login";
  };

  const handleCognitoLogin = () => {
    window.location.href = "/api/auth/cognito/login";
  };

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-surface rounded-[2rem] shadow-soft p-6 md:p-10 animate-fade-in relative">
      <div className="text-center space-y-2 mb-8">
        <p className="text-eyebrow">Welcome Back</p>
        <h5>會員登入</h5>
        <p>請登入會員以接續預約流程</p>
      </div>

      <div className="space-y-4">
        {errorMsg && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl font-medium text-center border border-red-100">
            {errorMsg}
          </div>
        )}

        <Button
          type="button"
          onClick={handleLineLogin}
          className="w-full bg-[#06C755] hover:bg-[#05B34C] text-white rounded-xl py-6 text-base"
        >
          LINE 登入
        </Button>
        <Button
          type="button"
          onClick={handleCognitoLogin}
          variant="outline"
          className="w-full rounded-xl py-6 text-base"
        >
          一般登入
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          加入會員即代表您同意我們的<a href="https://ivysbeauty.com.tw/privacy-policy" target="_blank" rel="noopener noreferrer">隱私權政策</a>。<br />
          系統會索取您的電子信箱以供「帳號合併」及「發送預約通知」之用。
        </p>
      </div>
    </div>
  );
}

export function AuthForm() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <AuthFormInner />
    </Suspense>
  );
}
