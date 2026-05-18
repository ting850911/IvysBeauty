import { CompleteProfileForm } from "@/components/auth/CompleteProfileForm";
import { Suspense } from "react";

export default function CompleteProfilePage() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <Suspense fallback={<div className="flex justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <CompleteProfileForm />
      </Suspense>
    </div>
  );
}
