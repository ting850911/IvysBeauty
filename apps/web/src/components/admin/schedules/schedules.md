# IvysBeauty 時間修改的規則與說明

### 規則
1. all 是該月的固定營業時間
  - 點擊週休日：該月的every week of day休息：比如點擊週三，則當月的週三皆為休息日
  - 設定營業時間：該月非休息日，全部都為同一營業時間
  - 設定有午休時間：該月非休息日，全部都為同一午休時間
2. 點擊月曆上某一天，會設定成override


## 時間格式

### 沒有weekly，改為all，就是存放該月的固定時間
    {
      "all": [{
      "label": "",
      "dayOfWeek": Number,
      "isOpen": Boolean,
      "hasBreak": Boolean,
      "breakEnd": "HH:MM",
      "openTime": "HH:MM",
      "closeTime": "HH:MM",
      "breakStart": "HH:MM"
      }, ...],
      "overrides": [{
        "YYYY-MM-DD": 
        {"label": "",
        "dayOfWeek": Number,
        "isOpen": Boolean,
        "hasBreak": Boolean,
        "breakEnd": "HH:MM",
        "openTime": "HH:MM",
        "closeTime": "HH:MM",
        "breakStart": "HH:MM"}
      },...]
    }


## 操作說明
  * 點擊日期可編輯該日
    - 首先選擇是否營業
    - 若有營業，則可修改營業時間
    - 可以透過checkbox控制是否有午休時間，則可修改午休時間