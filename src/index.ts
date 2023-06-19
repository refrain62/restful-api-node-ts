import express from "express"; // ES2015形式で記載する
const app = express();
const port: number = 3000;

// 型定義
type Member = {
    id: number
    name: string
    team: string
};

// データを定義
const members: Member[] = [{
    id: 1,
    name: "Taro",
    team: "A"
  }, {
    id: 2,
    name: "Jiro",
    team: "B"
  }, {
    id: 3,
    name: "Saburo",
    team: "A"
  }];

console.log("hello");

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World");
});

// パスパラメータを設定しない場合は、全メンバーの情報取得 localhost:3000/members
app.get('/members', (req: express.Request, res: express.Response) => {
    res.status(200).send(JSON.stringify(members));
});

// パスパラメータを設定する場合 localhost:3000/members/2
app.get('/members/:id', (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    const member: Member[] = members.filter((member) => member.id === Number(id));
    res.status(200).send(JSON.stringify(member));
});

app.listen(port, () => console.log(`Example app membersening on port ${port}!`));
