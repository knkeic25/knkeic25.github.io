// @ts-check
import { defineConfig } from 'astro/config';

// リポジトリ名を knkeic25.github.io にする前提なので base は設定しない。
// 別名のリポジトリで公開する場合は base: '/<repo-name>' を追加し、内部リンクを base 付きにする。
export default defineConfig({
  site: 'https://knkeic25.github.io',
  trailingSlash: 'ignore',
});
