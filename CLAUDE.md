# CLAUDE.md

このファイルは、このリポジトリで作業するAIエージェント（Claude Code など）向けの指示書です。
人間が読んでもプロジェクトの全体像がわかるように書いています。

## プロジェクト概要

Kei のポートフォリオサイト。Astro 製の静的サイトを GitHub Pages（`https://knkeic25.github.io`）で公開する。

目的:
1. 自己紹介と制作物の紹介
2. ローカルLLMベンチマーク結果の公開（ニュースレターへの導線）
3. AIを活用した開発・運用の練習場（このリポジトリの運用自体も学習対象）

## 技術スタック

- Astro（**静的出力のみ**。SSR・アダプタは使わない）
- TypeScript（strict）
- スタイル: Astro の scoped `<style>` と `src/styles/global.css`。CSSフレームワークは導入しない
- コンテンツ: Markdown と Content Collections（`src/content.config.ts` でスキーマ定義）
- パッケージマネージャ: npm（`package-lock.json` を必ずコミットする）

## ディレクトリ構成

```
.
├── CLAUDE.md                  # このファイル
├── README.md
├── astro.config.mjs           # site の設定のみ（base は設定しない）
├── package.json
├── public/                    # favicon、robots.txt、CNAME（独自ドメイン時）
├── src/
│   ├── assets/                # 画像（astro:assets で最適化される）
│   ├── components/            # 再利用コンポーネント（PascalCase.astro）
│   ├── layouts/               # BaseLayout.astro など
│   ├── content/
│   │   ├── projects/          # 制作物（1件1ファイル）
│   │   ├── benchmarks/        # ベンチマーク結果の記事
│   │   └── posts/             # ブログ・技術メモ
│   ├── content.config.ts      # コレクションのスキーマ
│   ├── pages/                 # ルーティング（index, about, projects/, benchmarks/, posts/）
│   └── styles/global.css      # CSS変数（色・余白・フォント）とリセット
├── docs/
│   ├── runbook.md             # 運用手順書
│   └── decisions/             # 設計判断の記録（ADR）
└── .github/
    ├── workflows/             # deploy.yml（本番）、ci.yml（PRチェック）
    ├── dependabot.yml
    ├── pull_request_template.md
    └── ISSUE_TEMPLATE/
```

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー（http://localhost:4321） |
| `npm run build` | 本番ビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果の確認 |
| `npm run check` | 型チェック（`astro check`） |

## 作業ルール

- 作業は **Issue 単位**。1 Issue = 1 ブランチ = 1 PR
- ブランチ名: `feat/`, `fix/`, `chore/`, `docs/` + 短い説明（例: `feat/projects-page`）
- コミットメッセージは Conventional Commits（`feat: 制作物一覧ページを追加`）
- **main へ直接 push しない**。マージは人間（Kei）が行う
- PR を出す前に `npm run build` と `npm run check` が通ることを確認する
- 1 PR の差分は小さく保つ。300行を超えそうなら分割を提案する
- PR 説明には「何を・なぜ・どう確認したか」を書く（テンプレートあり）

## やらないこと

- 相談なしに依存パッケージを追加しない（追加が必要なら理由と代替案を先に提示する）
- SSR化、外部APIの呼び出し、アクセス解析・トラッキングスクリプトの追加
- `.github/workflows/` と `astro.config.mjs` の変更（Issue で明示された場合を除く）
- 秘密情報・個人情報（APIキー、住所、勤務先の詳細など）のコミット
- 既存コンテンツ（`src/content/` 配下の文章）の無断書き換え。誤字修正も提案にとどめる

## コンテンツ規約

各コレクションの frontmatter（スキーマは `src/content.config.ts` が正）:

- **projects**: `title`, `description`, `date`, `tags[]`, `repo?`（URL）, `url?`, `status`（`active` | `archived`）
- **benchmarks**: `title`, `description`, `date`, `models[]`, `hardware`, `harness`, `reproducible`（boolean）
- **posts**: `title`, `description`, `date`, `tags[]`, `draft`（boolean、true はビルド対象外）

ファイル名は `YYYY-MM-DD-slug.md`。日付は JST で書く。

## 品質基準

- 全ページに `title`・`description`・OGP を設定する（`BaseLayout` で一元管理）
- `<html lang="ja">`、セマンティックHTML（`header`/`main`/`nav`/`article`）を使う
- 画像は `astro:assets` の `<Image>` を使い、`alt` を必ず付ける
- キーボードだけで全ページを操作できること
- Lighthouse の全カテゴリで 90 以上を目標にする
- スマホ幅（375px）で横スクロールが出ないこと

## 判断に迷ったら

1. `docs/decisions/` の既存の判断を確認する
2. それでも決まらない場合は、選択肢とトレードオフを示して質問する（推測で進めない）
3. 新しい設計判断をしたら ADR を追加する PR を提案する

## 運用

障害対応・定期メンテの手順は `docs/runbook.md` を参照。
