--
-- PostgreSQL database dump
--

\restrict xwkVKXhvTeXimnDdkxTL0H7DOf1efioeCMLyFvTZuaNkqAPgbWZ9qkeUOejPgnk

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'PENDING',
    'CONFIRMED',
    'CANCELLED',
    'DONE',
    'MISSED'
);


ALTER TYPE public."BookingStatus" OWNER TO postgres;

--
-- Name: Gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE',
    'UNISEX'
);


ALTER TYPE public."Gender" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'OWNER',
    'MEMBER'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- Name: HomeContent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HomeContent" (
    id text DEFAULT 'singleton'::text NOT NULL,
    hero jsonb NOT NULL,
    about jsonb NOT NULL,
    notice jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."HomeContent" OWNER TO postgres;

--
-- Name: Location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Location" (
    id text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isPublished" boolean DEFAULT true NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "imageUrls" text[] DEFAULT ARRAY[]::text[]
);


ALTER TABLE public."Location" OWNER TO postgres;

--
-- Name: MonthlySchedule; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public."MonthlySchedule" OWNER TO postgres;

--
-- Name: Portfolio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Portfolio" (
    id text NOT NULL,
    description text,
    gender public."Gender" DEFAULT 'FEMALE'::public."Gender" NOT NULL,
    "locationId" text,
    "serviceId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    tags text[] DEFAULT ARRAY[]::text[],
    title text DEFAULT '未命名作品'::text NOT NULL,
    "imageUrls" text[] DEFAULT ARRAY[]::text[]
);


ALTER TABLE public."Portfolio" OWNER TO postgres;

--
-- Name: Service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Service" (
    id text NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    duration integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isPublished" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Service" OWNER TO postgres;

--
-- Name: StoreInfo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StoreInfo" (
    id text NOT NULL,
    phone text,
    line text,
    instagram text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "bankAccount" text,
    "bankAccountName" text,
    "bankCode" text,
    "bankName" text,
    threads text
);


