# 03 — 技術棧與工程決策

## 已定案

| 項目     | 選擇                          | 理由                                                                    |
| -------- | ----------------------------- | ----------------------------------------------------------------------- |
| 框架     | **Astro 5.x**                 | 使用者指定。內容型網站最佳解：預設零 JS、島嶼架構讓 3D 只在需要處水合。 |
| 3D       | **Three.js**                  | 使用者指定。                                                            |
| 輸出     | **靜態 (`output: 'static'`)** | 全站無需伺服器邏輯；報名走外部平台。                                    |
| 套件管理 | **pnpm**                      | 磁碟效率與嚴格依賴解析。                                                |
| 語言     | **TypeScript**                | 內容資料需要型別保護（議程、講者結構複雜且會反覆改）。                  |

## 建議採用（待確認，非使用者指定）

| 項目     | 建議                                 | 理由                                                    |
| -------- | ------------------------------------ | ------------------------------------------------------- |
| 樣式     | **原生 CSS + CSS Custom Properties** | 見下方「樣式方案取捨」。                                |
| 圖示     | `@lucide/astro`                      | 編譯期 inline SVG，零執行期成本。                       |
| 圖片     | Astro `<Image />` + sharp            | 自動 WebP/AVIF、尺寸標註防 CLS。                        |
| 部署     | ~~Cloudflare Pages~~                 | 已改 GitHub Pages，見下方「部署與網域」。               |
| 格式化   | Prettier + `prettier-plugin-astro`   | —                                                       |

## ✅ 動效：不用動畫函式庫（定案 2026-09-12）

原本建議的 GSAP + ScrollTrigger 與 Lenis **不採用**。動效規格見 `06-motion.md`，實作只用平台原生能力：

- 捲動敘事只有首屏一段，由干涉場自己的 `uCollapse` 讀捲動位置驅動，不需要時間軸函式庫。
- 狀態與回饋用 CSS transition／keyframes；需要中斷或動態值的（亮牌點燈、收藏數字翻動）用 Web Animations API。
- 換頁連續性用跨文件 View Transitions（`@view-transition`），不支援的瀏覽器照常換頁，零 JS 成本。
- 不做平滑捲動：它會干擾當天用手機查議程的操作手感，也和 reduced-motion 衝突；錨點用原生 `scroll-behavior: smooth`，reduced 時關閉。

## ✅ 樣式方案：原生 CSS + CSS 變數（定案 2026-07-28）

採**選項 A**。理由與取捨紀錄如下，供日後回顧決策依據。

**落地規範**

- `src/styles/tokens.css` 是 design token 的唯一來源，用 `:root` 的 custom properties 定義。
- 全域重置與基礎排印放 `src/styles/global.css`，由 base layout 引入一次。
- 元件樣式一律用 Astro 的 `<style>`（預設 scoped），不寫全域選擇器。
- 需要跨元件共用的樣式模式（如卡片、按鈕），做成元件，不做成 utility class ——
  既然不用 Tailwind，就不要手刻一套半吊子的 utility 系統，那是兩邊的缺點都拿到。
- 命名採 `--color-phase-a` 這類語意化命名，不用 `--color-blue`；
  色彩方向是「相位雙色」，色值可能會換，語意名稱才不會在換色時全站失效。

### 取捨紀錄

**選項 A：原生 CSS + CSS 變數**（採用）

- 優點：無建置額外負擔；design token 就是 CSS 變數，設計師可直接讀懂；
  Astro 的 scoped style 已解決樣式污染；SITCON 同樣選擇這條路且規模相當。
- 缺點：需要自律維護命名規範，沒有工具強制。

**選項 B：Tailwind CSS v4**

- 優點：token 由 config 集中管理；`@theme` 語法與 CSS 變數整合良好；開發速度快。
- 缺點：本站頁面數少（約 6–8 頁）、視覺高度客製、大量自訂動畫與 shader 疊層，
  Tailwind 的邊際效益低；class 字串會讓 3D 疊層區塊的樣板可讀性變差。

**結論**：本站是「少量頁面、高度客製視覺」，不是「大量頁面、重複元件」，
Tailwind 的最大優勢在此不成立。已採 A。

## ✅ 部署與網域：GitHub Pages（2026-11-22 依線上實況回寫）

網域 `qracon.entangletech.tw`，CNAME 指向 `qracon-tw.github.io`。原始碼 repo 是 `QRACON-tw/2026`
（舊網址 `Twcat0503/qracon_web_2026` 會轉址）。同一份 `main` 會建成兩份網站：

