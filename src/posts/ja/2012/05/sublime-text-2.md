---
layout: post
lang: ja
title: Sublime Text 2 のススメ
date: 2012-05-07
updated: 2012-05-07
tags: 
  - Sublime Text 2
---

皆さんはコーディングの際、どのエディタを使っていますか？僕はもっぱら Terminal で vim ゴリゴリ派だったのですが、人によっては Emacs だったり、Mac のアプリだと Coda とか TextMate が人気でしょうか。最近だと WebStorm とか Komodo Edit 辺りも人気あると聞きます。手に馴染んだエディタがあると、なかなか変える気にならないですよね。そんな中で僕が最近本気で使い始めているのが、最近海外のフロント系エンジニアの間で人気が高まっている [Sublime Text 2](http://www.sublimetext.com/) というエディタです。今日はこの Sublime Text 2 ( 以下 ST2 ) を紹介してみます。

## Sublime Text 2 の魅力

僕の場合、vim がすっかり手に馴染んでしまっていたので、乗り換える必要性を強くは感じていなかったのですが、やはりプロジェクト単位で作業する場合は、左側にプロジェクトのファイル一覧が表示されてたりすると便利ですよね ( <a href="http://www.vim.org/scripts/script.php?script_id=1658" target="_blank">NERD tree</a> は試したのですが、なかなか使い方が覚えられず、断念してしまいました。)。タブでファイルを複数開いておくとか、日本語も十分対応してくれてる必要があります。何よりも vim と同じ操作で使えることも、僕にとっては超重要でした。そんな条件でいくつか試していた中で、たまたま同僚がまとめて購入するからというので使い始めたのが、ST2 です。

ST2 のサイトに書いてあるウリはこんな感じ：

* シンプルで高速なインターフェース
* ミニマップで全体像を把握
* テキストのマルチセレクトが可能
* マクロを使った操作の自動化が可能

しかしながら、ぶっちゃけどれも僕には響きませんでした。そもそもウリの魅力が理解できないだけでなく、GUI で設定の変更もできないし、正直なところ何が人気の秘密なのかすぐには分からず、vim モードで使えてるからまあいいかー程度で使っていました。しかし [Sublime Package Control](http://wbond.net/sublime_packages/package_control) を入れてから、段々これにハマり始めています。

Package Control を入れてできるようになったことは、例えば

* LESS のコンパイル (？) がショートカットキーひとつでできるようになる (からやっと LESS を使い始めた)
* git コマンドがエディタ内から打てるようになった
* HTML タグの補完をしてくれるようになった
* CDN の URL を簡単に入力できるようになった

など。これだけで魅力的に感じる人もいるかもしれません。Package Control はエディタ内でレポジトリからプラグインを手軽にインストールできるプラグインで、TextMate 互換、かつ Python で書くことができます。

ST2 に魅力を感じた人は、早速<a href="http://www.sublimetext.com/" target="_blank">インストール</a>してみましょう。お試しはもちろん無料で出来ますし (時間制限付き？)、購入する場合は $59 です。

## Sublime Text 2 の便利な使い方

英語ですが、既に[素敵なまとめ記事](http://net.tutsplus.com/tutorials/tools-and-tips/sublime-text-2-tips-and-tricks/)がありますので、そこから拝借 + ちょっと味付けして、僕がグッときた Tips をいくつか紹介しましょう。

### コマンドパレット (Command Pallet) を使う

TextMate と同様、ST2 では `Command + Shift + p` でコマンドパレットを開くことができます。コマンドパレット上でタイプすると絞りこまれていくので、必要なコマンドを選択して実行できます。

### Package Control をインストールする

何はともあれこれ。これを入れることで ST2 は比較にならないくらいパワーアップしま
す。インストールするには ``Control + ` ``、日本語キーボードの場合 `Control +
Shift + @` を押すと、画面下にコンソールが開きますので、下記のコマンドをコピペし
て入力します。

```python
import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
```

実行後再起動すれば、Package Control が使えるようになります。コマンドパレットを開き、`install` と入力すると、レポジトリからパッケージのリストが読みこまれ、好きなものをインストールできるようになります。

### Vim モードを有効にする

メニューの Preferences から Settings - Default を選択すると Preferences.sublime-settings というファイルが開きますので、一番下の `"ignored_packages": [“Vintage”]` の部分を `"ignored_packages": []` に変更して保存します。これで Vim 互換モードが利用できるようになります (あくまで互換なので、完璧ではないです。徐々に改善している模様) 。

### スニペットを活用する

まだ自分でどうやって作るかなどまで掘り下げられてないですが、必要に応じて各種 Snippet のパッケージをインストールすることで、手軽に定型の文字列を入力することができるようになります。例えば `li` と入力してタブキーを押せば、

```html
<li><a href="" title=""></a></li>

li
```

と表示されて、タブを押すごとに必要な属性値を補完していくことができます。利用できるスニペットはコマンドパレットで `snippet` と入力することで確認できます。

### おすすめパッケージ

僕が気に入って使ってるパッケージは以下の通り

* LESS-build (要 node.js ですが、`Command + b` だけで`.less`のファイルを`.css`にコンパイルしてくれます)
* HTML5
* Git
* cdnjs
* SFTP
* Tag
* SublimeCodeIntel
* Nuttuts+Fetch (自分で作ったプロジェクトテンプレートセットをさくっと組み込んでコーディングが開始できます)
* Terminal (今のディレクトリで Terminal を開いてくれます)

他にも[たくさんパッケージ](http://wbond.net/sublime_packages/)があるので、チェックしてみてください。

## コミュニティ

最後にこの ST2 ですが、日本ではまだまだユーザーが少ないようで、日本語の情報はあまり多くありません。Chrome の Google API Expert である [@yoshikawa_t](http://twitter.com/yoshikawa_t) さんが [Google Group](https://groups.google.com/forum/?fromgroups#!forum/sublime-text-japan-users-group) を作ってくれていますので、興味のある方はぜひそちらで情報交換をしましょう。他にもいくつか有益なリンクを載せておきます。

* [One Weekend with Sublime Text 2](https://gist.github.com/3f430d09855b54ae32ee)
* [Sublime Text 2 のカスタマイズ](http://ready-study-go.blogspot.jp/2011/09/sublime-text-2.html)
* [プログラミングエディタ Sublime Text2 を使ってみよう！](http://d.hatena.ne.jp/mizchi/20111021/1319167480)