ALTER TABLE public."StoreInfo" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _LocationToService; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_LocationToService" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_LocationToService" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" (id, status, "startTime", "endTime", "expiredAt", "locationId", "serviceId", "customerId", notes, "createdAt", "updatedAt") FROM stdin;
cmotl924b000ej14xl4yvmajo	CONFIRMED	2026-03-15 02:00:00	2026-03-15 05:30:00	2026-03-02 02:00:00	cmotl91xb0000j14x36yo7ta6	cmotl91xg0002j14xpqyumvla	cmotl92450008j14xz9e6e682	第一次做霧眉，有點緊張	2026-03-01 02:00:00	2026-05-06 04:59:59.868
cmotl924d000gj14xuyuu24ll	CONFIRMED	2026-04-01 03:00:00	2026-04-01 05:30:00	2026-03-11 02:00:00	cmotl91xb0000j14x36yo7ta6	cmotl91xm0003j14xi7uobyst	cmotl9248000aj14xauad37n6	\N	2026-03-10 02:00:00	2026-05-06 04:59:59.869
cmotl924f000ij14x62gpjn83	CONFIRMED	2026-03-20 06:00:00	2026-03-20 09:30:00	2026-03-02 02:00:00	cmotl91xf0001j14xkjs66nf3	cmotl91xo0004j14xedyylfnq	cmotl92470009j14xmpbkcnwr	\N	2026-03-01 02:00:00	2026-05-06 04:59:59.871
cmotl924f000kj14x0u8wa2ca	CONFIRMED	2026-04-10 02:00:00	2026-04-10 04:30:00	2026-03-21 02:00:00	cmotl91xf0001j14xkjs66nf3	cmotl91xr0005j14x5syu4myc	cmotl92450008j14xz9e6e682	補色效果很好	2026-03-20 02:00:00	2026-05-06 04:59:59.872
cmotl924g000mj14xlz1x723r	CONFIRMED	2026-04-25 02:00:00	2026-04-25 05:30:00	2026-04-02 02:00:00	cmotl91xb0000j14x36yo7ta6	cmotl91xg0002j14xpqyumvla	cmotl92450008j14xz9e6e682	\N	2026-04-01 02:00:00	2026-05-06 04:59:59.873
cmotl924h000oj14xyius4kif	CONFIRMED	2026-04-28 06:00:00	2026-04-28 08:30:00	2026-04-06 02:00:00	cmotl91xb0000j14x36yo7ta6	cmotl91xm0003j14xi7uobyst	cmotl92470009j14xmpbkcnwr	\N	2026-04-05 02:00:00	2026-05-06 04:59:59.873
cmotl924h000qj14xm1kaio5b	CONFIRMED	2026-05-02 02:00:00	2026-05-02 05:30:00	2026-04-11 02:00:00	cmotl91xf0001j14xkjs66nf3	cmotl91xo0004j14xedyylfnq	cmotl9248000aj14xauad37n6	對自然色調有興趣	2026-04-10 02:00:00	2026-05-06 04:59:59.874
cmotl924k000wj14x6bqh2dgd	CANCELLED	2026-02-15 02:00:00	2026-02-15 04:00:00	2026-01-16 02:00:00	cmotl91xb0000j14x36yo7ta6	cmotl91xt0006j14xzqgrsgmi	cmotl92450008j14xz9e6e682	\N	2026-01-15 02:00:00	2026-05-06 04:59:59.876
cmotl924l000yj14xu3sp4v5r	CANCELLED	2026-03-01 02:00:00	2026-03-01 05:30:00	2026-02-02 02:00:00	cmotl91xb0000j14x36yo7ta6	cmotl91xo0004j14xedyylfnq	cmotl9248000aj14xauad37n6	\N	2026-02-01 02:00:00	2026-05-06 04:59:59.877
cmotl924j000uj14x3kcs0fqk	DONE	2026-04-26 06:00:00	2026-04-26 09:30:00	2026-04-23 06:00:00	cmotl91xf0001j14xkjs66nf3	cmotl91xo0004j14xedyylfnq	cmotl9248000bj14x9ak9m85t	\N	2026-04-22 06:00:00	2026-05-08 21:45:14.176
cmotl924i000sj14xz7lk0djv	DONE	2026-04-23 02:00:00	2026-04-23 05:30:00	2026-04-21 02:00:00	cmotl91xb0000j14x36yo7ta6	cmotl91xg0002j14xpqyumvla	cmotl9248000bj14x9ak9m85t	\N	2026-04-20 02:00:00	2026-05-08 21:45:17.141
cmoxu2aim00031d7uamep11mc	DONE	2026-05-10 05:00:00	2026-05-10 08:30:00	2026-05-10 04:17:45.405	cmotl91xf0001j14xkjs66nf3	cmotl91xo0004j14xedyylfnq	cmow3ol560002sf12fcxu93ad		2026-05-09 04:17:45.406	2026-05-09 05:15:45.785
cmoxryiew00011jgcqx4foy5g	CANCELLED	2026-05-14 05:00:00	2026-05-14 07:30:00	2026-05-10 03:18:49.782	cmotl91xf0001j14xkjs66nf3	cmotl91xm0003j14xi7uobyst	cmotl92410007j14xln3qkg89		2026-05-09 03:18:49.783	2026-05-09 05:16:32.286
cmoxtnovk00011d7ufci6q6dn	CANCELLED	2026-05-12 05:30:00	2026-05-12 08:00:00	2026-05-10 04:06:24.174	cmotl91xf0001j14xkjs66nf3	cmotl91xm0003j14xi7uobyst	cmow3ol560002sf12fcxu93ad		2026-05-09 04:06:24.175	2026-05-09 05:16:55.622
cmoxx7e5h00015sszdbkydgm9	DONE	2026-05-11 05:00:00	2026-05-11 08:30:00	2026-05-10 05:45:42.242	cmotl91xf0001j14xkjs66nf3	cmotl91xg0002j14xpqyumvla	cmotl92410007j14xln3qkg89		2026-05-09 05:45:42.245	2026-05-09 05:46:31.12
cmoxx91e800035sszl5cv8qlw	CANCELLED	2026-05-21 05:00:00	2026-05-21 07:00:00	2026-05-10 05:46:59.023	cmotl91xf0001j14xkjs66nf3	cmotl91xt0006j14xzqgrsgmi	cmotl92410007j14xln3qkg89		2026-05-09 05:46:59.024	2026-05-09 05:50:15.933
cmoxxdmyx00055sszw8mups7v	PENDING	2026-05-11 05:00:00	2026-05-11 07:00:00	2026-05-10 05:50:33.606	cmotl91xf0001j14xkjs66nf3	cmotl91xt0006j14xzqgrsgmi	cmotl92410007j14xln3qkg89		2026-05-09 05:50:33.608	2026-05-09 05:50:33.608
cmoxxgunw00075sszsero59y8	PENDING	2026-05-15 06:00:00	2026-05-15 08:30:00	2026-05-10 05:53:03.546	cmotl91xf0001j14xkjs66nf3	cmotl91xm0003j14xi7uobyst	cmotl92410007j14xln3qkg89		2026-05-09 05:53:03.548	2026-05-09 05:53:03.548
\.


