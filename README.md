# REST-APIを作ってみる（Node.js + Express + TypeScript編）
https://bunsugi.com/rest-api-node-express-typescript の写経

## Node.jsのプロジェクトを作成
```
$ npm init -y
```

## TypeScriptの準備
TypeScript用のモジュールをインストール
```
$ npm install typescript --save-dev
$ npm install @types/node --save-dev
$ npm install ts-node --save-dev
```

# tsconfig.json ファイルを作成する
```
＄ npx tsc --init

Created a new tsconfig.json  with: TS 
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig
```

# tsconfig.jsonを編集する
moduleはES2015に書き換える。
```
{
  "compilerOptions": {
    "target": "ES2015",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "ES2015",                                /* Specify what module code is generated. */
    "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  },
}
```

# ESLintの設定
コードチェック用に ESLintをインストールし、.eslintrc.jsonファイルを生成する
```
$ npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
$ npm init @eslint/config
```
設定は以下の通り
```
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm ※JavaScript
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes ※Yesを選択
√ Where does your code run? · browser
√ What format do you want your config file to be in? · JSON
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
√ Would you like to install them now? · No / Yes ※Noを選択
Successfully created .eslintrc.json file in C:\develop\github\_restful-api-node-ts\restful-api-node-ts
```

# npm run コマンドの設定
package.jsonにコンパイルコマンドを追加
```
  "scripts": {
    "dev": "ts-node index.ts",
    "build": "webpack",
    "watch": "webpack -w",
    "serve": "node dist/main.js"
  },
```

# webpackの設定
TypeScirptはソースコードのまま実行できないので、JavaScriptにコンパイルする必要がある。  
TypeScriptからもstcコマンドが用意されているが、今回はwebpackを使って、ソースコードを１つのJavaScriptファイルにまとめてくれるモジュールを利用する。  
  
基本的にwebpackはJavaScriptのソースコードをまとめることしかできないが、ローダーと呼ばれる機能を使うとほかの言語にも対応できる。  
今回は、ts-loaderを利用することでTypeScriptにも対応する。  
```
$ npm i -D webpack webpack-cli ts-loader 
```

# webpack-configを作成
webpackコマンドにてソースコードをまとめる際の設定をする  
webpack.config.js
```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ]
  },
};
```

# Expressモジュールをインストール
Node.jsにはHTTPを受け付けるサーバーを立てるための人気モジュールとしてExpressがある。

```
$ npm install express
```
TypeScriptで Expressを使うためのモジュールをインストールする
```
$ npm install @types/express --save-dev
```

# ひとまずビルド・サーブできることを確認する
```
$ mkdir ./src
$ touch ./src/index.ts
```
ビルド・サーブしてみる
```
$ npm run build
$ npm run serve
```
結果
```
hello
Example app membersening on port 3000!
```

# オブジェクトを返却する
オブジェクトとして、メンバーのリストを返却するAPIを作成する
【仕様】  
・パスパラメータ無しでアクセスされた場合、全メンバーの情報リストを返却する。  
・パスパラメータがにメンバーIDを入れた場合、該当するメンバーIDの情報を返却する。  

【結果】
```
http://localhost:3000/members
[{"id":"1","name":"Taro","team":"A"},{"id":"2","name":"Jiro","team":"B"},{"id":"3","name":"Saburo","team":"A"}]


http://localhost:3000/members/2
[{"id":"2","name":"Jiro","team":"B"}]
```
