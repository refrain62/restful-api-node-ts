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