--
-- Data for Name: HomeContent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HomeContent" (id, hero, about, notice, "createdAt", "updatedAt") FROM stdin;
singleton	{"title": "在日常裡\\n看見更好的自己", "eyebrow": "Natural · Professional · Joyful", "imageUrls": ["https://res.cloudinary.com/dvkajiqyy/image/upload/v1778044067/ivys-beauty/ftg59q0cx8jwyh5ptc2i.jpg"], "buttonText": "開始預約", "description": "Ivy's Beauty 透過拋棄式針具與檢驗合格色乳，專注技術與美感，找到最適合的微妝感。"}	{"title": "拒絕套板，量身打造", "eyebrow": "About Us", "description": "滿滿的自信感從愛自己開始，不為誰而改變，只想對自己更好一點\\n我們致力於修飾臉型、提升氣質，讓您擁有最穩定的留色與極短的修復期。"}	{"rules": [{"title": "預約", "content": "<ul><li><p>預約時需先支付訂金 <strong>2,000 元</strong>，當日到店後補齊尾款。</p></li><li><p>並於<strong> 1 日內</strong>完成網路轉帳。</p></li></ul><p></p>"}, {"title": "退改須知", "content": "<ul><li>預約完成後如需取消預約，訂金恕不退還。</li><li>若需更改時間請提前 <strong>48 小時</strong>告知，訂金可為您保留 3 個月。</li><li>為避免影響後續客人權益，當日遲到超過 15 分鐘視同取消，訂金恕不退還。</li></ul>"}], "title": "預約須知", "eyebrow": "Notice", "description": "為保障您的權益及維持高品質服務，請務必詳閱以下約定。"}	2026-05-06 04:59:59.883	2026-05-09 05:44:33.886
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" (id, name, address, "createdAt", "isPublished", "updatedAt", "imageUrls") FROM stdin;
cmotl91xb0000j14x36yo7ta6	板橋工作室	新埔捷運站 1 號出口・步行 3 分鐘	2026-05-06 04:59:59.615	t	2026-05-07 22:14:17.855	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777843322/ivys-beauty/hzssj5c8wyfbz9vgtca6.png,https://res.cloudinary.com/dvkajiqyy/image/upload/v1777843278/ivys-beauty/cmfvomh59wxgn3plop50.png}
cmotl91xf0001j14xkjs66nf3	宜蘭工作室	宜蘭縣壯圍鄉永美路	2026-05-06 04:59:59.619	t	2026-05-07 22:11:28.066	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1778183661/ivys-beauty/rlaqzuhk1t4awkz8v8kc.png}
\.


--
-- Data for Name: MonthlySchedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MonthlySchedule" (id, "locationId", month, "all", overrides, "createdAt", "updatedAt") FROM stdin;
cmow3jd210001sf12wthw5e7y	cmotl91xf0001j14xkjs66nf3	2026-05	[{"isOpen": true, "breakEnd": "13:00", "hasBreak": true, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 1, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": true, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 2, "breakStart": "12:00"}, {"isOpen": false, "breakEnd": "13:00", "hasBreak": true, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 3, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": true, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 4, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": true, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 5, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": true, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 6, "breakStart": "12:00"}, {"isOpen": true, "breakEnd": "13:00", "hasBreak": true, "openTime": "11:00", "closeTime": "20:00", "dayOfWeek": 0, "breakStart": "12:00"}]	{}	2026-05-07 23:07:26.041	2026-05-07 23:07:26.041
\.


