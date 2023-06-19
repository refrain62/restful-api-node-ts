import express from "express"; // ES2015形式で記載する
const app = express();
const port = 3000;

// 簡易的にデータを定義
const members = [{
    id: "1",
    name: "Taro",
    team: "A"
  }, {
    id: "2",
    name: "Jiro",
    team: "B"
  }, {
    id: "3",
    name: "Saburo",
    team: "A"
  }];

console.log("hello");

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

// パスパラメータを設定しない場合は、全メンバーの情報取得 localhost:3000/members
app.get('/members', (req, res) => {
    res.status(200).send(members);
});

// パスパラメータを設定する場合 localhost:3000/members/2
app.get('/members/:id', (req, res) => {
    const id = req.params.id;
    const member = members.filter((member) => member.id === id);
    res.status(200).send(member);
});

app.listen(port, () => console.log(`Example app membersening on port ${port}!`));
