import { addMinutes, parse, isBefore } from 'date-fns';

/**
 * 產生從每天 businessStart 到 businessEnd 的可用時間段 (Slot)
 * 預設每 30 分鐘一個區間，直到無法塞下 durationMinutes 為止
 */
export function generateTimeSlots(dateString: string, durationMinutes: number, businessStartHour = 10, businessEndHour = 20) {
  // 解析 YYYY-MM-DD 作為該日期的 local time starting point
  const baseDate = parse(dateString, 'yyyy-MM-dd', new Date());
  
  const start = new Date(baseDate);
  start.setHours(businessStartHour, 0, 0, 0);
  
  const end = new Date(baseDate);
  end.setHours(businessEndHour, 0, 0, 0);
  
  const slots = [];
  let current = start;
  
  while (isBefore(addMinutes(current, durationMinutes), end) || addMinutes(current, durationMinutes).getTime() === end.getTime()) {
    slots.push({
      startTime: current,
      endTime: addMinutes(current, durationMinutes),
    });
    current = addMinutes(current, 30); // 30 mins stepping
  }
  return slots;
}

/**
 * 核心重疊演算法 (booking-overlap-checker)
 * 只要 A 的開始時間小於 B 的結束時間，且 B 的開始時間小於 A 的結束時間，兩者一定重疊
 */
export function isOverlapping(
  a: { startTime: Date; endTime: Date },
  b: { startTime: Date; endTime: Date }
) {
  return a.startTime < b.endTime && b.startTime < a.endTime;
}
