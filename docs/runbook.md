# 運用手順書（runbook）

一人で長く運用するための手順メモ。困ったときに上から読む。

## 構成の要点

- ソース: GitHub リポジトリ `knkeic25.github.io`
- ビルド・デプロイ: GitHub Actions（`deploy.yml`）→ GitHub Pages
- 監視: UptimeRobot（トップページを5分間隔で確認）
- 依存更新: Dependabot（npm は週1、Actions は月1）

## デプロイが失敗したとき

1. GitHub の Actions タブで失敗したジョブのログを確認する
2. `build` で失敗 → ローカルで `npm ci && npm run build` を実行して再現させる
3. `deploy` で失敗 → Settings > Pages の Source が「GitHub Actions」になっているか確認する
4. 直前の PR が原因なら revert PR を出して、まず本番を戻す
5. 解決したら incident Issue に原因と対策を一言残す

## サイトが表示されないとき

1. https://www.githubstatus.com/ で GitHub 側の障害を確認する
2. Actions の最新デプロイが成功しているか確認する
3. 独自ドメインの場合は DNS と `public/CNAME` を確認する

## 月1メンテ（毎月第1土曜）

- [ ] Dependabot の PR を確認・マージ（AI にレビューさせてから自分で判断）
- [ ] `npm outdated` でメジャー更新の有無を確認し、あれば Issue を立てる
- [ ] Lighthouse を実行し、90 を下回ったカテゴリがあれば Issue を立てる
- [ ] リンク切れチェック
- [ ] この runbook と `CLAUDE.md` が実態と合っているか見直す

## メジャーアップデート（Astro など）

1. 公式のアップグレードガイドを読む
2. 専用ブランチで `npx @astrojs/upgrade` を実行する
3. AI に変更点の要約と影響箇所の洗い出しをさせる
4. `npm run check && npm run build` とプレビューで確認してからマージする
5. 判断した内容を `docs/decisions/` に ADR として残す
