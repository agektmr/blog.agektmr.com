---
layout: post
lang: en
title: Recommendation for Sublime Text 2
description:
date: 2012-05-07
updated: 2012-05-07
tags:
  - Sublime Text 2
translationOf: /2012/05/sublime-text-2.html
translated: 2025-11-30
translatedManually: false
---
What editor do you use when coding? I've always been a big fan of vim in Terminal, but some people prefer Emacs, and Mac apps like Coda and TextMate are popular. I've heard that WebStorm and Komodo Edit are also popular these days. Once you find an editor you're comfortable with, it's hard to feel like switching. Recently, I've started using an editor called [Sublime Text 2](http://www.sublimetext.com/), which has recently become popular among front-end engineers overseas. Today, I'd like to introduce Sublime Text 2 (hereafter referred to as ST2).

The appeal of Sublime Text 2

In my case, I was already completely accustomed to using vim, so I didn't feel a strong need to switch. However, when working on a project-by-project basis, it's convenient to have a list of project files displayed on the left side. (I tried <a href="http://www.vim.org/scripts/script.php?script_id=1658" target="_blank">NERD tree</a>, but I couldn't quite figure out how to use it, so I gave up.) It also needed to be able to open multiple files in tabs and to have sufficient support for Japanese. Above all, it was extremely important to me that it could be used in the same way as vim. After trying out a few options, I started using ST2 when a colleague happened to be buying it in bulk.

Here's what the ST2 website has to say about it:

* Simple and fast interface
* Minimap for a complete overview
* Multi-select text
* Automate operations with macros

However, to be honest, none of them appealed to me. Not only did I not understand their appeal, but I couldn't change the settings using a GUI, and to be honest, I didn't immediately understand the secret to their popularity. I just thought it was okay because I could use it in vim mode. However, after installing [Sublime Package Control](http://wbond.net/sublime_packages/package_control), I've gradually become addicted to it.

What you can do with Package Control is, for example:

* Compiling LESS (?) can now be done with a single keyboard shortcut (which is why I finally started using LESS)
* Git commands can now be typed from within the editor
* HTML tag completion has been added
* CDN URLs can now be easily entered

This alone may be appealing to some people. Package Control is a plugin that allows you to easily install plugins from repositories within the editor, is TextMate compatible, and can be written in Python.

If you are interested in ST2, try installing it now. You can try it for free (with a time limit?), or purchase it for $59.

## Useful ways to use Sublime Text 2

There is already a [great summary article](http://net.tutsplus.com/tutorials/tools-and-tips/sublime-text-2-tips-and-tricks/) in English, so I'll borrow from there and add a little flavor to it to introduce some of the tips that really stood out to me.

### Using the Command Pallet

Like TextMate, ST2 allows you to open the command palette with `Command + Shift + p`. As you type in the command palette, it will filter the options so you can select and run the command you need.

### Install Package Control

First of all, this is it. Installing it will give ST2 an incomparable power boost. To install it, press ``Control + ` ``、日本語キーボードの場合 `Control +
Shift + @` を押すと、画面下にコンソールが開きますので、下記のコマンドをコピペし
て入力します。

__CODE_BLOCK_0__

実行後再起動すれば、Package Control が使えるようになります。コマンドパレットを開き、`install` と入力すると、レポジトリからパッケージのリストが読みこまれ、好きなものをインストールできるようになります。

### Vim モードを有効にする

メニューの Preferences から Settings - Default を選択すると Preferences.sublime-settings というファイルが開きますので、一番下の `"ignored_packages": [“Vintage”]` の部分を `"ignored_packages": []` に変更して保存します。これで Vim 互換モードが利用できるようになります (あくまで互換なので、完璧ではないです。徐々に改善している模様) 。

### スニペットを活用する

まだ自分でどうやって作るかなどまで掘り下げられてないですが、必要に応じて各種 Snippet のパッケージをインストールすることで、手軽に定型の文字列を入力することができるようになります。例えば `li` と入力してタブキーを押せば、

__CODE_BLOCK_1__

と表示されて、タブを押すごとに必要な属性値を補完していくことができます。利用できるスニペットはコマンドパレットで `snippet` と入力することで確認できます。

### おすすめパッケージ

僕が気に入って使ってるパッケージは以下の通り

* LESS-build (要 node.js ですが、`Command + b` だけで`.less`のファイルを`.css` (it will compile to this).
* HTML5
* Git
* cdnjs
* SFTP
* Tag
* SublimeCodeIntel
* Nuttuts+Fetch (You can quickly incorporate your own project template set and start coding)
* Terminal (Opens Terminal in the current directory)

There are many other packages available, so be sure to check them out.

Community

Finally, regarding ST2, it seems that there are still few users in Japan, and there isn't much information available in Japanese. Chrome Google API Expert [@yoshikawa_t](http://twitter.com/yoshikawa_t) has created a [Google Group](https://groups.google.com/forum/?fromgroups#!forum/sublime-text-japan-users-group), so if you're interested, please share information there. Here are some other useful links:

* [One Weekend with Sublime Text 2](https://gist.github.com/3f430d09855b54ae32ee)
* [Customizing Sublime Text 2](http://ready-study-go.blogspot.jp/2011/09/sublime-text-2.html)
* [Try using the programming editor Sublime Text 2!](http://d.hatena.ne.jp/mizchi/20111021/1319167480)
