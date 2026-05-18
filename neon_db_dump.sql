--
-- PostgreSQL database dump
--

\restrict sbQIgG1vDJlgVGhsx0bWEGuwqWetMws74OIed53ixq6C5cEy3Vngym2WdlHtgJY

-- Dumped from database version 16.12 (7bcf9ab)
-- Dumped by pg_dump version 18.0 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'PENDING',
    'CONFIRMED',
    'CANCELLED',
    'DONE',
    'MISSED'
);


ALTER TYPE public."BookingStatus" OWNER TO neondb_owner;

--
-- Name: Gender; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE',
    'UNISEX'
);


ALTER TYPE public."Gender" OWNER TO neondb_owner;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."Role" AS ENUM (
    'OWNER',
    'MEMBER'
);


ALTER TYPE public."Role" OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Booking; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Booking" (
    id text NOT NULL,
    status public."BookingStatus" DEFAULT 'PENDING'::public."BookingStatus" NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL,
    "expiredAt" timestamp(3) without time zone NOT NULL,
    "locationId" text NOT NULL,
    "serviceId" text NOT NULL,
    "customerId" text NOT NULL,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Booking" OWNER TO neondb_owner;

--
-- Name: HomeContent; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."HomeContent" (
    id text DEFAULT 'singleton'::text NOT NULL,
    hero jsonb NOT NULL,
    about jsonb NOT NULL,
    notice jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."HomeContent" OWNER TO neondb_owner;

--
-- Name: Location; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Location" (
    id text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    "imageUrls" text[] DEFAULT ARRAY[]::text[],
    "isPublished" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Location" OWNER TO neondb_owner;

--
-- Name: MonthlySchedule; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."MonthlySchedule" (
    id text NOT NULL,
    "locationId" text NOT NULL,
    month text NOT NULL,
    "all" jsonb NOT NULL,
    overrides jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MonthlySchedule" OWNER TO neondb_owner;

--
-- Name: Portfolio; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Portfolio" (
    id text NOT NULL,
    title text DEFAULT '未命名作品'::text NOT NULL,
    "imageUrls" text[] DEFAULT ARRAY[]::text[],
    description text,
    tags text[] DEFAULT ARRAY[]::text[],
    gender public."Gender" DEFAULT 'FEMALE'::public."Gender" NOT NULL,
    "locationId" text,
    "serviceId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Portfolio" OWNER TO neondb_owner;

--
-- Name: Service; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Service" (
    id text NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    duration integer NOT NULL,
    "isPublished" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Service" OWNER TO neondb_owner;

--
-- Name: StoreInfo; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."StoreInfo" (
    id text NOT NULL,
    phone text,
    line text,
    instagram text,
    "bankCode" text,
    "bankName" text,
    "bankAccount" text,
    "bankAccountName" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    threads text
);


ALTER TABLE public."StoreInfo" OWNER TO neondb_owner;

--
-- Name: User; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "passwordHash" text,
    phone text,
    birthday text,
    role public."Role" DEFAULT 'MEMBER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "cumulativeSpending" integer DEFAULT 0 NOT NULL,
    "lastVisit" timestamp(3) without time zone,
    level text DEFAULT '一般會員'::text NOT NULL,
    "memberNotes" text,
    points integer DEFAULT 0 NOT NULL,
    "prepaidBalance" integer DEFAULT 0 NOT NULL,
    status text DEFAULT '啟用中'::text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."User" OWNER TO neondb_owner;

--
-- Name: _LocationToService; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."_LocationToService" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_LocationToService" OWNER TO neondb_owner;

--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Booking" (id, status, "startTime", "endTime", "expiredAt", "locationId", "serviceId", "customerId", notes, "createdAt", "updatedAt") FROM stdin;
cmow40jm5000113mi0pcj9qck	CANCELLED	2026-05-13 05:00:00	2026-05-13 08:30:00	2026-05-08 23:20:47.693	cmotmfoxw0000ubyrwh0cm1nf	cmotmfpmx0002ubyrnps3oo56	cmow3t2er0000f0lyaopnoii9		2026-05-07 23:20:47.694	2026-05-09 05:07:22.614
cmoxvuxrx0001fcv5nt128evj	PENDING	2026-05-11 03:30:00	2026-05-11 07:00:00	2026-05-10 05:08:01.532	cmotmfpfh0001ubyrxmn56tbi	cmotmfpmx0002ubyrnps3oo56	cmow3t2er0000f0lyaopnoii9		2026-05-09 05:08:01.533	2026-05-09 05:08:01.533
cmoxvu14d0001dsatenkf65km	DONE	2026-05-13 03:00:00	2026-05-13 06:30:00	2026-05-10 05:07:19.213	cmotmfoxw0000ubyrwh0cm1nf	cmotmfpmx0002ubyrnps3oo56	cmow3t2er0000f0lyaopnoii9		2026-05-09 05:07:19.214	2026-05-09 06:02:49.303
\.


--
-- Data for Name: HomeContent; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."HomeContent" (id, hero, about, notice, "createdAt", "updatedAt") FROM stdin;
singleton	{"title": "在日常裡\\n看見更好的自己", "eyebrow": "Natural · Professional · Joyful", "imageUrls": ["https://res.cloudinary.com/dvkajiqyy/image/upload/v1778302487/ivys-beauty/onds4xmkkvtwnnjoqgyz.jpg"], "buttonText": "開始預約", "description": "艾微美學透過拋棄式針具與檢驗合格色乳，專注技術與美感，找到最適合的微妝感。"}	{"title": "拒絕套板，量身打造", "eyebrow": "About Us", "description": "滿滿的自信感從愛自己開始，不為誰而改變，只想對自己更好一點<3\\n我們致力於修飾臉型、提升氣質，讓您擁有最穩定的留色與極短的修復期。"}	{"rules": [{"title": "預約", "content": "<ul><li>預約時需先支付訂金 <strong>2,000 元</strong>，當日到店後補齊尾款。</li><li>並於 1 日內完成網路轉帳。</li></ul>"}, {"title": "退改須知", "content": "<ul><li>預約完成後如需取消預約，訂金恕不退還。</li><li>若需更改時間請提前 <strong>48 小時</strong>告知，訂金可為您保留 3 個月。</li><li>為避免影響後續客人權益，當日遲到超過 15 分鐘視同取消，訂金恕不退還。</li></ul>"}], "title": "預約須知", "eyebrow": "Notice", "description": "為保障您的權益及維持高品質服務，請務必詳閱以下約定。"}	2026-05-06 05:33:23.145	2026-05-09 05:06:00.448
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Location" (id, name, address, "imageUrls", "isPublished", "createdAt", "updatedAt") FROM stdin;
cmotmfoxw0000ubyrwh0cm1nf	板橋工作室	新埔捷運站 1 號出口・步行 3 分鐘	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777843322/ivys-beauty/hzssj5c8wyfbz9vgtca6.png,https://res.cloudinary.com/dvkajiqyy/image/upload/v1777843278/ivys-beauty/cmfvomh59wxgn3plop50.png}	t	2026-05-06 05:33:08.996	2026-05-06 05:33:08.996
cmotmfpfh0001ubyrxmn56tbi	宜蘭工作室	宜蘭縣壯圍鄉永美路	{}	t	2026-05-06 05:33:09.63	2026-05-06 05:33:09.63
\.


--
-- Data for Name: MonthlySchedule; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."MonthlySchedule" (id, "locationId", month, "all", overrides, "createdAt", "updatedAt") FROM stdin;
cmow3vqpb0001bmpqejzcu8kz	cmotmfpfh0001ubyrxmn56tbi	2026-05	[{"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 1, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 2, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 3, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 4, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 5, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 6, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 0, "breakStart": "12:00"}]	{}	2026-05-07 23:17:03.6	2026-05-07 23:17:03.6
cmow3vwz00003bmpqcr9ln152	cmotmfoxw0000ubyrwh0cm1nf	2026-05	[{"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 1, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 2, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 3, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 4, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 5, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 6, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": false, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 0, "breakStart": "12:00"}]	{}	2026-05-07 23:17:11.504	2026-05-07 23:17:11.504
\.


--
-- Data for Name: Portfolio; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Portfolio" (id, title, "imageUrls", description, tags, gender, "locationId", "serviceId", "createdAt", "updatedAt") FROM stdin;
cmotmfyo8000aubyrqy8e7p3s	未命名作品	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856267/ivys-beauty/ognykcebrk6ojwliiqgg.jpg}	男生霧眉｜自然型	{}	MALE	cmotmfoxw0000ubyrwh0cm1nf	cmotmfpmx0002ubyrnps3oo56	2026-05-06 05:33:21.608	2026-05-06 05:33:21.608
cmotmfz5a000cubyrszxoio9k	未命名作品	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856256/ivys-beauty/bio33z603vso6afz7eg5.jpg}	漸層柔霧眉｜深棕	{}	FEMALE	cmotmfpfh0001ubyrxmn56tbi	cmotmfpmx0002ubyrnps3oo56	2026-05-06 05:33:22.223	2026-05-06 05:33:22.223
cmotmfzdv000eubyr7f5ivxj2	未命名作品	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856242/ivys-beauty/wcend5mzkpagfndq1jue.jpg}	漸變絲絨霧唇｜豆沙色	{}	FEMALE	cmotmfoxw0000ubyrwh0cm1nf	cmotmftas0004ubyr9qec1f2o	2026-05-06 05:33:22.532	2026-05-06 05:33:22.532
cmotmfzmd000gubyr4i4px94i	未命名作品	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856223/ivys-beauty/ukurhfyjhrrr1eiuyfum.jpg}	霧眉補色｜一年後補色效果	{}	FEMALE	cmotmfpfh0001ubyrxmn56tbi	cmotmfrxa0003ubyri5cqfqkd	2026-05-06 05:33:22.837	2026-05-06 05:33:22.837
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Service" (id, name, price, duration, "isPublished", "createdAt", "updatedAt") FROM stdin;
cmotmfpmx0002ubyrnps3oo56	漸層妝柔霧眉	15000	210	t	2026-05-06 05:33:09.897	2026-05-06 05:33:09.897
cmotmfrxa0003ubyri5cqfqkd	霧眉補色	5000	150	t	2026-05-06 05:33:12.863	2026-05-06 05:33:12.863
cmotmftas0004ubyr9qec1f2o	漸變絲絨霧唇	12000	210	t	2026-05-06 05:33:14.645	2026-05-06 05:33:14.645
cmotmfum50005ubyr5f23t8ao	霧唇補色	5000	150	t	2026-05-06 05:33:16.35	2026-05-06 05:33:16.35
cmotmfvzj0006ubyr8knx39gj	唇部淡色	0	120	t	2026-05-06 05:33:18.127	2026-05-06 05:33:18.127
\.


