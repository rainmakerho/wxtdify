# WxtDify = WXT + React + LlamaIndex Chat UI + Dify API

使用 WXT + LlamaIndex Chat UI 來實作 呼叫 Dify API 的 Browser Extension

## 功能特色

- 設定 Dify API
- 透過 SidePanel 介面與 Dify 對話

## 使用技術

| 類別         | 技術                                           |
| ------------ | ---------------------------------------------- |
| 擴充開發框架 | [WXT](https://wxt.dev/)                        |
| LLM API      | Dify Agent                                     |
| 對話介面     | [LlamaIndex ChatUI](https://ui.llamaindex.ai/) |
| UI 框架      | React 18                                       |

## 安裝與開發

```bash
npm install
npm run dev
```

## 設定

1. 開啟 Dify API 畫面
2. 開啟 設定 畫面，將 Dify API 畫面中的值，貼到 設定畫面之中

   將 Dify API 畫面中的**API 伺服器**的值，貼到設定畫面中的**Dify API 伺服器 URL**欄位中

   將 Dify API 畫面中的**API 金鑰**的值(如果沒有，請按**建立金鑰**來新增)，貼到設定畫面中的**Dify API 金鑰**欄位中

## 版本紀錄

- v1.0.0：初始發行，支援與 Dify 對話

## 聯絡方式

rainmaker_ho@gss.com.tw
