import z from 'zod';

const phoneSchema = z.string().regex(/^09\d{8}$/, { message: '請填寫有效的手機號碼 (09xxxxxxxx)' });
const birthdaySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: '生日格式有誤' });


export const AuthPayloadSchema = z
  .object({
    email: z.string().email({ message: '請填寫有效的電子信箱' }),
    password: z.string().min(1, { message: '請輸入密碼' }).trim(),
    name: z.string().min(1, { message: '請輸入您的稱呼' }).optional(),
    phone: phoneSchema.optional(),
    birthday: birthdaySchema.optional(),
    isRegistered: z.boolean(),
  })
  .superRefine((data, ctx) => {
    // name is required only when registering (isRegistered = false)
    if (!data.isRegistered && !data.name) {
      ctx.addIssue({
        code: 'custom',
        path: ['name'],
        message: '請輸入您的稱呼',
      });
    }

    // Strict password requirements only for registration
    if (!data.isRegistered) {
      if (data.password.length < 8) {
        ctx.addIssue({
          code: 'custom',
          path: ['password'],
          message: '密碼至少需要 8 碼',
        });
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/.test(data.password)) {
        ctx.addIssue({
          code: 'custom',
          path: ['password'],
          message: '密碼需包含大小寫英文、數字與至少一個特殊符號',
        });
      }
    }
  });

export const UpdateProfileSchema = z.object({
  email: z.string().email(),
  phone: phoneSchema,
  birthday: birthdaySchema,
});

export type AuthPayload = z.infer<typeof AuthPayloadSchema>;
export type UpdateProfilePayload = z.infer<typeof UpdateProfileSchema>;

export const maskPhone = (phone?: string | null): string | undefined => {
  if (!phone) return phone || undefined;
  if (phone.length >= 10) {
    return phone.substring(0, 4) + "***" + phone.substring(7);
  }
  return "****";
};