--
-- Data for Name: Portfolio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Portfolio" (id, description, gender, "locationId", "serviceId", "createdAt", "updatedAt", tags, title, "imageUrls") FROM stdin;
cmotl924m0010j14xn5gyvjyu	男生霧眉｜自然型	MALE	cmotl91xb0000j14x36yo7ta6	cmotl91xg0002j14xpqyumvla	2026-05-06 04:59:59.878	2026-05-06 04:59:59.878	{}	未命名作品	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856267/ivys-beauty/ognykcebrk6ojwliiqgg.jpg}
cmotl924n0012j14xznyocvoq	漸層柔霧眉｜深棕	FEMALE	cmotl91xf0001j14xkjs66nf3	cmotl91xg0002j14xpqyumvla	2026-05-06 04:59:59.88	2026-05-06 04:59:59.88	{}	未命名作品	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856256/ivys-beauty/bio33z603vso6afz7eg5.jpg}
cmotl924o0014j14xp154nfb7	漸變絲絨霧唇｜豆沙色	FEMALE	cmotl91xb0000j14x36yo7ta6	cmotl91xo0004j14xedyylfnq	2026-05-06 04:59:59.881	2026-05-06 04:59:59.881	{}	未命名作品	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856242/ivys-beauty/wcend5mzkpagfndq1jue.jpg}
cmotl924p0016j14xn23bp8lq	一年後補色效果	FEMALE	cmotl91xf0001j14xkjs66nf3	cmotl91xm0003j14xi7uobyst	2026-05-06 04:59:59.882	2026-05-09 00:34:18.406	{}	霧眉補色	{https://res.cloudinary.com/dvkajiqyy/image/upload/v1777856223/ivys-beauty/ukurhfyjhrrr1eiuyfum.jpg}
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Service" (id, name, price, duration, "createdAt", "updatedAt", "isPublished") FROM stdin;
cmotl91xo0004j14xedyylfnq	漸變絲絨霧唇	12000	210	2026-05-06 04:59:59.629	2026-05-09 05:27:32.221	t
cmotl91xg0002j14xpqyumvla	漸層妝柔霧眉	15000	210	2026-05-06 04:59:59.621	2026-05-06 04:59:59.621	t
cmotl91xm0003j14xi7uobyst	霧眉補色	5000	150	2026-05-06 04:59:59.627	2026-05-06 04:59:59.627	t
cmotl91xr0005j14x5syu4myc	霧唇補色	5000	150	2026-05-06 04:59:59.631	2026-05-06 04:59:59.631	t
cmotl91xt0006j14xzqgrsgmi	唇部淡色	0	120	2026-05-06 04:59:59.634	2026-05-06 04:59:59.634	t
\.


--
-- Data for Name: StoreInfo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StoreInfo" (id, phone, line, instagram, "createdAt", "updatedAt", "bankAccount", "bankAccountName", "bankCode", "bankName", threads) FROM stdin;
cmotl9249000cj14x563yy0k8	0912345678	https://line.me/R/ti/p/@016qduiu	https://www.instagram.com/honppe/	2026-05-06 04:59:59.866	2026-05-06 04:59:59.866	123456789012	艾微美學工作室	822	中國信託	https://www.threads.com/@honppe
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "passwordHash", phone, birthday, role, "createdAt", "updatedAt", "cumulativeSpending", "lastVisit", level, "memberNotes", points, "prepaidBalance", status, "visitCount") FROM stdin;
cmotl92410007j14xln3qkg89	Ivy Hong	ivy@ivysbeauty.com	$2a$10$g39OIn32O/9YI6cyAu6zyOAiH.jB1lWdcY5oabQ6gl21CYhBjd4Vy	enc:v1:wGUsuQNyRzVwhFKQ:ARRg-s5tgXL18bwbsWFeww:U_fGlZ4cvne9IA	enc:v1:7G169DMXyWeKCb54:KBC6NFWjpQmWUR0VI1CGBw:RPJrQYTJOjTH4w	OWNER	2026-05-06 04:59:59.857	2026-05-06 04:59:59.857	0	\N	一般會員	\N	0	0	啟用中	0
cmotl92450008j14xz9e6e682	陳小美	alice@test.com	$2a$10$Nbs2bQGc9/C1KEVscCYo9.eceOGYWclK.5/QWQADaVTZnPBXx1ot2	enc:v1:yzgPdD-TgftLIHLO:OGo9SauwLeo_skAqVyOdhQ:N0cB1iI4XcZCWA	enc:v1:dRcHwpROw_rNZJgz:ukl1R-eicM8xtJX6pcDyww:n06UNjuQdemMXQ	MEMBER	2026-05-06 04:59:59.862	2026-05-06 04:59:59.862	0	\N	一般會員	\N	0	0	啟用中	0
cmotl92470009j14xmpbkcnwr	林志偉	bob@test.com	$2a$10$Nbs2bQGc9/C1KEVscCYo9.eceOGYWclK.5/QWQADaVTZnPBXx1ot2	enc:v1:hlzlppDZeei3ltf8:bONTRPaYfykzKnr_TDTsXg:c_SuNgHv5o_hKg	enc:v1:GDhM-MMlUIJiHgDM:lOKnfzwNmEM85Wow-bPojQ:sX_MwzAe-yEKbg	MEMBER	2026-05-06 04:59:59.863	2026-05-06 04:59:59.863	0	\N	一般會員	\N	0	0	啟用中	0
cmotl9248000bj14x9ak9m85t	enc:v1:faKeKXEw7VLSIsU9:6oCR6nQn_KJX2BjnFnUQ1w:SSnyMyByb0Fq	david@test.com	$2a$10$Nbs2bQGc9/C1KEVscCYo9.eceOGYWclK.5/QWQADaVTZnPBXx1ot2	enc:v1:8nRXy9LqLnJ16Rpg:8JOJwCFspaIYiF7atSRukQ:f5NGNsYHfJ9iGQ	enc:v1:jZvMTWRs2L8Qydjh:aOdjLHJUsKH8PWd7XjSlbg:QPzLB47vrwl1Wg	MEMBER	2026-05-06 04:59:59.865	2026-05-09 05:21:59.142	0	\N	一般會員	\N	0	0	啟用中	0
cmotl9248000aj14xauad37n6	enc:v1:wWox-mi_kyjgkS67:uVOzu9RSdeWvJ-1Oa9hbBA:2Cv52U-g19o7	carol@test.com	$2a$10$Nbs2bQGc9/C1KEVscCYo9.eceOGYWclK.5/QWQADaVTZnPBXx1ot2	enc:v1:2rjDbpahPwOcUk-7:UKnKi8QjaDKwsZzTUbct3A:U5RAJSxysXxtrw	enc:v1:EjqyyEuhX2Dah0d5:X3XXArZAOkANdtSGXaVdmw:jY1nuUGiw2H5zg	MEMBER	2026-05-06 04:59:59.864	2026-05-09 05:22:17.454	0	\N	一般會員	\N	0	0	啟用中	0
cmow3ol560002sf12fcxu93ad	enc:v1:e4jmHM_nZFJfBboU:F6HpI4vSUVfKD8kRiWgtnA:4KbjtA	ytwang4@myseneca.ca	$2b$12$PSrquA4.Aui5aYKl3sAl1.kWjkBdJIphN1jf0Ghodux.Kw5H4p7Di	enc:v1:UKwA-8eZgOQkLEQX:jDLPBLzXov1qoo6tR4tGWg:_qnyOlDoEolCOw	enc:v1:oXn5z4QEhY5z0kfi:mz03TiF6XGahCfIrmB80wg:a2vDWVjA68c5Bw	MEMBER	2026-05-07 23:11:29.803	2026-05-09 05:41:53.376	0	\N	一般會員	\N	0	0	啟用中	0
\.


