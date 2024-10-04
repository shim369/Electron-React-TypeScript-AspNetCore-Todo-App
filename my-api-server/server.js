const express = require("express");
const cors = require("cors");

const app = express();
const port = 3003; // APIサーバーのポート

// CORSを有効にする
app.use(cors());

app.get("/api/todo", (req, res) => {
  const todolist = [
    {
      id: 1,
      category: 1,
      title: "todo1",
      detail: "detail1",
      date: "2024/10/04",
    },
    {
      id: 2,
      category: 2,
      title: "todo2",
      detail: "detail2",
      date: "2024/10/06",
    },
  ];
  res.json(todolist);
});

// サーバーを起動
app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});