| 網址 | 建置與部署 | 觸發 | base path |
| --- | --- | --- | --- |
| `qracon.entangletech.tw/2026/` | 本 repo 的 `.github/workflows/deploy-pages.yml`（Node 24）；同一個 artifact 另建 `QRACON-tw/Qracon2026_Tarot`，掛在 `/2026/tarot/` | push 到 `main`、手動 | `/2026`（`astro.config.mjs` 裡 `ASTRO_BASE_PATH` 的預設值） |
| `qracon.entangletech.tw/` | `QRACON-tw/QRACON-tw.github.io` 的 `.github/workflows/deploy.yml`（Node 22）：挑組織內名稱是四位數年份、公開且開了 Pages 的最新 repo，clone 它的 `main` 來建 | 每 15 分鐘排程（該 revision 已部署過就跳過）、該 repo 的 push、手動 | `/`（`ASTRO_BASE_PATH=/`） |

`/2025/` 是 `QRACON-tw/2025` 的 project site，與本 repo 無關。明年出現 `QRACON-tw/2027` 後，根路徑會自動換成 2027 站。

寫程式與發布時：

- 站內連結與 `public/` 檔案路徑一律經過 `sitePath()`（`src/utils/paths.ts`），或用 `astro:assets` import。
  寫死 `/images/...` 在根路徑看起來正常，在 `/2026/` 底下會 404。
- 兩個 workflow 都跑 `pnpm install --frozen-lockfile`，改依賴要一併提交 `pnpm-lock.yaml`。
- 合併進 `main` 後，`/2026/` 由本 repo 的 workflow 直接部署；根路徑要等下一輪排程，GitHub 排程忙時還會延後。
  急著更新就到 `QRACON-tw.github.io` 手動執行 workflow（手動觸發一定會部署）。

已知問題：兩份都可被索引、canonical 各自指向自己，搜尋引擎會看到兩份相同內容，見 `05-open-questions.md` Q11。

已停用：Cloudflare Pages（`qracon-web-2026.pages.dev`）與 `2026-qracon.entangletech.tw`。2026-11-05 曾在那裡上線，
2026-11-22 查詢時兩個名稱都已沒有 DNS 記錄。`public/_headers` 是當時給 `*.pages.dev` 加 noindex 的設定，
GitHub Pages 不會讀它，只會把它當一般檔案公開在 `/_headers`。

## Three.js 使用紀律（硬性）

1. **不進首屏關鍵路徑**：3D 元件用 Astro `client:visible` 或 `client:idle`，
   絕不用 `client:load`。three 的 bundle 動態 import。
2. **必有 fallback**：WebGL 不可用、`prefers-reduced-motion: reduce`、
   低階裝置（`navigator.hardwareConcurrency <= 4` 或行動裝置）→ 顯示靜態主視覺圖。
   Fallback 圖必須是設計過的成品，不是「3D 的截圖」。
3. **預算**：3D 相關 JS gzip 後 **≤ 250 KB**；模型檔（若有）用 Draco 或 meshopt 壓縮，
   **≤ 1.5 MB**。超標就簡化場景，不要加載入動畫掩蓋。
4. **離開視窗即停**：`IntersectionObserver` 停掉 render loop，避免背景吃電。
5. **不用 3D 承載必要資訊**：任何只有轉動 3D 才看得到的文字或路徑資訊，都是設計錯誤。

## 效能預算（Lighthouse 行動版）

| 指標                    | 目標               |
| ----------------------- | ------------------ |
| LCP                     | ≤ 2.5s             |
| CLS                     | ≤ 0.1              |
| INP                     | ≤ 200ms            |
| 首屏 JS（不含 3D 島嶼） | ≤ 50 KB gzip       |
| Performance 分數        | ≥ 90（3D 頁 ≥ 80） |

## 規劃中的目錄結構

```text
src/
├── components/       # 元件；3D 相關獨立放 components/three/
├── data/             # 內容資料（TS，型別化）：sessions, speakers, sponsors, faq
├── layouts/          # 頁面骨架
├── pages/            # 路由
├── styles/           # tokens.css（唯一 token 來源）、global.css
├── types/            # 共用型別
└── utils/
public/
├── fonts/            # 自架字型（subset 後）
└── models/           # 3D 資產
```

## 待決事項

- ~~報名平台~~ 已定 KKTIX（外站連結，不需 embed）。
- 是否需要中英雙語。若需要，**必須在 P2 骨架階段就導入 i18n**，
  後補的成本是重寫所有樣板（SITCON 就卡在這裡）。
- ~~網域~~ 已定 `qracon.entangletech.tw`（GitHub Pages），見「部署與網域」。
