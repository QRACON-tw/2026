# QRACON 2026 官網
這是 QRACON 2026 的官方網站，參考了 [SITCON 2026](https://sitcon.org/2026/) 的設計風格與3D會場地圖概念，同時參考了 QRACON2025 的內容與文案進行填充。

# 網站
https://2026-qracon.entangletech.tw/

# 技術站
- Astro
- Three.js (Maybe 如果時間夠跟搓的出來3D會場圖的話)

## 開發文件

- [前端程式碼導覽](docs/frontend-structure.md)

## 年度入口部署通知

此 repository 的 `main` 每次收到新 commit 時，`.github/workflows/notify-website-deploy.yml` 會通知 `QRACON-tw/qracon-tw.github.io` 重新部署年度入口，也可以手動執行通知 workflow。請在本 repository 的 Actions secrets 新增 `PAGES_DISPATCH_TOKEN`：使用只授權 `QRACON-tw/qracon-tw.github.io`、具 repository `Contents: write` 權限的 fine-grained personal access token。token 缺少或權限不足時，通知 workflow 會失敗並在 Actions log 說明。
