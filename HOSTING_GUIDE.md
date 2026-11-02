# ?뙋 Wavit Studio ?몄뒪???명봽??諛??쒕쾭 ?댁쁺 紐낆꽭??
??臾몄꽌??**Cloudflare Pages(?대씪?곕뱶 ?쒕쾭由ъ뒪)** 諛?Windows 11 ?섍꼍??**Cloudflare Tunnel + PM2(濡쒖뺄 ?몄뒪??**瑜??듯빐 ?곸떆 臾댁쨷???댁쁺 以묒씤 ???좏뵆由ъ??댁뀡 諛?諛깆뿏???쒕퉬?ㅼ쓽 ?꾩껜 援ъ꽦怨??댁쁺 媛?대뱶瑜?湲곕줉??怨듭떇 臾몄꽌?낅땲??

---

## 1. ?룛截??꾩껜 ?쒖뒪???꾪궎?띿쿂

- **諛⑸Ц??(?몃? ?명꽣???묒냽 寃쎈줈)**:
  - `https://wavit-studio.com` (?먮뒗 `www`) ??**WAVIT Studio 硫붿씤 ?ы듃?대━??* (Cloudflare Pages 臾댁쨷???대씪?곕뱶 ?몄뒪??
  - `https://schedule.wavit-studio.com` ??**Schedule Tracker** (濡쒖뺄 ?몄뒪??PC)
  - `https://virtualindex.wavit-studio.com` ??**VirtualIndex** (濡쒖뺄 ?몄뒪??PC)
- **Cloudflare Edge**:
  - DNS CNAME ?쇱슦?? SSL/TLS ?먮룞 ?뷀샇?? DDoS 諛⑹뼱 諛?湲濡쒕쾶 ?ｌ? 罹먯떛
  - `_redirects` 洹쒖튃???듯빐 `/theme_sharp_desktop` ?묎렐 ??猷⑦듃(`/`)濡?301 ?곴뎄 ?대룞
- **濡쒖뺄 ?몄뒪??PC (Windows 11)**:
  - **?덈룄???쒕퉬??*: `Cloudflared` (?곕꼸 ?꾩썐諛붿슫???곌껐 ?좎?)
  - **?덈룄???묒뾽 ?ㅼ?以꾨윭 (遺?????곸떆 臾댁쨷??援щ룞)**:
    - `Schedule_Server` (Next.js 16.2.10, ?ы듃 3000, `C:\apps\schedule\scripts\start-server.vbs`)
    - `VirtualIndex_Server` (Next.js 16.3.6, ?ы듃 3001, `C:\Users\wkjne\virtualindex\scripts\start-server.vbs`)
    - `VirtualIndex_Collector` (?ㅼ떆媛?諛⑹넚 ?섏쭛湲? 5遺?二쇨린 媛??
  - **PM2 ?꾨줈?몄뒪 留ㅻ땲? (蹂댁“/?섎룞 愿由?**:
    - `schedule-web` (Next.js 16.2.10, ?ы듃 3000)
    - `virtualindex-server` (Next.js 16.3.6, ?ы듃 3001)
    - `virtualindex-collector` (?ㅼ떆媛?諛⑹넚 ?섏쭛湲?
- **?몃? ?대씪?곕뱶**:
  - Supabase PostgreSQL ?대씪?곕뱶 ?곗씠?곕쿋?댁뒪
  - 移섏?吏?/ ?좏뒠釉?/ ?몄쐞移?/ ???꾪봽由ъ뭅) Open API

---

## 2. ?뱥 ?쒖꽦 ?몄뒪???쒕퉬???곸꽭 紐⑸줉

| ??ぉ | 硫붿씤: WAVIT Studio | ?쒕퉬??1: Schedule Tracker | ?쒕퉬??2: VirtualIndex | ?쒕퉬??3: Live Collector |
| :--- | :--- | :--- | :--- | :--- |
| **?몄뒪???섍꼍** | **Cloudflare Pages (GitHub Actions CI/CD ?먮룞 諛고룷)** | **濡쒖뺄 PC (Cloudflare Tunnel)** | **濡쒖뺄 PC (Cloudflare Tunnel)** | **濡쒖뺄 PC (諛깃렇?쇱슫??** |
| **怨듦컻 ?묒냽 ?꾨찓??* | `https://wavit-studio.com` | `https://schedule.wavit-studio.com` | `https://virtualindex.wavit-studio.com` | *(?대? 諛깃렇?쇱슫???뚯빱)* |
| **濡쒖뺄 ?ы듃** | *(?쒕쾭由ъ뒪 - 濡쒖뺄 ?먯쑀 ?놁쓬)* | `3000` | `3001` | `3001` (?源??몄텧) |
| **愿由??꾨줈?몄뒪** | Cloudflare Edge Global CDN | ?ㅼ?以꾨윭: `Schedule_Server` / PM2: `schedule-web` (ID: 0) | ?ㅼ?以꾨윭: `VirtualIndex_Server` / PM2: `virtualindex-server` (ID: 1) | ?ㅼ?以꾨윭: `VirtualIndex_Collector` / PM2: `virtualindex-collector` (ID: 2) |
| **?꾨줈?앺듃 寃쎈줈 / ?뚯뒪** | GitHub: `WAVYkhy/WAVIT_studio_2` | `C:\apps\schedule` | `C:\Users\wkjne\virtualindex` | `C:\Users\wkjne\virtualindex` |
| **?꾨젅?꾩썙??/ 援ъ“** | Vanilla HTML/CSS/JS (?뺤쟻 ?? | Next.js 16.2.10 (Node.js v26) | Next.js 16.3.6 (Node.js v26) | Node.js Worker (ESM) |
| **?뱀씠 ?ы빆** | Nordic Sharp Desktop ?⑥씪 怨좎젙 ?뚮쭏 | `schedule.wavit-studio.com` ?낅┰ 猷⑦듃 留ㅽ븨 (`/schedule` ?묎렐 ???먮룞 301/308 由щ떎?대젆?? | 猷⑦듃 ?쒕툕?꾨찓???⑤룆 留ㅽ븨 | 5遺?媛꾧꺽 ?먮룞 ?쇱씠釉??섏쭛 |

---

## 3. ?숋툘 ?ㅽ듃?뚰겕 諛??꾨찓???명봽???뺣낫

### [?꾨찓??諛?DNS ?뺣낫]
- **猷⑦듃 ?꾨찓??*: `wavit-studio.com`
- **?꾨찓???깅줉湲곌?**: Spaceship
- **?ㅼ엫?쒕쾭(NS)**:
  - `adele.ns.cloudflare.com`
  - `vin.ns.cloudflare.com`
- **Cloudflare Zone ID**: `023f17403dfe75606f5c10a570677f7e`
- **Cloudflare Account ID**: `d32c927d04c8c89b6f6a9ba3374cfcaf`

### [Cloudflare Pages (硫붿씤 ?뱀궗?댄듃)]
- **?꾨줈?앺듃紐?*: `wavit-studio`
- **湲곕낯 二쇱냼**: `https://wavit-studio.pages.dev`
- **?꾨줈?뺤뀡 釉뚮옖移?*: `main`
- **諛고룷 諛⑹떇**: GitHub Actions CI/CD (`.github/workflows/deploy.yml` ??Cloudflare Pages ?먮룞 諛고룷)
- **而ㅼ뒪? ?꾨찓??*: `wavit-studio.com`, `www.wavit-studio.com`
- **二쇱슂 援ъ꽦**:
  - `index.html`: Nordic Sharp OS ?곗뒪?ы넲 ?⑥씪 硫붿씤 ?뚮쭏 ?곸슜
  - `_redirects`: `/theme_sharp_desktop` ??`/` (301 ?먮룞 ?뺢퇋??
  - 遺덊븘?뷀븳 援щ쾭???뚮쭏(Brutalist, Editorial, Pastel ?? ?쇨큵 ?뺣━ ?꾨즺

### [Cloudflare Zero Trust Tunnel (濡쒖뺄 ?쒕퉬??]
- **?곕꼸 ID**: `90a6ff3c-b177-44ba-8bbb-d76928e0bb04`
- **?곕꼸 ????몄뒪??*: `90a6ff3c-b177-44ba-8bbb-d76928e0bb04.cfargotunnel.com`
- **?덈룄???쒕퉬?ㅻ챸**: `Cloudflared` (`C:\Program Files (x86)\cloudflared\cloudflared.exe`)
- **?좏겙 ????뚯씪**: `C:\ProgramData\cloudflared\token`
- **?곕꼸 ?멸렇?덉뒪(Ingress) ?쇱슦??洹쒖튃**:
  1. `schedule.wavit-studio.com` ??`http://localhost:3000` (Schedule Tracker ?꾩슜)
  2. `virtualindex.wavit-studio.com` ??`http://localhost:3001` (VirtualIndex ?꾩슜)
  3. `*` ??`http_status:404` (湲고? 誘몃벑濡??쒕툕?꾨찓??李⑤떒)

### [DNS ?덉퐫??留ㅽ븨??
| Type | Name | Content (Target) | Proxy (援щ쫫) | ?⑸룄 |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `@` (wavit-studio.com) | `wavit-studio.pages.dev` | ?꾨줉?쒕맖 (耳쒖쭚) | `wavit-studio.com` Cloudflare Pages ?곌껐 |
| **CNAME** | `www` (www.wavit-studio.com) | `wavit-studio.pages.dev` | ?꾨줉?쒕맖 (耳쒖쭚) | `www.wavit-studio.com` 蹂댁“ ?꾨찓???곌껐 |
| **CNAME** | `schedule` | `90a6ff3c-b177-44ba-8bbb-d76928e0bb04.cfargotunnel.com` | ?꾨줉?쒕맖 (耳쒖쭚) | `schedule.wavit-studio.com` ?곕꼸 ?쇱슦??|
| **CNAME** | `virtualindex` | `90a6ff3c-b177-44ba-8bbb-d76928e0bb04.cfargotunnel.com` | ?꾨줉?쒕맖 (耳쒖쭚) | `virtualindex.wavit-studio.com` ?곕꼸 ?쇱슦??|
| **MX** | `@` | `mx.zoho.com` (?곗꽑?쒖쐞 10) | DNS ?꾩슜 | Zoho Mail 硫붿씤 ?섏떊 ?쒕쾭 |
| **MX** | `@` | `mx2.zoho.com` (?곗꽑?쒖쐞 20) | DNS ?꾩슜 | Zoho Mail 蹂댁“ ?섏떊 ?쒕쾭 1 |
| **MX** | `@` | `mx3.zoho.com` (?곗꽑?쒖쐞 50) | DNS ?꾩슜 | Zoho Mail 蹂댁“ ?섏떊 ?쒕쾭 2 |
| **TXT** | `@` | `v=spf1 include:zoho.com ~all` | DNS ?꾩슜 | ?대찓??諛쒖떊 SPF ?몄쬆 |
| **TXT** | `zoho._domainkey` | `v=DKIM1; k=rsa; p=MIGfMA0G...` | DNS ?꾩슜 | ?대찓???꾩“ 諛⑹? DKIM ?몄쬆 |
| **TXT** | `_dmarc` | `v=DMARC1; p=none;` | DNS ?꾩슜 | ?대찓???꾩“ 諛??ㅽ뙵 諛⑹? DMARC ?뺤콉 |

---

## 4. ?썱截??쇱긽 ?댁쁺 諛?愿由?紐낅졊??移섑듃?쒗듃

### [WAVIT Studio (硫붿씤 ?? 諛고룷 愿由?
> **GitHub Actions CI/CD ?뚯씠?꾨씪??援ъ텞 ?꾨즺**: `main` 釉뚮옖移섏뿉 肄붾뱶瑜??몄떆?섎㈃ GitHub ?대씪?곕뱶 ?щ꼫媛 ?먮룞?쇰줈 媛먯??섏뿬 **20~30珥???Cloudflare Pages濡?臾댁쨷???먮룞 諛고룷**瑜??섑뻾?⑸땲??

```powershell
# 1. ?먮룞 諛고룷 (GitHub main ?몄떆 ???먮룞?쇰줈 諛고룷 ?꾨즺)
git add .
git commit -m "Update website content"
git push origin main

# 2. 鍮꾩긽 ?섎룞 ?щ같??(GitHub Actions瑜?嫄곗튂吏 ?딄퀬 濡쒖뺄?먯꽌 利됱떆 CLI 諛고룷??寃쎌슦)
$env:CLOUDFLARE_API_KEY = "<CLOUDFLARE_API_KEY>"
$env:CLOUDFLARE_EMAIL = "<CLOUDFLARE_EMAIL>"
$env:CLOUDFLARE_ACCOUNT_ID = "d32c927d04c8c89b6f6a9ba3374cfcaf"
npx wrangler pages deploy "<?꾨줈?앺듃寃쎈줈>" --project-name "wavit-studio" --branch "main"
```

### [Windows ?묒뾽 ?ㅼ?以꾨윭 愿由?(?곸떆 ?쒕퉬??]
```powershell
# 1. ?곸떆 ?쒕퉬???곹깭 ?쇨큵 ?뺤씤
Get-ScheduledTask -TaskName "Schedule_Server", "VirtualIndex_Server", "VirtualIndex_Collector" | Format-Table TaskName, State

# 2. ?뱀젙 ?쒕퉬???ъ떆??Restart-ScheduledTask -TaskName "Schedule_Server"        # ?ㅼ?以???(?ы듃 3000)
Restart-ScheduledTask -TaskName "VirtualIndex_Server"    # 踰꾩텛?쇱씤?깆뒪 ??(?ы듃 3001)
Restart-ScheduledTask -TaskName "VirtualIndex_Collector" # 5遺?二쇨린 ?섏쭛湲?
# 3. ?쒕퉬??濡쒓렇 ?뺤씤
Get-Content "C:\apps\schedule\server.log" -Tail 20                # ?ㅼ?以꾨윭 濡쒓렇
Get-Content "C:\Users\wkjne\virtualindex\server.log" -Tail 20    # 踰꾩텛?쇱씤?깆뒪 ?쒕쾭 濡쒓렇
Get-Content "C:\Users\wkjne\virtualindex\collector.log" -Tail 20 # ?섏쭛湲?濡쒓렇
```

### [PM2 濡쒖뺄 ?쒕퉬??愿由?
```powershell
# 1. ?꾩껜 ?쒕퉬??援щ룞 ?곹깭 ?뺤씤
pm2 status

# 2. ?ㅼ떆媛?濡쒓렇 紐⑤땲?곕쭅
pm2 logs                       # ?꾩껜 ?꾨줈?몄뒪 濡쒓렇 ?ㅽ듃由щ컢
pm2 logs schedule-web          # ?ㅼ?以꾨윭 濡쒓렇留??뺤씤
pm2 logs virtualindex-server   # 踰꾩텛?쇱씤?깆뒪 ?쒕쾭 濡쒓렇留??뺤씤
pm2 logs virtualindex-collector # ?쇱씠釉??섏쭛湲?濡쒓렇留??뺤씤

# 3. ?쒕퉬???ъ떆??pm2 restart all                # ?꾩껜 ?ъ떆??pm2 restart schedule-web       # ?뱀젙 ?쒕퉬?ㅻ쭔 ?ъ떆??pm2 restart virtualindex-server --update-env # ?섍꼍蹂??媛깆떊?섎ŉ ?ъ떆??
# 4. ?꾨줈?몄뒪 ?곹깭 ?곴뎄 ???(?щ??????먮룞 蹂듭썝 湲곗???
pm2 save
```

### [Cloudflare ?곕꼸 ?쒕퉬??愿由?
```powershell
# 1. ?곕꼸 ?쒕퉬???곹깭 ?뺤씤
Get-Service cloudflared

# 2. ?곕꼸 ?쒕퉬???ъ떆??(愿由ъ옄 沅뚰븳)
Restart-Service cloudflared

# 3. ?곕꼸 ?쒕퉬??以묒? 諛??쒖옉
Stop-Service cloudflared
Start-Service cloudflared
```

---

## 5. ?뮕 ?꾩닔 ?좎?蹂댁닔 ?섏튃

1. **硫붿씤 ?뱀궗?댄듃(wavit-studio.com) ?낅┰ ?댁쁺**:
   - 硫붿씤 ?뱀궗?댄듃??Cloudflare Pages瑜??듯빐 湲濡쒕쾶 ?ｌ??먯꽌 ?쒕퉬?ㅻ릺誘濡? **濡쒖뺄 ?몄뒪??PC媛 爰쇱졇 ?덉뼱????긽 ?뺤긽 ?묐룞**?⑸땲??
   - `main` 釉뚮옖移섏뿉 ?몄떆 ??GitHub Actions瑜??듯빐 20~30珥???臾댁쨷???먮룞 諛고룷?⑸땲??
2. **濡쒖뺄 ?몄뒪??PC(VirtualIndex / Schedule Tracker) 愿由?*:
   - 濡쒖뺄 PC媛 ?덉쟾 紐⑤뱶???ㅼ뼱媛硫??곕꼸 ?곌껐???딄린誘濡?**?덉쟾 紐⑤뱶??"????**???좎??댁빞 ?⑸땲??
   - PC ?щ?????`Cloudflared` ?덈룄???쒕퉬?ㅼ? Windows ?묒뾽 ?ㅼ?以꾨윭(`Schedule_Server`, `VirtualIndex_Server`, `VirtualIndex_Collector`)媛 ?먮룞 蹂듭썝?⑸땲??
3. **?ы듃 異⑸룎 ?꾧툑 ?먯튃 (Port Isolation)**:
   - `Schedule Tracker`??諛섎뱶??**?ы듃 3000**???ъ슜?댁빞 ?⑸땲??
   - `VirtualIndex`??諛섎뱶??**?ы듃 3001**???ъ슜?댁빞 ?⑸땲??
   - 媛쒕퀎 ?ㅽ겕由쏀듃?먯꽌 ?꾩껜 `node.exe` ?꾨줈?몄뒪瑜??쇨큵 媛뺤젣 醫낅즺(`taskkill /F /IM node.exe`)?섎뒗 紐낅졊?대? ?ъ슜?섎㈃ ?ㅻⅨ ?곸떆 ?쒕퉬?ㅺ? ?ㅼ슫?섎?濡??덈? 湲덉??⑸땲??

---

## 6. ?좑툘 ?μ븷 ????대젰 (Troubleshooting Log)

### [2026-11-02] `schedule.wavit-studio.com` ?묒냽 ??VirtualIndex媛 ?몄텧?섎뜕 ?μ븷
- **?꾩긽**: `https://schedule.wavit-studio.com/` ?묒냽 ???ㅼ?以??섏씠吏媛 ?꾨땶 VirtualIndex 硫붿씤 ?붾㈃??異쒕젰??
- **?먯씤 遺꾩꽍**:
  1. **Cloudflare Tunnel Ingress ?ㅼ젙 以묐났**: ?곕꼸 ?ㅼ젙?먯꽌 `virtualindex.wavit-studio.com`怨?`schedule.wavit-studio.com`??紐⑤몢 濡쒖뺄 `http://localhost:3000`?쇰줈 ?쇱슦?낅릺?꾨줉 ?ㅼ젙?섏뼱 ?덉뿀??
  2. **?ㅽ겕由쏀듃 ?ы듃 異⑸룎**: `VirtualIndex`???쒖옉 ?ㅽ겕由쏀듃(`start-server.bat`)媛 ?ы듃 `3001`???꾨땶 `3000`?쇰줈 ?ㅽ뻾?섎㈃???ы듃 3000???먯쑀?섎뜕 `schedule-web`??媛뺤젣 醫낅즺?섍퀬 3000???좎젏??
- **?닿껐 議곗튂**:
  1. Cloudflare API瑜??몄텧?섏뿬 ?곕꼸 Ingress ?쇱슦?낆쓣 ?뺤긽 遺꾨━:
     - `schedule.wavit-studio.com` ??`http://localhost:3000`
     - `virtualindex.wavit-studio.com` ??`http://localhost:3001`
  2. `VirtualIndex`??`start-server.bat`, `restart-service.ps1`, `check-status.ps1`???ы듃 `3001` 湲곗??쇰줈 ?꾨㈃ ?섏젙 諛?臾댁감蹂?`taskkill node.exe` ?쒓굅.
  3. `C:\apps\schedule\scripts\start-server.bat` 諛?`start-server.vbs` ?앹꽦 ??Windows ?묒뾽 ?ㅼ?以꾨윭 `Schedule_Server`濡??깅줉?섏뿬 3000 ?ы듃 ?곸떆 ?먮룞 ?ㅽ뻾 蹂듦뎄 ?꾨즺.

