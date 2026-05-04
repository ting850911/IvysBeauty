import z from "zod";

export const CreateBookingSchema = z.object({
  locationId: z.string(),
  serviceId: z.string(),
  customerId: z.string(),
  startTime: z.string().datetime({ message: "必須提供正確的 ISO 8601 起始時間" }),
  notes: z.string().max(500).optional(),
});

export type CreateBookingPayload = z.infer<typeof CreateBookingSchema>;

export const UpdateBookingStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]),
  paymentProof: z.string().url().optional(),
});

export type UpdateBookingStatusPayload = z.infer<typeof UpdateBookingStatusSchema>;

export const AvailableSlotsQuerySchema = z.object({
  locationId: z.string(),
  serviceId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
});
