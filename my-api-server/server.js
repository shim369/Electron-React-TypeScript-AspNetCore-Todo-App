const express = require('express');
const cors = require('cors');

const app = express();
const port = 3003; // APIサーバーのポート

// CORSを有効にする
app.use(cors());

// サンプルデータを提供するエンドポイント
app.get('/api/data', (req, res) => {
    const sampleData = {
        message: 'Hello from the API server!',
        timestamp: new Date().toISOString(),
    };
    res.json(sampleData);
});

// サーバーを起動
app.listen(port, () => {
    console.log(`API server is running at http://localhost:${port}`);
});
