# QRACON 2026 Website 專案地圖

- 查證日期／版本：2026-11-13；分支 `RWD-fixed`，起點 `64696e461fcd24ad1cf3da516a46ed36497fc5d1`
- 目的與工作根目錄：QRACON 2026 官方網站；本 worktree 根目錄。
- 主要入口／模組／資料流：`src/pages/` 組合 Astro 頁面；`src/components/` 提供共用版型與元件；`src/data/` 管理活動內容；`src/scripts/agenda/` 控制議程互動；`src/styles/tokens.css` 與 `global.css` 管理共用樣式。詳見 `docs/frontend-structure.md`。
- 啟動、建置與必要前置條件：Node.js `>=22.12.0`、pnpm `12.3.4`；`pnpm dev` 啟動、`pnpm build` 建置、`pnpm preview` 預覽。依賴已依 lockfile 安裝；本次開發伺服器以 `pnpm dev --host 10.254.0.1 --port 3001` 啟動，Vite 僅允許 `preview.gonets.top` 作為 Host。
- 相關檢查指令：`pnpm check`（Astro 型別／元件檢查）；本次未執行 `pnpm check`、建置或自動化測試。對本機端點與預覽網域的 HTTP 請求均回應 200，未列入白名單的 Host 回應 403；尚未做瀏覽器畫面驗收。
- 部署資訊位置：README 列出正式網站 `https://2026-qracon.entangletech.tw/`；實際發佈環境及流程未在此 worktree 查證。
- 本次相關規範／已知限制：RWD 樣式分散於頁面與元件；議程時間表及場地表格在手機上允許局部橫向捲動。
