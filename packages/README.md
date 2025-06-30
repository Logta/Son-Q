# Son-Q Workspace Architecture

このプロジェクトは、明確な境界線を持つマルチパッケージ構成を採用しています。

## パッケージ構成

```
packages/
├── config/          # 🔧 共通設定 (TypeScript, ESLint)
├── types/           # 📝 型定義 (Vanilla JS)
├── api/             # 🔌 データアクセス層 (Vanilla JS + Firebase)
├── queries/         # ⚛️ React Query層 (React + TanStack Query)
└── ui/              # 🎨 UI コンポーネント層 (React + MUI)
```

## 境界線と依存関係

### 1. @son-q/config
- **責任**: 共通設定の管理
- **技術**: TypeScript設定、ESLint設定
- **依存**: なし
- **使用者**: 全パッケージ

### 2. @son-q/types
- **責任**: 型定義の提供
- **技術**: TypeScript型定義のみ
- **依存**: なし
- **使用者**: api, queries, ui

### 3. @son-q/api
- **責任**: データアクセス・ビジネスロジック
- **技術**: Vanilla JavaScript + Firebase SDK
- **依存**: @son-q/types
- **境界線**: Reactに依存しない純粋なJS

### 4. @son-q/queries
- **責任**: リアクティブデータフェッチ
- **技術**: React + TanStack Query
- **依存**: @son-q/api, @son-q/types
- **境界線**: APIレイヤーを呼び出すReact固有のフック

### 5. @son-q/ui
- **責任**: UIコンポーネント
- **技術**: React + Material-UI
- **依存**: @son-q/queries, @son-q/types
- **境界線**: ピュアなReactコンポーネント

## 利点

1. **明確な責任分離**: 各レイヤーが特定の責任のみを持つ
2. **技術境界の強制**: package.jsonで依存関係を制限
3. **再利用性**: 各パッケージを独立してテスト・配布可能
4. **型安全性**: TypeScript設定の統一
5. **ビルド最適化**: 差分ビルドと並列処理

## 開発コマンド

```bash
# 全パッケージのビルド
pnpm build:packages

# 型チェック
pnpm typecheck

# 開発モード
pnpm dev

# クリーン
pnpm clean
```

## ファイル構成例

```
src/
├── components/      # UIコンポーネント (@son-q/ui)
├── hooks/           # React Queryフック (@son-q/queries) 
├── api/             # データアクセス (@son-q/api)
└── models/          # 型定義 (@son-q/types)
```