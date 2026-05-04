'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { format, isBefore } from 'date-fns';
import { Check, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toDate, formatInTimeZone } from 'date-fns-tz';
import { useAuth } from '@/contexts/AuthContext';
import { BookingData, Service, Location } from '@ivysbeauty/shared';

const INITIAL_DATA: BookingData = {
  location: null,
  service: null,
  price: 0,
  date: null,
  time: null,
  customerName: '',
  customerPhone: '',
  remarks: '',
};

export function BookingProcess() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>(INITIAL_DATA);
  const [availableSlots, setAvailableSlots] = useState<{ startTime: string; endTime: string; available: boolean }[]>(
    []
  );
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [storeInfo, setStoreInfo] = useState<any>(null);
  const [monthAvailability, setMonthAvailability] = useState<Record<string, { available: boolean }>>({});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    Promise.all([
      fetch('/api/locations').then(res => res.json()),
      fetch('/api/services').then(res => res.json()),
      fetch('/api/store-info').then(res => res.json())
    ]).then(([locRes, srvRes, storeRes]) => {
      if (locRes.success) setLocations(locRes.data);
      if (srvRes.success) setServices(srvRes.data);
      if (storeRes.success) setStoreInfo(storeRes.data);
      setIsLoadingOptions(false);
    }).catch(err => {
      console.error(err);
      setIsLoadingOptions(false);
    });
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        locationId: data.location,
        serviceId: data.service,
        customerId: user?.id || 'temp-customer-id',
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        startTime: toDate(`${data.date}T${data.time}:00`, { timeZone: 'Asia/Taipei' }).toISOString(),
        notes: data.remarks || '無備註',
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error?.message || '未知的錯誤');

      setIsSuccess(true);
      sessionStorage.removeItem('booking_draft');
      sessionStorage.removeItem('booking_step');
    } catch (err: any) {
      alert('預約失敗，請稍後再試：\n' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 檢查是否有暫存的表單紀錄 (記住選擇的選項)
    const saved = sessionStorage.getItem('booking_draft');
    const savedStep = sessionStorage.getItem('booking_step');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) setData((prev) => ({ ...prev, ...parsed }));
      } catch (e) { }
    }
    if (savedStep) {
      setStep(Number(savedStep));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 當前資料改變時自動儲存，且必須確認元件已經掛載避免覆蓋
    if (isMounted) {
      sessionStorage.setItem('booking_draft', JSON.stringify(data));
      sessionStorage.setItem('booking_step', step.toString());
    }
  }, [data, step, isMounted]);

  useEffect(() => {
    if (user?.phone && !data.customerPhone) {
      setData((prev) => ({ ...prev, customerPhone: user.phone! }));
    }
  }, [user?.phone, data.customerPhone]);

  useEffect(() => {
    if (step === 3 && data.location && data.service && data.date) {
      setIsFetchingSlots(true);
      fetch(`/api/slots?locationId=${data.location}&serviceId=${data.service}&date=${data.date}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success) {
            setAvailableSlots(resData.data.slots);
          }
        })
        .finally(() => setIsFetchingSlots(false));
    }
  }, [step, data.location, data.service, data.date]);

  useEffect(() => {
    if (step === 3 && data.location && data.service) {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;
      const monthStr = `${year}-${month.toString().padStart(2, '0')}`;

      fetch(`/api/slots?locationId=${data.location}&serviceId=${data.service}&month=${monthStr}`)
        .then(res => res.json())
        .then(resData => {
          if (resData.success) {
            setMonthAvailability(resData.data);
          }
        });
    }
  }, [step, data.location, data.service, currentMonth]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleLocation = (loc: Location['id']) => {
    setData((prev) => ({ ...prev, location: loc }));
    nextStep();
  };

  const handleService = (srv: Service['id']) => {
    const selectedService = services.find(s => s.id === srv);
    const numericPrice = selectedService?.price || 0;

    setData((prev) => ({ ...prev, service: srv, price: numericPrice }));
    nextStep();
  };

  const handleDateTime = (date: string, time: string) => {
    setData((prev) => ({ ...prev, date, time }));
    nextStep();
  };

  if (isSuccess) {
    return (
      <div className='w-full max-w-2xl mx-auto bg-surface rounded-[2rem] shadow-soft p-8 md:p-12 border border-border/50 text-center space-y-10 animate-fade-in'>
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-bounce-slow">
          <Check size={40} />
        </div>
        <div className="space-y-3">
          <h3 className="text-3xl">預約成功！</h3>
          <p className="text-muted-foreground text-lg">您的預約已送出，我們期待您的蒞臨。</p>
        </div>

        <div className="bg-background/50 rounded-3xl p-6 md:p-8 border border-border/50 text-left space-y-4 shadow-inner">
          <div className="flex justify-between items-center border-b border-border/40 pb-4">
            <span className="text-muted-foreground font-medium">服務項目</span>
            <span className="font-bold text-foreground">{data.service && services.find(s => s.id === data.service)?.name}</span>
          </div>
          <div className="flex justify-between items-center border-b border-border/40 pb-4">
            <span className="text-muted-foreground font-medium">預約時間</span>
            <span className="font-bold text-primary">{data.date} {data.time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-medium">服務地點</span>
            <span className="font-bold text-foreground">{data.location && locations.find(l => l.id === data.location)?.name}</span>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 justify-center text-primary font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h5>匯款資訊</h5>
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <div className='bg-background rounded-3xl p-8 border border-primary/20 space-y-3 shadow-md text-left relative overflow-hidden'>
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <p className="flex justify-between"><span className="text-muted-foreground">銀行代碼</span> <span className="font-mono font-bold">{storeInfo?.bankCode || "013"} {storeInfo?.bankName || "國泰世華"}</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">匯款帳號</span> <span className="font-mono font-bold tracking-wider">{storeInfo?.bankAccount || "1234-5678-9012-345"}</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">帳戶名稱</span> <span className="font-bold">{storeInfo?.bankAccountName || "IvysBeauty Studio"}</span></p>
            <div className="mt-6 pt-6 border-t border-border/40 flex justify-between items-center">
              <span className="font-bold">訂金金額</span>
              <span className="text-2xl font-bold text-primary">NT$ {(data.price * 0.3).toLocaleString()}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-2xl">
            請於 <span className="text-primary font-bold">24 小時內</span> 完成匯款並至會員中心上傳證明，以保留預約名約。逾期系統將自動釋放時段。
          </p>
        </div>

        <Button size="lg" className="w-full rounded-full h-14 text-lg shadow-elevated hover:scale-[1.02] transition-transform" onClick={() => router.push('/history')}>
          前往會員中心 (查看預約紀錄)
        </Button>
      </div>
    );
  }

  return (
    <div className='w-full max-w-2xl mx-auto bg-surface rounded-[2rem] shadow-soft p-6 md:p-10 border border-border/50'>
      <div className='mb-10 flex flex-col md:flex-row items-start md:items-center justify-between relative px-2'>
        <div className='absolute top-5 left-8 right-8 h-[2px] bg-border -z-10 hidden md:block' />
        <div className='absolute left-5 top-8 bottom-8 w-[2px] bg-border -z-10 md:hidden' />
        {['地點', '服務', '時間', '確認'].map((label, i) => {
          const stepNum = i + 1;
          const isActive = step >= stepNum;
          const isCurrent = step === stepNum;

          let selectedText = '';
          if (stepNum === 1 && data.location && step > 1) selectedText = locations.find(l => l.id === data.location)?.name || '';
          if (stepNum === 2 && data.service && step > 2) selectedText = services.find(s => s.id === data.service)?.name || '';
          if (stepNum === 3 && data.date && data.time && step > 3)
            selectedText = `${data.date.substring(5)} ${data.time}`;

          return (
            <button
              key={label}
              disabled={stepNum > step && stepNum !== 4}
              onClick={() => {
                if (stepNum < step) setStep(stepNum);
              }}
              className={`flex md:flex-col items-center gap-4 md:gap-2 mb-4 md:mb-0 w-full md:w-1/4 group ${stepNum < step ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div
                className={`w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isCurrent
                  ? 'bg-primary text-primary-foreground shadow-md ring-4 ring-primary/10'
                  : isActive
                    ? 'bg-primary/20 text-primary border border-primary/50'
                    : 'bg-background border border-border text-muted-foreground'
                  }`}
              >
                {stepNum}
              </div>
              <div className='flex flex-col items-start md:items-center'>
                <span
                  className={`text-sm md:text-xs tracking-wider transition-colors ${isCurrent ? 'text-foreground font-bold' : isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                >
                  {label}
                </span>
                <span
                  className={`text-xs mt-1 transition-all ${selectedText ? 'text-primary font-medium opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
                >
                  {selectedText}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className='min-h-[400px]'>
        {step === 1 && (
          <div className='space-y-6 animate-fade-in'>
            <div className='text-center space-y-2 mb-8'>
              <h4>選擇工作室</h4>
              <p>請問您希望在哪個地點進行服務呢？</p>
            </div>
            <div className='grid gap-4'>
              {isLoadingOptions ? (
                <div className="flex justify-center items-center py-8">
                  <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                </div>
              ) : locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleLocation(loc.id)}
                  className={`text-left p-6 rounded-2xl border transition-all cursor-pointer ${data.location === loc.id
                    ? 'border-primary bg-background ring-1 ring-primary shadow-sm'
                    : 'border-border/60 bg-background/50 hover:border-primary/50'
                    }`}
                >
                  <h6>{loc.name}</h6>
                  <p>{loc.address}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='space-y-6 animate-fade-in'>
            <div className='text-center space-y-2 mb-8'>
              <h4>選擇服務</h4>
              <p>請問您想預約什麼項目呢？</p>
            </div>
            <div className='grid gap-4'>
              {isLoadingOptions ? (
                <div className="flex justify-center items-center py-8">
                  <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                </div>
              ) : services.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => handleService(srv.id)}
                  className={`text-left p-6 rounded-2xl border flex flex-col md:flex-row gap-4 justify-between md:items-center transition-all cursor-pointer ${data.service === srv.id
                    ? 'border-primary bg-background ring-1 ring-primary shadow-sm'
                    : 'border-border/60 bg-background/50 hover:border-primary/50'
                    }`}
                >
                  <div>
                    <h6>{srv.name}</h6>
                    <p>操作時間約 {srv.duration} 分鐘</p>
                  </div>
                  <div className='text-primary font-bold'>NT$ {srv.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
            <div className='flex justify-start pt-4'>
              <Button variant='ghost' onClick={prevStep} className='text-muted-foreground'>
                ← 返回地點
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className='space-y-8 animate-fade-in'>
            <div className='text-center space-y-2 mb-6'>
              <h4>選擇時段</h4>
              <p>請選擇您方便的預約時間</p>
            </div>

            <div className='space-y-6'>
              <div>
                <label className='text-sm font-bold text-foreground mb-4 block'>1. 選擇日期</label>
                <Calendar
                  mode='single'
                  selected={data.date ? new Date(`${data.date}T00:00:00`) : undefined}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  onSelect={(date) => {
                    if (date) {
                      const formattedDate = formatInTimeZone(date, 'Asia/Taipei', 'yyyy-MM-dd');
                      setData((prev) => ({ ...prev, date: formattedDate, time: null }));
                    }
                  }}
                  disabled={(date) => {
                    const todayInTaipei = toDate(formatInTimeZone(new Date(), 'Asia/Taipei', 'yyyy-MM-dd'), { timeZone: 'Asia/Taipei' });

                    const dateStr = formatInTimeZone(date, 'Asia/Taipei', 'yyyy-MM-dd');
                    const isHolidayOrFull = monthAvailability[dateStr]?.available === false;

                    const startOfDate = toDate(dateStr, { timeZone: 'Asia/Taipei' });
                    return isBefore(startOfDate, todayInTaipei) || isHolidayOrFull;
                  }}
                />
              </div>

              {data.date && (
                <div className='animate-fade-in'>
                  <label className='text-sm font-bold text-foreground mb-3 block'>2. 選擇時間</label>
                  {isFetchingSlots ? (
                    <div className='flex justify-center items-center py-8'>
                      <span className='w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin'></span>
                    </div>
                  ) : (
                    <div className='flex flex-wrap gap-3'>
                      {availableSlots.map((slot) => {
                        const timeString = formatInTimeZone(new Date(slot.startTime), 'Asia/Taipei', 'HH:mm');
                        return (
                          <button
                            key={slot.startTime}
                            disabled={!slot.available}
                            onClick={() => handleDateTime(data.date!, timeString)}
                            className={`px-6 py-2 text-sm rounded-full transition-all ${!slot.available
                              ? 'bg-muted border-border/50 text-muted-foreground opacity-40 cursor-not-allowed'
                              : data.time === timeString
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background text-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground'
                              }`}
                          >
                            {timeString}
                          </button>
                        );
                      })}
                      {availableSlots.length === 0 && (
                        <div className='w-full text-center py-6 text-sm text-muted-foreground bg-muted/50 rounded-xl'>
                          非常抱歉，此日期已預約額滿，請選擇其他日期 🙇‍♀️
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className='flex justify-between pt-4'>
              <Button variant='ghost' onClick={prevStep} className='text-muted-foreground'>
                ← 返回服務
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className='space-y-6 animate-fade-in'>
            <div className='text-center space-y-2 mb-8'>
              <h4>最後一步</h4>
              <p>請確認預約資訊</p>
            </div>

            <div className='bg-background/50 rounded-2xl p-6 border border-border/50 mb-6 space-y-2 text-sm'>
              <p>
                <span className='text-muted-foreground mr-2'>地點：</span>
                {data.location && locations.find(l => l.id === data.location)?.name}
              </p>
              <p>
                <span className='text-muted-foreground mr-2'>服務：</span>
                {data.service && services.find(s => s.id === data.service)?.name}
              </p>
              <p>
                <span className='text-muted-foreground mr-2'>時間：</span>
                {data.date} {data.time}
              </p>
            </div>

            <div className='space-y-8'>
              <div>
                <label className='text-xs font-medium text-muted-foreground mb-1 block'>手機</label>
                <input
                  type='tel'
                  value={data.customerPhone}
                  onChange={(e) => setData((prev) => ({ ...prev, customerPhone: e.target.value }))}
                  className='w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                  placeholder='0912345678'
                />
              </div>

              <div className='text-sm'>
                <label className='text-xs font-medium text-muted-foreground mb-1 block'>備註</label>
                <textarea
                  value={data.remarks}
                  onChange={(e) => setData((prev) => ({ ...prev, remarks: e.target.value }))}
                  className='w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                  placeholder='備註'
                />
              </div>

              <div>
                <h5>匯款保留通知</h5>
                <p className='text-sm'>
                  請於
                  <strong className='text-primary'>
                    24 小時內，匯款 {data.price > 0 ? data.price * 0.3 : 2000} 訂金
                  </strong>
                  至下方帳戶，並上傳匯款證明，謝謝。
                </p>
                <div className='mt-4 bg-background rounded-xl p-4 border border-border/50 space-y-1.5 shadow-sm'>
                  <p>銀行代碼：{storeInfo?.bankCode || "013"} {storeInfo?.bankName || "國泰世華"}</p>
                  <p>匯款帳號：{storeInfo?.bankAccount || "1234-5678-9012-345"}</p>
                  <p>帳戶名稱：{storeInfo?.bankAccountName || "IvysBeauty Studio"}</p>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center pt-6 mt-4 border-t border-border/50'>
              <Button variant='ghost' onClick={prevStep} className='text-muted-foreground'>
                ← 返回修改時間
              </Button>
              <Button size='lg' disabled={!data.customerPhone || isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? '送出中...' : '送出預約'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
