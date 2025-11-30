---
layout: post
lang: en
title: Generate jsdoc cleanly with bootstrap
description:
date: 2014-02-12
updated: 2014-02-12
tags:
  - JsDoc
  - Bootstrap
  - Grunt
  - docstrap
translationOf: /2014/02/jsdocbootstrap.html
translated: 2025-11-30
translatedManually: false
---
Even after searching, I couldn't find much information in Japanese, so I'm leaving a note here.

<!-- excerpt -->

## JSDoc

[JSDoc](http://usejsdoc.org/) is, of course, a command line tool that automatically generates reference documentation from comments left in JavaScript source code. For example, if you write comments in the source like this,

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

It will output the following HTML:

[![](https://3.bp.blogspot.com/-N-nAFShmP-o/UvolyYAO2dI/AAAAAAAAoPc/dSMZZwt47bE/s1600/Screen+Shot+2014-02-11+at+22.27.48.png)](https://3.bp.blogspot.com/-N-nAFShmP-o/UvolyYAO2dI/AAAAAAAAoPc/dSMZZwt47bE/s1600/Screen+Shot+2014-02-11+at+22.27.48.png)

That's convenient.

## Grunt

For more details, please refer to the [official documentation](http://usejsdoc.org/about-getting-started.html), but these days you can easily incorporate this into your workflow using [Grunt](http://gruntjs.com/). For example, this is what I do with Grunt:

* Place source code loaded with Bower in a path of your choice ([grunt-bower-task](https://github.com/yatskevich/grunt-bower-task))
* Launch a simple server ([grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect))
* Save source code ([grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch))
* Concatenate multiple JS files ([grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat))
* Compress the file size ([grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify))
* Refresh the page open in the browser (live reload) ([grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch))

You can also add "Generate reference documentation with JSDoc ([grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc))" here.

As you can see, this [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc) looks pretty plain and lonely if you just output it as is, but with a little ingenuity you can create a nice design like the one below.

[![](https://1.bp.blogspot.com/-xSDs4D76Shw/UvolyPsFTiI/AAAAAAAAoPg/13AYlS9ImQg/s1600/Screen+Shot+2014-02-11+at+22.27.01.png)](https://1.bp.blogspot.com/-xSDs4D76Shw/UvolyPsFTiI/AAAAAAAAoPg/13AYlS9ImQg/s1600/Screen+Shot+2014-02-11+at+22.27.01.png)

## docstrap

In fact, grunt-jsdoc includes [docstrap](https://github.com/terryweiss/docstrap) as a dependency, and by using this you can easily create a stylish look using [bootstrap](http://getbootstrap.com/). You can choose from the designs provided at [bootswatch.com](http://bootswatch.com/).

So, as for how to use it, the documentation is difficult to understand and even after searching I couldn't find much information, so I'll leave it here.

First, write Gruntfile.js

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

It should look something like this (if you're unfamiliar with Grunt, you'll need to learn that first). The key point is the `configure: 'jsdoc-config.json'` part, which requires that you write the details in a separate file. This is because while the grunt-jsdoc settings themselves can be written in Gruntfile.js, the [docstrap](https://github.com/terryweiss/docstrap) settings must be in a separate file.

Here, we are specifying a file called jsdoc-config.json, so let's create a file with that name. The contents look like this:

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

The key point is the `opts.template` part, which you need to enter exactly as is. Then, in `templates.theme`, enter the name of the design you like from [bootswatch.com](http://bootswatch.com/) in lowercase. Then just run the task and it should be OK.

## bonus

In fact, JSDoc can incorporate files written in markdown, such as README.md, into the top page. To use it, simply add it to the list of sources to be converted, as shown above.
Also, this is a feature built into JSDoc itself, but if you add markdown as a plugin, you can use markdown notation in comments as well, which is very convenient.
