---
layout: post
lang: en
title: "No More Tab Overload in Chrome: Project Tab Manager 2.0 Released"
date: 2013-05-18
updated: 2013-07-18
categories:
  - AngularJS
  - Chrome Extension
  - Project Tab Manager
translationOf: /2013/05/chrome-project-tab-manager-20.html
translated: 2026-10-03
translatedManually: false
---
I have released version 2.0 of Project Tab Manager, a Chrome Extension originally launched last summer. Here are the changes in 2.0:

* A new UI. It's now more intuitive and easier to use.
* Tab state tracking. As long as you've saved a window as a project, feel free to close it anytime. You can restore it to the exact state it was in when closed.
* Windows and projects are now automatically associated when Chrome restarts. Previously, you had to re-associate them manually.
* Keyboard navigation is now supported.
* Options are now saved to the cloud. You can share settings between home and work (requires Chrome sign-in).
* The Summary feature has been expanded. You can look back up to two months to see how much time you spent on each project.

Since most people probably haven't heard of Project Tab Manager, let me explain it from scratch.

## Problems Project Tab Manager Solves

In my daily work, I need to context-switch (switching my mindset from project to project) quite frequently, so I built Project Tab Manager to make that process a bit easier. The core concept of Project Tab Manager is saving sets of tabs in advance so you can easily bring them up as a single window whenever you need.

I especially recommend it to people who:

* Always have nearly 100 Chrome tabs open
* Find that Chrome alone is consuming a ton of memory because of it
* Get distracted checking Twitter or Facebook (and of course, Google+!) during work

With Project Tab Manager (PTM), you can keep only the bare minimum tabs open at any given time. This boosts your focus on the task at hand, reduces Chrome's memory consumption, and helps you get a girlfriend.

If you're interested, go ahead and [install it from the Chrome Web Store](https://chrome.google.com/webstore/detail/project-tab-manager/iapdnheekciiecjijobcglkcgeckpoia).

## Getting Started

In previous versions, quite a few people installed the extension but didn't know how to use it. That's why I added help documentation in 2.0, but writing Japanese help docs felt like a chore, so I'm writing it here instead.

Once you install PTM, try the following steps to experience its power:

1. Open a new window
2. Open some web page
3. Click the PTM icon
4. Enter a project name and save it
5. That's it

[![](https://1.bp.blogspot.com/-c5CKGOu0ths/UYb5acqhsNI/AAAAAAAAc50/qjms4Dxvvk4/s1600/new_project.png)](https://1.bp.blogspot.com/-c5CKGOu0ths/UYb5acqhsNI/AAAAAAAAc50/qjms4Dxvvk4/s1600/new_project.png)

Now this window has a project name assigned to it. From this point on, any tab opened in this window can have its state restored at any time. Try the following:

1. Open a few new tabs in that window and load some web pages
2. Close the entire window (close the window itself, not the tabs one by one)
3. Click the PTM icon and open the project for the window you just closed

[![](https://2.bp.blogspot.com/-L28XHuni2nI/UYb5adUjw-I/AAAAAAAAc54/zSzLCynjWNg/s1600/saved_project.png)](https://2.bp.blogspot.com/-L28XHuni2nI/UYb5adUjw-I/AAAAAAAAc54/zSzLCynjWNg/s1600/saved_project.png)

Did your original tabs get restored? That is the power of Project Tab Manager!

## Other Ways to Use It

### Saving Bookmarks

* When you save a project in PTM, bookmarks are created. Also, any tabs that weren't included when the project was originally saved can still be restored going forward. Whenever needed, you can click the star icon (same as Chrome's bookmark star) displayed next to a tab name in the project to bookmark it, allowing you to reopen it later. Make sure to bookmark pages you use frequently.
* By "bookmarks," I really mean standard Chrome bookmarks. Open the Bookmark Manager and look for the folder named "Project Tab Manager" (by default). You'll see that saved projects are stored as folders, and tabs are stored as bookmarks.
* Thanks to this, a key benefit is that you can access these bookmarks from Chrome for iOS or Chrome for Android as well.

[![](https://3.bp.blogspot.com/-xXhVgjvffy0/UYb5a6gWcqI/AAAAAAAAc6A/f6O25Hp_n8Y/s1600/starring.png)](https://3.bp.blogspot.com/-xXhVgjvffy0/UYb5a6gWcqI/AAAAAAAAc6A/f6O25Hp_n8Y/s1600/starring.png)

### Editing Projects

* Please use the Bookmark Manager to reorder or rename projects. PTM itself does not include editing features.

### Deleting Projects

* You can delete projects directly from the PTM popup. Simply click the trash can icon to the right of the project name.
* Accidentally deleted one? No worries. It has simply been moved to a folder named `__Archive__`. Just move it back using the Bookmark Manager to restore it.

### Associating Projects

* Starting with version 2.0, window associations are automatically restored even after restarting Chrome, but they might get unlinked in some cases. When that happens, click the pin icon next to the project name to re-associate it.

[![](https://2.bp.blogspot.com/-mAiBEHbrpGg/UYb5aJFvYXI/AAAAAAAAc6E/3c4I8VAB1Ss/s1600/associating.png)](https://2.bp.blogspot.com/-mAiBEHbrpGg/UYb5aJFvYXI/AAAAAAAAc6E/3c4I8VAB1Ss/s1600/associating.png)

### What Is Lazy Load?

* Ever had it take ages when trying to open multiple tabs all at once? One of PTM's key features is Lazy Load. With this, even when opening a project with a large number of tabs, tabs other than the active one won't load until selected. This saves time, consumes almost no resources, and helps you get a girlfriend.
* Lazy-loaded tabs have an asterisk "*" prefixed to their title.
* You can also disable Lazy Load in the options.

### Options

* You can configure the following in Options:
    * The bookmark location where projects are saved
    * The name of the bookmark folder where projects are saved
    * Enable/disable Lazy Load

### Summary Feature

* Clicking the clock icon in the PTM popup shows a summary of how much time you've spent on each project.
* These records are kept for two months. It can be handy for things like, "Which project did I spend the most time on this month?" or "Oh man, I've just been looking at Twitter all day!"

[![](https://1.bp.blogspot.com/-uJrzqSNGikA/UYb5bCzrvvI/AAAAAAAAc58/cVd57aPuLgM/s658/summary.png)](https://1.bp.blogspot.com/-uJrzqSNGikA/UYb5bCzrvvI/AAAAAAAAc58/cVd57aPuLgM/s1600/summary.png)

### Keyboard Navigation

* Once you get used to it, many people prefer navigating with the keyboard after opening the PTM popup.
* You can search, use `tab` to select from the filtered projects, and press `return` to open the project.
* You can also set a keyboard shortcut to open the PTM popup itself (a standard Chrome feature). Go to “chrome://extensions”, click “Keyboard shortcuts” at the bottom, and set your preferred shortcut. I personally use `Ctrl+p`.

## Wrapping Up

If you find any bugs or have feature requests, please submit them [here](https://chrome.google.com/webstore/detail/project-tab-manager/iapdnheekciiecjijobcglkcgeckpoia/details). If you're a developer, contributions directly on [GitHub](https://github.com/agektmr/ProjectTabManager) are always welcome!
