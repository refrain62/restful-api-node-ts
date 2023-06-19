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

