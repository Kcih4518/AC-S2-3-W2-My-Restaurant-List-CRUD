# Restaurant List

使用 Node.js + Express + express-handlebars + mongoDB 打造的餐廳清單網頁。

## Getting Started

本專案已經設定 npm script, 因此可以直接透過 npm install 與 npm run 的方式來執行。

### Development environment

| Package            | Version  |
| ------------------ | -------- |
| mac Big Sur        | 11.4     |
| VS code            | 1.57.1   |
| Node.js            | v14.17.1 |
| Npm                | 7.19.0   |
| Nvm                | 0.34.0   |
| Nodemon            | 2.0.7    |
| Express            | 4.17.1   |
| Express-handlebars | 5.3.2    |
| Mongoose           | 5.13.2   |
| MongoDB            | 4.2.5    |
| method-override"   | 3.0.0"   |
| standard"          | 16.0.3"  |

### Description

- 使用者可以瀏覽全部所有餐廳 : 餐廳照片、餐廳名稱、餐廳分類、餐廳評分
- 使用者可以點擊餐廳卡片下方按鈕進行更多操作 : 編輯、查看、刪除
- 使用者可以再點進去看餐廳的詳細資訊：名稱、類別、地址、電話、描述、圖片
- 使用者可以透過搜尋餐廳名稱來進行搜尋
- 使用者可以透過搜尋餐廳類別來進行搜尋
- 使用者可以點擊畫面右上角的 + 新增一家餐廳
- 使用者可以點擊畫面右下角的 back 返回餐廳列表
- 使用者未輸入就搜尋時會進行提醒
- 使用者未使用空格搜尋時會進行提醒
- 使用者搜尋不到餐廳時會進行提醒
- 使用者新增餐廳電話需符合提示的格式
- 使用者可以選擇排序方式: A-Z, Z-A, 類別， 地點

### Installing

1. 透過 https 取得此專案

```bash
$ git clone https://github.com/Kcih4518/AC-S2-3-W2-My-Restaurant-List-CRUD.git
```

2. 安裝 node module

```bash
$ cd AC-S2-3-W2-My-Restaurant-List-CRUD
$ npm install
```

3. 載入 Restaurants Seeds

本專案需在 local 建立 MongoDB 並且使用預設 port 27017。

```bash
$ npm run seed
```

4. 透過 npm 在 local 啟動 web server

```bash
$ npm run dev
Express is running on http://localhost:3000
```

5. 透過 Browser 打開 [http://localhost:3000](http://localhost:3000)

![](https://i.imgur.com/rmOjchP.png)
