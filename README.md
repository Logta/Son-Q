This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 使用言語、フレームワーク

## 使用言語

- JavaScript(TypeScript)

## フレームワーク

- React
- Next.js

## インフラ

- Firebase
- Vercel


# 環境構築に必要な手順

## パッケージのインストール

パッケージを yarn を利用して導入する

yarnを導入した後に
```
yarn install
```
を実行

## ローカル環境の立ち上げ

```bash
yarn dev
```
http://localhost:3000 にアクセスする

# インフラ・フロントそれぞれの技術選定

## インフラ

- Firebase
  - authを導入するため
  - FireStoreにてNoSQLかつWhereなどの複雑なクエリーを実行できるDBを利用するため
  
- Vercel
  - Next.jsのデプロイ環境として最も簡単に利用できるため

## フロント

- TypeScript

  - 静的型システムを導入することでエラーを抑止

- React

  - リファレンスの多いフレームワークであるため
  - TypeScript と相性が良いため

# 実装した機能

- ログイン、ログアウト
- ゲームのプロジェクトの作成、確認、編集
- ゲームのプロジェクトの課題設定、確認、更新
- ゲームのプロジェクトの回答設定、確認、更新
- ゲーム結果の確認

# このソースコードで公開しているアプリはどんなサービス内容か

**曲を他人に布教する行為のゲーミフィケーション**

- ゲームの情報はプロジェクト単位で管理されている
- ゲームの開催者はプロジェクトを作成する
  - 参加者を作成したプロジェクトに招待する 
- 参加者によって持ち寄られた曲の選曲者が参加者のうち誰かを当てる
- 結果を確認し、感想を言い合う
