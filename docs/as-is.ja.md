# WebPack Module As-Is

この文書は、`webpack` module の現行 As-Is 挙動を説明します。

## 対象範囲

この文書は、現行実装の module 側に焦点を当てます。

request をどのように受け取り、grouped asset output を `op-unit-webpack` に委譲しているかを説明します。

## 関連 framework 文書

- `asset/docs/op/invariants.ja.md`
- `asset/docs/op/responsibility-boundaries.ja.md`
- `asset/docs/op/common-recipes.ja.md`

## module の役割

現行設計において、`webpack` module は grouped asset response の delivery-side request entry です。

これは file registration list を保持したり、asset aggregation の主処理を行う側ではありません。

代わりに次を担います。

- grouped asset request を受け取る
- 要求された asset type を解決する
- layout 関連の context を準備する
- 実際の grouping と output を `op-unit-webpack` に委譲する

## 現行の entry point

現行の content entry point には次があります。

- `asset/module/webpack/content/js/index.php`
- `asset/module/webpack/content/css/index.php`
- `asset/module/webpack/content/index.php`

## `js` / `css` entry の挙動

`js` と `css` の entry script は現在次を行います。

1. current directory 名から extension を決める
2. その extension に応じて MIME を設定する
3. layout 名を決定する
4. layout config が存在すれば読み込む
5. layout-specific asset directory を register する
6. local directory を register する
7. 引数なしの `OP::Unit()->WebPack()->Auto()` を呼んで最終 grouped output を出力する

つまり module 側は、request URL と WebPack unit の間にある structured adapter として働きます。

## `content/index.php`

`asset/module/webpack/content/index.php` は fallback entry です。

request が `js` や `css` のような認識可能な extension path を指定していない場合、この entry は次を行います。

- MIME を `text/plain` に設定する
- error message を出力する

現行 message:

- `No extension specified: JS / CSS`

## layout-aware な挙動

この module は layout-aware です。

unit に委譲する前に、有効な layout を決定し、次を register します。

- `asset:/layout/<layout>/<extension>/`

さらに次も register します。

- `./`

これは module-local または request-local な asset discovery のためです。

## [DOC-GAP] layout asset 登録の責務境界

current 実装では、webpack module が layout-specific asset directory を自動的に register しています。

これは As-Is の挙動ですが、ONEPIECE Framework のあるべき姿とは異なります。

本来、layout にある `js` / `css` directory は、directory が存在するだけで自動的に pack されるべきではありません。

layout-specific asset は、各 layout が自分の初期化処理や template flow の中で主体的に `WebPack()->Auto()` へ登録するべきです。

pack する unit や中間に入る module が自動登録を行うと、次の問題につながります。

- layout の asset policy が module/unit 側へ漏れる
- 意図しない asset inclusion が起きる
- layout ごとの debugging が難しくなる
- responsibility boundary が曖昧になる

将来的には、webpack module は delivery-side request entry に集中し、layout asset directory の自動登録は layout 側の明示処理へ移すべきです。

## 依存境界

この module は、実際の grouped output 挙動について `op-unit-webpack` に依存します。

現行実装では次の分担です。

- module は request entry と context setup を担当する
- unit は registration state、連結、cache、minify を担当する

## 現行設計の意味

現行の `webpack` module は delivery adapter です。

主な責務は、JS や CSS asset request を、`op-unit-webpack` が最終 response を構築できる controlled な call sequence に変換することです。
