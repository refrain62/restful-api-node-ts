import express from "express"; // ES2015形式で記載する
const app = express();
const port = 3000;

console.log("hello");

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.listen(port, () => console.log(`Example app membersening on port ${port}!`));
