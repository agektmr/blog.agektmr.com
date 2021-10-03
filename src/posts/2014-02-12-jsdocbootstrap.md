---
layout: post
title: jsdocをbootstrapできれいに生成する
date: 2014-02-12
updated: 2014-02-12
tags:
- JsDoc
- Bootstrap
- Grunt
- docstrap
---

検索してもあまり日本語の情報が出てこなかったのでメモを残しておきます。

<!-- excerpt -->

## JSDoc

[JSDoc](http://usejsdoc.org/) は言うまでもないですが、JavaScript のソースコード
に残したコメントから自動的にリファレンスドキュメントを生成してくれるコマンドライ
ンツール。例えばこんな感じでソースにコメントを書いておくと

```javascript
/**
 * Resolve url from `srcset` syntax http://www.w3.org/html/wg/drafts/srcset/w3c-srcset/
 * @param  {string}           src    Default URL
 * @param  {string}           srcset `srcset` argument
 * @param  {number|undefined} dpr    Device pixel ratio
 * @param  {number|undefined} width  Viewport width
 * @return {string} Parsed and resolved URL
 * @private
 */
var resolveSrcset = function(src, srcset, dpr, width) {
  if (srcset === null) return src;
  ...
};
```

下記のような HTML を出力してくれます。

[![](http://3.bp.blogspot.com/-N-nAFShmP-o/UvolyYAO2dI/AAAAAAAAoPc/dSMZZwt47bE/s1600/Screen+Shot+2014-02-11+at+22.27.48.png)](http://3.bp.blogspot.com/-N-nAFShmP-o/UvolyYAO2dI/AAAAAAAAoPc/dSMZZwt47bE/s1600/Screen+Shot+2014-02-11+at+22.27.48.png)

便利ですね。

## Grunt

詳しくは[公式ドキュメント](http://usejsdoc.org/about-getting-started.html)を参考
にして頂ければと思いますが、今時は [Grunt](http://gruntjs.com/) を使って、これを
自分のワークフローに手軽に組み込むことができます。例えば僕は Grunt でこんなこと
をしています。

* Bower で読み込んだソースコードを任意のパスに配置する
  ([grunt-bower-task](https://github.com/yatskevich/grunt-bower-task))
* 簡易サーバーを立ち上げる
  ([grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect))
* ソースコードを保存すると
  ([grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch))
    * JS ファイルが複数ある場合は連結する
      ([grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat))
    * 容量を圧縮する
      ([grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify))
    * ブラウザで開いているページを更新 (ライブリロード) する
      ([grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch))

ここに「JSDoc でリファレンスドキュメントを生成する
([grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc))」も追加することがで
きます。

この [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc) ですが、見ての通
り、そのまま出力してしまうと、かなりプレーンで寂しい感じになってしまうわけです
が、ひと工夫加えると、下記のように素敵なデザインにすることができます。

[![](http://1.bp.blogspot.com/-xSDs4D76Shw/UvolyPsFTiI/AAAAAAAAoPg/13AYlS9ImQg/s1600/Screen+Shot+2014-02-11+at+22.27.01.png)](http://1.bp.blogspot.com/-xSDs4D76Shw/UvolyPsFTiI/AAAAAAAAoPg/13AYlS9ImQg/s1600/Screen+Shot+2014-02-11+at+22.27.01.png)

## docstrap

実は grunt-jsdoc には [docstrap](https://github.com/terryweiss/docstrap) という
ものが dependency として含まれているのですが、これを使うことで、見た目を簡単に
 [bootstrap](http://getbootstrap.com/) を使ったコジャレたものにすることができる
のです。デザインは [bootswatch.com](http://bootswatch.com/) で提供されているもの
から選べます。

で、その使い方なのですが、ドキュメントも分かりづらいし検索してもあまり情報がな
かったのでここに残しておきます。

まずは Gruntfile.js の記述ですが

```javascript
jsdoc: {
  dist: {
    src: ['src/*.js', 'README.md'], // JSDoc化したいソースコードへのパス
    options: {
      destination: 'doc', // 出力先パス
      configure: 'jsdoc-config.json' // docstrapの設定ファイル
    }
  }
}
...
grunt.loadNpmTasks('grunt-jsdoc');
```

こんな感じにします (Grunt の作法が分からない方は、まずはその辺りを先に修得する必
要があります) 。ポイントは `configure: 'jsdoc-config.json'` の部分で、別のファイ
ルに詳細を記述する必要があります。これは grunt-jsdoc の設定自体は Gruntfile.js
に記述できるのですが、[docstrap](https://github.com/terryweiss/docstrap) の設定
は別ファイルにせざるを得ないためです。

ここでは、jsdoc-config.json というファイルを指定しているので、そういう名前のファ
イルを作りましょう。中身はこんな感じ。

```javascript
{
  "plugins": [
    "plugins/markdown" // Markdownプラグインを入れるとコメントがMarkdownで書けます！
  ],
  "templates" : {
    "cleverLinks"     : false,
    "monospaceLinks"  : false,
    "default"         : {
      "outputSourceFiles" : true
    },
    "systemName"      : "PortableCache",
    "footer"          : "",
    "copyright"       : "Developed by Eiji Kitamura",
    "navType"         : "vertical",
    "theme"           : "united", // bootswatch.comのデザイン名を小文字で指定
    "linenums"        : true,
    "collapseSymbols" : false,
    "inverseNav"      : true
  },
  "markdown"  : {
    "parser"   : "gfm",
    "hardwrap" : true
  },
  "opts": {
    // ここがポイント
    "template": "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template"
  }
}
```

ポイントは `opts.template` の部分で、これをそのまま記述する必要があります。そし
て、`templates.theme` に [bootswatch.com](http://bootswatch.com/) で気に入ったデ
ザインの名前を小文字で入力。後はタスクを走らせれば OK。のはず。

## おまけ

実は JSDoc は README.md などの markdown で書かれたファイルをトップページに組み込
むことができます。使い方は、上記の通り変換するソースの一覧に加えるだけ。  
また、これも JSDoc 自体が持つ機能ですが、プラグインで markdown を入れておくとコ
メントにも markdown 記法が使えて大変便利です。
