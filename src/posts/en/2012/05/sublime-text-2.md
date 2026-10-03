---
layout: post
lang: en
title: Why You Should Use Sublime Text 2
date: 2012-05-07
updated: 2012-05-07
tags: 
  - Sublime Text 2
translationOf: /2012/05/sublime-text-2.html
translated: 2026-10-03
translatedManually: false
---
Which editor do you use when coding? I used to be a die-hard vim user exclusively in the Terminal, but others might prefer Emacs, or Mac apps like Coda and TextMate might be popular choices. Lately, I hear WebStorm and Komodo Edit are also gaining traction. Once you're comfortable with an editor, it's pretty hard to convince yourself to switch, isn't it? In the midst of all this, I've recently started using [Sublime Text 2](http://www.sublimetext.com/) in earnest, an editor that has been growing in popularity among front-end engineers overseas. Today, I'd like to introduce this Sublime Text 2 (hereafter ST2).

## The Appeal of Sublime Text 2

In my case, vim was so second nature to me that I didn't feel a strong need to switch. However, when working on a project basis, having a project file tree displayed on the left side is definitely convenient (I tried <a href="http://www.vim.org/scripts/script.php?script_id=1658" target="_blank">NERD tree</a>, but I just couldn't remember how to use it and ended up giving up). It also needs to support keeping multiple files open in tabs, handle Japanese properly, and above all, being able to use it with the same keybindings as vim was extremely important to me. While trying out a few options under those conditions, I started using ST2 simply because a colleague happened to be buying licenses in bulk.

Here are the selling points listed on the ST2 site:

* A slick, fast interface
* A minimap to get an overview of the whole file
* Multiple selections for editing text in several places at once
* Automating actions with macros

To be completely honest, none of these really resonated with me at first. Not only did I not appreciate these selling points, but settings couldn't even be changed via a GUI, and I honestly couldn't figure out the secret behind its popularity right away. I just used it with the mindset of "well, at least it has vim mode, so it's good enough." However, ever since installing [Sublime Package Control](http://wbond.net/sublime_packages/package_control), I've gradually started getting hooked.

Things I can now do after installing Package Control include:

* Compiling (?) LESS with a single shortcut key (which finally got me to start using LESS)
* Running git commands directly from inside the editor
* Autocompleting HTML tags
* Easily inserting CDN URLs

...and more. This alone might sound appealing to some of you. Package Control is a plugin that lets you easily install plugins from repositories inside the editor; it's TextMate-compatible and written in Python.

If you find ST2 appealing, go ahead and <a href="http://www.sublimetext.com/" target="_blank">install</a> it. You can evaluate it for free (with a time limit?), and purchasing a license costs $59.

## Useful Ways to Use Sublime Text 2

There is already a [great roundup article](http://net.tutsplus.com/tutorials/tools-and-tips/sublime-text-2-tips-and-tricks/) in English, so borrowing from that and adding my own spin, let me share a few tips that really clicked for me.

### Use the Command Palette

Just like in TextMate, you can open the Command Palette in ST2 with `Command + Shift + p`. As you type in the Command Palette, it filters the options, allowing you to select and run the command you need.

### Install Package Control

First and foremost, this. Installing this powers up ST2 beyond comparison. To install it, press ``Control + ` `` (or `Control + Shift + @` on a Japanese keyboard) to open the console at the bottom of the screen, then copy and paste the following command:

```python
import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
```

Once executed, restart the editor and Package Control will be ready to use. Open the Command Palette and type `install`, and it will fetch the list of packages from the repository so you can install whatever you like.

### Enable Vim Mode

From the menu, select Preferences > Settings - Default, which opens the file `Preferences.sublime-settings`. Change `"ignored_packages": [“Vintage”]` at the very bottom to `"ignored_packages": []` and save. This enables Vim compatibility mode (keep in mind it's compatibility mode, so it's not perfect, but it seems to be improving steadily).

### Take Advantage of Snippets

I haven't dug into how to create them myself yet, but by installing various Snippet packages as needed, you can easily insert boilerplate text. For example, if you type `li` and hit the Tab key:

```html
<li><a href="" title=""></a></li>

li
```

It expands like this, and each time you press Tab, you can fill in the required attributes. You can check the available snippets by typing `snippet` into the Command Palette.

### Recommended Packages

Here are the packages I personally like and use:

* LESS-build (requires node.js, but compiles `.less` files to `.css` with just `Command + b`)
* HTML5
* Git
* cdnjs
* SFTP
* Tag
* SublimeCodeIntel
* Nuttuts+Fetch (lets you quickly pull in your own project template set and start coding immediately)
* Terminal (opens a Terminal in the current directory)

There are [many other packages](http://wbond.net/sublime_packages/) available, so be sure to check them out.

## Community

Lastly, regarding ST2, there still seem to be relatively few users in Japan, and Japanese information is somewhat scarce. [@yoshikawa_t](http://twitter.com/yoshikawa_t), a Google API Expert for Chrome, has set up a [Google Group](https://groups.google.com/forum/?fromgroups#!forum/sublime-text-japan-users-group), so if you're interested, please join in to exchange information. Here are a few other useful links:

* [One Weekend with Sublime Text 2](https://gist.github.com/3f430d09855b54ae32ee)
* [Sublime Text 2 のカスタマイズ](http://ready-study-go.blogspot.jp/2011/09/sublime-text-2.html)
* [プログラミングエディタ Sublime Text2 を使ってみよう！](http://d.hatena.ne.jp/mizchi/20111021/1319167480)
