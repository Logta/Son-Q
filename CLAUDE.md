# Son-Q プロジェクト開発ガイド

## 🎯 プロジェクト概要

**Son-Q** は Quiz/Survey アプリケーションです。ユーザーがプロジェクトを作成し、質問を設定し、回答を収集して結果を分析できるWebアプリケーションです。

### 技術スタック
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **UI**: Tailwind CSS + Headless UI (Material-UIから移行中)
- **State Management**: Zustand + TanStack Query
- **Backend**: Firebase (Firestore)
- **Monorepo**: pnpm workspaces
- **Testing**: Vitest + jsdom
- **Linting/Formatting**: Biome

### アーキテクチャ
```
Son-Q/
├── packages/           # 共通パッケージ群
│   ├── api/           # Firebase API層
│   ├── queries/       # TanStack Query hooks
│   ├── types/         # TypeScript型定義
│   ├── ui/            # 共通UIコンポーネント
│   ├── utils/         # ユーティリティ関数
│   └── config/        # 設定ファイル
├── src/               # メインアプリケーション
│   ├── components/    # コンポーネント
│   │   ├── containers/  # State管理コンテナ
│   │   ├── organisms/   # 複合コンポーネント
│   │   └── pages/       # ページコンポーネント
│   ├── hooks/         # カスタムフック
│   └── stores/        # Zustand ストア
└── pages/             # Next.js ページ

```

## 🔧 開発ルール

### 基本方針
- **型安全性**: TypeScript型は `type` で定義（`interface` 禁止）
- **コンポーネント設計**: `class` 禁止、関数コンポーネントのみ
- **非同期処理**: `<Suspense>` コンポーネント活用必須
- **ドキュメント**: JSDoc コメントを日本語で記載
- **設定値**: ハードコード禁止、環境変数・設定ファイル使用

### コーディング規約
- ES6 モジュール構文（import/export）
- 分割代入を積極活用
- 関数名: camelCase、型名: PascalCase

### State管理アーキテクチャ
- **Client State**: Containers層でZustandを使用（UI状態、認証状態、通知機能）
- **Server State**: TanStack Query を pages/organisms層で直接使用
- **データフェッチング**: TanStack Query必須、useStateやuseEffectでの手動管理禁止
- **ローディング状態**: Suspenseコンポーネントで宣言的に管理

## 🚀 開発ワークフロー

### セットアップ
```bash
pnpm install                 # 依存関係インストール
pnpm next:dev               # 開発サーバー起動
```

### 開発コマンド
```bash
# ビルド
pnpm build                  # 全体ビルド
pnpm packages:build         # パッケージのみビルド

# 型チェック・Lint
pnpm tsc                    # 型チェック（必須）
pnpm packages:typecheck     # パッケージ型チェック
pnpm biome:lint             # Lint実行
pnpm biome:format           # フォーマット

# テスト
pnpm test                   # テスト実行
pnpm test:coverage          # カバレッジ測定
```

### 変更後の必須チェック
1. `pnpm tsc` で型チェック
2. 関連する単体テスト実行
3. `pnpm biome:lint` でLint確認

## 🔨 最重要ルール - 新しいルールの追加プロセス

ユーザーから今回限りではなく常に対応が必要だと思われる指示を受けた場合：

1. 「これを標準のルールにしますか？」と質問する
2. YES の回答を得た場合、CLAUDE.md に追加ルールとして[Append Rules]に記載する
3. 以降は標準ルールとして常に適用する

このプロセスにより、プロジェクトのルールを継続的に改善していきます。

## Append Rules

- frontend に関して
  - TypeScript の型は type で記述すること
  - class の利用は禁止
- React では<Suspense>コンポーネントを活用すること
- コメントは日本語で記載すること
- State管理のアーキテクチャ
  - ContainersはClient State（UI状態、認証状態、通知機能）のみを管理する
  - Server State（APIデータ）はpages層やorganisms層でTanStack Queryフックを直接使用する
  - データフェッチングには必ずTanStack Queryを使用し、useStateやuseEffectでの手動管理は避ける
  - Suspenseコンポーネントを活用してローディング状態を宣言的に管理する
