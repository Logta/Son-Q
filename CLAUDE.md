## 開発のススメ

### 基本事項

- ./spotify_playlist_analyzer_spec.md を仕様書として遵守してください
- t-wada の推奨する進め方に従ってください
- ドキュメント: 関数やコンポーネントには JSDoc コメントを必ず追加
- 規約: ハードコードは絶対にしないでください。環境変数や設定ファイルを使用して、柔軟に対応できるようにします。
- TypeScript の型は基本的に interface ではなく type で記載してください

### コードスタイル

- ES6 モジュール構文（import/export）を使用
- 可能な限り分割代入を活用
- 関数名は camelCase、クラス名は PascalCase で統一

### ワークフロー

- 変更完了後は必ず型チェックを実行
  - npm run typecheck
- 全テストではなく単体テストを優先して実行

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