--
-- Data for Name: _LocationToService; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_LocationToService" ("A", "B") FROM stdin;
cmotl91xb0000j14x36yo7ta6	cmotl91xg0002j14xpqyumvla
cmotl91xf0001j14xkjs66nf3	cmotl91xg0002j14xpqyumvla
cmotl91xb0000j14x36yo7ta6	cmotl91xm0003j14xi7uobyst
cmotl91xf0001j14xkjs66nf3	cmotl91xm0003j14xi7uobyst
cmotl91xb0000j14x36yo7ta6	cmotl91xo0004j14xedyylfnq
cmotl91xf0001j14xkjs66nf3	cmotl91xo0004j14xedyylfnq
cmotl91xb0000j14x36yo7ta6	cmotl91xr0005j14x5syu4myc
cmotl91xf0001j14xkjs66nf3	cmotl91xr0005j14x5syu4myc
cmotl91xb0000j14x36yo7ta6	cmotl91xt0006j14xzqgrsgmi
cmotl91xf0001j14xkjs66nf3	cmotl91xt0006j14xzqgrsgmi
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ec190be9-cc77-4d74-816a-8cb4c7492320	ac1dbe011e52debe9248d4d6ac46f98c0665844589ac9d9ff35929a16d0f2635	2026-04-22 01:37:59.68162+00	20260422013759_add_password_hash	\N	\N	2026-04-22 01:37:59.616598+00	1
03951dda-f1ef-44fe-a7c2-af45735faacc	472e291af89456dcbacbc48359d47bfb8ebc5c85799ea925b0f30e691443f9d0	\N	20260422091500_birthday_to_string	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260422091500_birthday_to_string\n\nDatabase error code: 42883\n\nDatabase error:\nERROR: function to_char(text, unknown) does not exist\nHINT: No function matches the given name and argument types. You might need to add explicit type casts.\n\nPosition:\n[1m  1[0m -- Convert User.birthday from timestamp to string (YYYY-MM-DD)\n[1m  2[0m ALTER TABLE "User"\n[1m  3[0m ALTER COLUMN "birthday" TYPE TEXT\n[1m  4[0m USING CASE\n[1m  5[0m   WHEN "birthday" IS NULL THEN NULL\n[1m  6[1;31m   ELSE to_char("birthday", 'YYYY-MM-DD')[0m\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E42883), message: "function to_char(text, unknown) does not exist", detail: None, hint: Some("No function matches the given name and argument types. You might need to add explicit type casts."), position: Some(Original(171)), where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("parse_func.c"), line: Some(629), routine: Some("ParseFuncOrColumn") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20260422091500_birthday_to_string"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name="20260422091500_birthday_to_string"\n             at schema-engine/core/src/commands/apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:226	2026-04-22 21:05:27.360776+00	2026-04-22 20:58:29.355749+00	0
\.


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: HomeContent HomeContent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HomeContent"
    ADD CONSTRAINT "HomeContent_pkey" PRIMARY KEY (id);


--
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- Name: MonthlySchedule MonthlySchedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MonthlySchedule"
    ADD CONSTRAINT "MonthlySchedule_pkey" PRIMARY KEY (id);


--
-- Name: Portfolio Portfolio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Portfolio"
    ADD CONSTRAINT "Portfolio_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: StoreInfo StoreInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StoreInfo"
    ADD CONSTRAINT "StoreInfo_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: MonthlySchedule_locationId_month_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "MonthlySchedule_locationId_month_key" ON public."MonthlySchedule" USING btree ("locationId", month);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _LocationToService_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_LocationToService_AB_unique" ON public."_LocationToService" USING btree ("A", "B");


--
-- Name: _LocationToService_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_LocationToService_B_index" ON public."_LocationToService" USING btree ("B");


--
-- Name: Booking Booking_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MonthlySchedule MonthlySchedule_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MonthlySchedule"
    ADD CONSTRAINT "MonthlySchedule_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Portfolio Portfolio_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Portfolio"
    ADD CONSTRAINT "Portfolio_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Portfolio Portfolio_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Portfolio"
    ADD CONSTRAINT "Portfolio_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _LocationToService _LocationToService_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_LocationToService"
    ADD CONSTRAINT "_LocationToService_A_fkey" FOREIGN KEY ("A") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _LocationToService _LocationToService_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_LocationToService"
    ADD CONSTRAINT "_LocationToService_B_fkey" FOREIGN KEY ("B") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict xwkVKXhvTeXimnDdkxTL0H7DOf1efioeCMLyFvTZuaNkqAPgbWZ9qkeUOejPgnk