--
-- Data for Name: StoreInfo; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."StoreInfo" (id, phone, line, instagram, "bankCode", "bankName", "bankAccount", "bankAccountName", "createdAt", "updatedAt", threads) FROM stdin;
cmotmfy6a0008ubyr4pr556n5	0912345678	https://line.me/R/ti/p/@016qduiu	https://www.instagram.com/honppe/	822	中國信託	123456789012	艾微美學工作室	2026-05-06 05:33:20.963	2026-05-06 05:33:20.963	https://www.threads.com/@honppe
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."User" (id, name, email, "passwordHash", phone, birthday, role, "createdAt", "updatedAt", "cumulativeSpending", "lastVisit", level, "memberNotes", points, "prepaidBalance", status, "visitCount") FROM stdin;
cmotmfxpr0007ubyre3ijo4pm	Ivy Hong	ivy@ivysbeauty.com	$2a$10$GyUP3FWDPShKHYkJg6xmb.YODiXYlVZkE/KFFw3hYE1v2RStNPIT2	\N	\N	OWNER	2026-05-06 05:33:20.098	2026-05-06 05:33:20.098	0	\N	一般會員	\N	0	0	啟用中	0
cmow3t2er0000f0lyaopnoii9	Nina	ytwang4@myseneca.ca	$2b$12$TaPEU3LcYNqtqBgW9s1K1OCBEzMyryBz8mXGm6DSiVqVqWbD.mo/C	enc:v1:NAglmEkkZkD4LPqG:PJzCiz4LzoLhVTylWcVDMg:pv8k8Nm7-T63ug	enc:v1:queAYevXnpXbiowp:pPORPy7Z3FPqRb9cQDRGAQ:I2d442unzfrfDA	MEMBER	2026-05-07 23:14:58.803	2026-05-07 23:15:22.201	0	\N	一般會員	\N	0	0	啟用中	0
\.


