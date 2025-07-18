# Son-Q 🎵

**音楽で繋がる推理ゲームプラットフォーム**

Son-Q は、音楽を通じたコミュニケーションをゲーミフィケーションした革新的な Web アプリケーションです。参加者が持ち寄った楽曲の選曲者を推理するゲームを通じて、新しい音楽との出会いと仲間との交流を促進します。

## 🌟 主な機能

### ゲーム機能

- **プロジェクト管理**: ゲーム単位でのプロジェクト作成・管理
- **楽曲投稿**: YouTube リンクを活用した楽曲の投稿
- **推理ゲーム**: 楽曲選曲者の当てっこゲーム
- **多様な採点モード**:
  - 通常モード
  - 独占正解ボーナス
  - 独占不正解ペナルティ
  - 被正解数ベース
- **リアルタイム結果**: 詳細な得点計算とランキング表示

### ユーザー機能

- **認証システム**: Firebase Authentication による安全なログイン
- **プロジェクト招待**: 参加者の招待・管理機能
- **結果共有**: ゲーム結果の確認と感想共有

## 🛠 技術スタック

### フロントエンド

- **React 19.1.0** - モダンな UI 構築
- **Next.js 15.3.4** - フルスタック React フレームワーク
- **TypeScript 5.8.3** - 型安全な開発
- **Material-UI 7.1.2** - 一貫性のあるデザインシステム
- **Emotion** - CSS-in-JS スタイリング
- **TanStack Query 5.62.11** - 効率的なサーバーステート管理

### バックエンド・インフラ

- **Firebase**
  - Authentication - ユーザー認証
  - Firestore - NoSQL データベース
  - Hosting - 静的サイトホスティング
- **Vercel** - Next.js に最適化されたデプロイメント環境

### 開発・テストツール

- **pnpm** - 高速なパッケージマネージャー
- **Vitest** - 高速なテストランナー
- **Biome** - 統一されたリンター・フォーマッター
- **TypeScript** - 静的型チェック

## 📁 プロジェクト構造

```
Son-Q/
├── src/                           # メインアプリケーション
│   ├── components/
│   │   ├── atoms/                 # 基本UIコンポーネント
│   │   ├── molecules/             # 複合UIコンポーネント
│   │   ├── organisms/             # 機能的UIコンポーネント
│   │   ├── pages/                 # ページレベルコンポーネント
│   │   └── containers/            # 状態管理コンテナ
│   └── contexts/                  # React Context
├── pages/                         # Next.jsページルーティング
├── packages/                      # モノレポパッケージ
│   ├── api/                      # Firebase API層
│   ├── queries/                  # TanStack Query設定
│   ├── types/                    # 共通型定義
│   ├── ui/                       # 再利用可能UIコンポーネント
│   ├── utils/                    # ユーティリティ関数
│   └── config/                   # 設定ファイル
└── public/                       # 静的アセット
```

## 🚀 セットアップ・開発

### 前提条件

- Node.js 24.3.0
- pnpm (推奨パッケージマネージャー)
- mise (環境管理ツール) - [インストール方法](https://mise.jdx.dev/getting-started.html)

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-username/Son-Q.git
cd Son-Q

# miseを使用してNode.js環境をセットアップ
mise setup
```

#### Volta を使用する場合（代替方法）

Volta を既に使用している場合は、そのまま利用可能です：

```bash
# Voltaが自動的にNode.js 24.3.0とnpm 11.4.2をセットアップします
pnpm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動（パッケージビルド込み）
mise run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

### その他の便利なコマンド

#### mise タスクを使用する場合（推奨）

```bash
# 利用可能なタスクを確認
mise tasks

# 開発
mise run dev            # 開発サーバー起動（パッケージビルド込み）
mise run dev:clean      # クリーンな状態で開発サーバー起動
mise run start          # プロダクションサーバー起動

# テスト
mise run test           # テスト実行（watch mode）
mise run test:ui        # テストUI表示
mise run test:run       # テスト単発実行
mise run test:coverage  # カバレッジ付きテスト

# コード品質
mise run check          # 全体チェック（typecheck + biome check）
mise run check:ci       # CI用チェック（typecheck + biome ci）
mise run lint           # リント実行
mise run lint:fix       # リント自動修正
mise run format         # フォーマット実行
mise run format:check   # フォーマットチェック
mise run typecheck      # 型チェック（packages + root）

# ビルド・クリーン
mise run build          # プロダクションビルド（packages + next）
mise run clean          # 全クリーン（packages + next + cache）
mise run clean:packages # パッケージのみクリーン
mise run clean:next     # Next.jsのみクリーン

# セットアップ
mise run setup          # 初期セットアップ
mise run ci             # CI検証（check:ci + test:run）
```

#### pnpm を直接使用する場合

```bash
# テスト実行
pnpm test

# テストUI表示
pnpm test:ui

# リント・フォーマット
pnpm lint
pnpm format

# 型チェック
pnpm typecheck

# プロダクションビルド
pnpm build
```

## 🎮 使い方

### 1. プロジェクト作成

1. アカウント作成・ログイン
2. 「新しいプロジェクト」から新規プロジェクトを作成
3. プロジェクト名と参加者の設定

### 2. 楽曲投稿

1. 作成したプロジェクトで「楽曲を投稿」
2. YouTube リンクと楽曲情報を入力
3. 参加者全員が楽曲を投稿

### 3. 推理ゲーム

1. 全員の投稿完了後、推理フェーズが開始
2. 各楽曲に対して選曲者を推理
3. 全回答完了後、結果発表

### 4. 結果確認

- 得点とランキングの確認
- 各楽曲の正解発表
- 感想やコメントの共有

## 🧪 テスト

プロジェクトでは Vitest を使用した包括的なテストスイートを実装しています：

```bash
# 全テスト実行
pnpm test

# 特定ファイルのテスト
pnpm test CalculationPoint

# カバレッジ付きテスト
pnpm test --coverage
```

## 📊 アーキテクチャ

### 状態管理

- **Client State**: React Context + Containers 層
- **Server State**: TanStack Query + Suspense
- **UI State**: ローカル state（useState）

### データフロー

1. **pages/** - ルーティングとページレベルの構成
2. **containers/** - 状態管理とビジネスロジック
3. **organisms/** - 複雑な UI 機能
4. **molecules/atoms/** - 再利用可能な UI コンポーネント

### パッケージ依存関係

```
app → queries → api → types
app → ui → types
app → utils
```

## 🔒 セキュリティ

- Firebase Authentication による安全な認証
- Firestore Security Rules によるデータアクセス制御
- 環境変数による機密情報の管理
- TypeScript による型安全性の確保

### 開発ガイドライン

- TypeScript の型は `type` で記述
- ES6 モジュール構文を使用
- 関数名は camelCase、クラス名は PascalCase
- JSDoc コメントの追加
- テストの作成
- `pnpm typecheck` の実行

---

**Son-Q で音楽を通じた新しいコミュニケーションを体験してください！** 🎵✨
