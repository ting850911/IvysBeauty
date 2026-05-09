"use client";

import { useState } from "react";
import { NoticeData, HomeContent } from "./types";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2, Bold, Italic, List, Loader2 } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useRouter } from "next/navigation";
import { AdminCard, AdminCardHeader, AdminCardContent, AdminCardFooter, AdminField, AdminInput } from "../shared/AdminCard";

// A clean, standard Tiptap editor component for each rule
function RuleEditor({
  content,
  onChange
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none p-4 min-h-[120px] focus:outline-none border border-border rounded-xl bg-background mt-2",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 bg-muted/20 p-1 rounded-lg border border-border/50 w-fit">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded ${editor.isActive("bold") ? "bg-white shadow-sm text-primary" : " hover:text-foreground"}`}
        >
          <Bold size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded ${editor.isActive("italic") ? "bg-white shadow-sm text-primary" : " hover:text-foreground"}`}
        >
          <Italic size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded ${editor.isActive("bulletList") ? "bg-white shadow-sm text-primary" : " hover:text-foreground"}`}
        >
          <List size={14} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

interface NoticeFormProps {
  initialData: NoticeData;
  allContent: HomeContent;
  onChange: (data: NoticeData) => void;
}

export function NoticeForm({ initialData, allContent, onChange }: NoticeFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/home-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...allContent,
          notice: initialData
        }),
      });

      if (res.ok) {
        alert("預約需知儲存成功！");
        router.refresh();
      } else {
        const error = await res.json();
        alert(`儲存失敗: ${error.message || "未知錯誤"}`);
      }
    } catch (error) {
      console.error(error);
      alert("儲存過程中發生系統錯誤");
    } finally {
      setIsSaving(false);
    }
  };

  const addRule = () => {
    const newRules = [...initialData.rules, { title: "新章節", content: "<p>請輸入內容...</p>" }];
    onChange({ ...initialData, rules: newRules });
  };

  const removeRule = (idx: number) => {
    const newRules = initialData.rules.filter((_, i) => i !== idx);
    onChange({ ...initialData, rules: newRules });
  };

  return (
    <AdminCard>
      <AdminCardHeader
        title="預約需知設定"
        description="設定預約流程中的注意事項與規範。"
      />

      <AdminCardContent>
        <AdminField label="小標">
          <AdminInput
            value={initialData.eyebrow}
            onChange={e => onChange({ ...initialData, eyebrow: e.target.value })}
            placeholder="例如：NOTICE"
          />
        </AdminField>

        <AdminField label="主標題">
          <AdminInput
            value={initialData.title}
            onChange={e => onChange({ ...initialData, title: e.target.value })}
            placeholder="例如：預約需知"
          />
        </AdminField>

        <div className="space-y-6 pt-4">
          {initialData.rules.map((rule, idx) => (
            <div key={idx} className="group relative space-y-4 border-t border-border pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <AdminField label={`章節 ${idx + 1} 標題`}>
                    <AdminInput
                      value={rule.title}
                      onChange={e => {
                        const newRules = [...initialData.rules];
                        newRules[idx].title = e.target.value;
                        onChange({ ...initialData, rules: newRules });
                      }}
                      placeholder="請輸入章節標題..."
                    />
                  </AdminField>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRule(idx)}
                  className="h-11 w-11 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 self-end shrink-0"
                >
                  <Trash2 size={18} />
                </Button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">內容編輯</label>
                <RuleEditor
                  content={rule.content}
                  onChange={html => {
                    const newRules = [...initialData.rules];
                    newRules[idx].content = html;
                    onChange({ ...initialData, rules: newRules });
                  }}
                />
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addRule}
            className="w-full border-dashed border-2 rounded-2xl h-16 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all text-muted-foreground gap-2"
          >
            <Plus size={18} />
            新增需知章節
          </Button>
        </div>
      </AdminCardContent>

      <AdminCardFooter>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2 rounded-full px-8 shadow-lg shadow-primary/10"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? "儲存中..." : "儲存設定"}
        </Button>
      </AdminCardFooter>
    </AdminCard>
  );
}