--
-- Data for Name: _LocationToService; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."_LocationToService" ("A", "B") FROM stdin;
cmotmfoxw0000ubyrwh0cm1nf	cmotmfpmx0002ubyrnps3oo56
cmotmfpfh0001ubyrxmn56tbi	cmotmfpmx0002ubyrnps3oo56
cmotmfoxw0000ubyrwh0cm1nf	cmotmfrxa0003ubyri5cqfqkd
cmotmfpfh0001ubyrxmn56tbi	cmotmfrxa0003ubyri5cqfqkd
cmotmfoxw0000ubyrwh0cm1nf	cmotmftas0004ubyr9qec1f2o
cmotmfpfh0001ubyrxmn56tbi	cmotmftas0004ubyr9qec1f2o
cmotmfoxw0000ubyrwh0cm1nf	cmotmfum50005ubyr5f23t8ao
cmotmfpfh0001ubyrxmn56tbi	cmotmfum50005ubyr5f23t8ao
cmotmfoxw0000ubyrwh0cm1nf	cmotmfvzj0006ubyr8knx39gj
cmotmfpfh0001ubyrxmn56tbi	cmotmfvzj0006ubyr8knx39gj
\.


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: HomeContent HomeContent_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."HomeContent"
    ADD CONSTRAINT "HomeContent_pkey" PRIMARY KEY (id);


