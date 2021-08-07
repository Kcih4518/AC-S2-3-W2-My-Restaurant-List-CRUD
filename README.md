# Restaurant List

使用 Node.js + Express + express-handlebars + passport.js +mongoDB 打造的餐廳清單網頁。

## Getting Started

本專案已經設定 npm script, 因此可以直接透過 npm install 與 npm run 的方式來執行。

### Development environment

| Package            | Version  |
| ------------------ | -------- |
| mac Big Sur        | 11.4     |
| VS code            | 1.57.1   |
| Node.js            | v14.17.1 |
| Nodemon            | 2.0.7    |
| Express            | 4.17.1   |
| Express-handlebars | 5.3.2    |
| Mongoose           | 5.13.2   |
| MongoDB            | 4.2.5    |
| method-override    | 3.0.0    |
| standard           | 16.0.3   |
| passport           | 0.4.1    |
| passport-local     | 1.0.0    |
| passport-facebook  | 3.0.0    |
| dotenv             | 10.0.0   |
| bcryptjs           | 2.4.3    |
| connect-flash      | 0.1.1    |

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
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。
- 如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息。
- 使用者也可以透過 Facebook Login 直接登入。
- 使用者必須登入才能使用餐廳清單，如果沒登入，會被導向登入頁面。
- 使用者登入後，可以建立並管理專屬自己的一個餐廳清單
- 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息。
- 使用者的密碼使用 bcrypt 來處理。

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