--
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- Name: MonthlySchedule MonthlySchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."MonthlySchedule"
    ADD CONSTRAINT "MonthlySchedule_pkey" PRIMARY KEY (id);


--
-- Name: Portfolio Portfolio_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Portfolio"
    ADD CONSTRAINT "Portfolio_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: StoreInfo StoreInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."StoreInfo"
    ADD CONSTRAINT "StoreInfo_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: MonthlySchedule_locationId_month_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "MonthlySchedule_locationId_month_key" ON public."MonthlySchedule" USING btree ("locationId", month);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _LocationToService_AB_unique; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "_LocationToService_AB_unique" ON public."_LocationToService" USING btree ("A", "B");


--
-- Name: _LocationToService_B_index; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "_LocationToService_B_index" ON public."_LocationToService" USING btree ("B");


--
-- Name: Booking Booking_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MonthlySchedule MonthlySchedule_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."MonthlySchedule"
    ADD CONSTRAINT "MonthlySchedule_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Portfolio Portfolio_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Portfolio"
    ADD CONSTRAINT "Portfolio_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Portfolio Portfolio_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Portfolio"
    ADD CONSTRAINT "Portfolio_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _LocationToService _LocationToService_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."_LocationToService"
    ADD CONSTRAINT "_LocationToService_A_fkey" FOREIGN KEY ("A") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _LocationToService _LocationToService_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."_LocationToService"
    ADD CONSTRAINT "_LocationToService_B_fkey" FOREIGN KEY ("B") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict sbQIgG1vDJlgVGhsx0bWEGuwqWetMws74OIed53ixq6C5cEy3Vngym2WdlHtgJY

