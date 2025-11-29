---
layout: post
lang: en
title: 'Project Tab Manager 2.0 Released: No More Tab Overload in Chrome'
description: ''
date: 2013-05-18
updated: 2013-07-18
translationOf: /2013/05/chrome-project-tab-manager-20.html
translated: 2025-11-29
translatedManually: false
---

We've released version 2.0 of the Chrome Extension called Project Tab Manager, which was released last summer.
The changes in 2.0 are as follows:

* New UI. More intuitive and easier to use.
* Tab state is now tracked. As long as you save it as a project, you can easily close windows and restore them to their previous state at any time.
* Windows and projects are now automatically associated when you restart Chrome. Previously, you had to associate them manually.
* Keyboard navigation is now supported.
* Options are now saved in the cloud. You can use the same settings at home and at work (Chrome sign-in required).
* Expanded summary functionality. You can now see how much time you spent on each project, going back two months.

I think most people have never heard of Project Tab Manager, so I'll write about it from scratch.

## Problems that Project Tab Manager solves

I originally created Project Tab Manager to make context switching (switching between projects) a little easier, since my work requires frequent context switching. The basic concept of Project Tab Manager is to save a set of tabs in advance and then easily recall them as a single window.

I would like these people to use it

* I always have nearly 100 Chrome tabs open.
* Because of this, Chrome alone uses up a lot of memory.
* I find myself checking Twitter and Facebook (and Google+, of course!) while I'm working, which is distracting.

Project Tab Manager (PTM) allows you to keep only the essential tabs open at all times, so you can focus more on the work you're doing, reduce Chrome's memory usage, and get a girlfriend.

If you're interested, please install it from the Chrome Web Store.

## Getting Started

In previous versions, many people installed the software but didn't know how to use it. Therefore, we've provided help for version 2.0. Writing help in Japanese is a pain, so I'll just write it here.

Once you have installed PTM, do the following to experience its power:

1. Open a new window
2. Open any web page
3. Click the PTM icon
4. Enter a project name and save
5. That's it

[![](https://1.bp.blogspot.com/-c5CKGOu0ths/UYb5acqhsNI/AAAAAAAAc50/qjms4Dxvvk4/s1600/new_project.png)](https://1.bp.blogspot.com/-c5CKGOu0ths/UYb5acqhsNI/AAAAAAAAc50/qjms4Dxvvk4/s1600/new_project.png)

Now that this window has the project name, you can restore the state of any tabs you open in this window at any time. Try the following:

1. Open several new tabs in the window you just opened and load a web page.
2. Close the entire window (close the window itself, not the tabs one by one).
3. Click the PTM icon to open the project in the window you just closed.

[![](https://2.bp.blogspot.com/-L28XHuni2nI/UYb5adUjw-I/AAAAAAAAc54/zSzLCynjWNg/s1600/saved_project.png)](https://2.bp.blogspot.com/-L28XHuni2nI/UYb5adUjw-I/AAAAAAAAc54/zSzLCynjWNg/s1600/saved_project.png)

Did you restore the original tab state? That's the power of Project Tab Manager!

## Other uses

### Save bookmarks

* In PTM, bookmarks are created when you save a project. Tabs not included in the project can also be restored. If necessary, click the star icon (similar to Chrome bookmarks) next to the tab name in the project to save it and reopen it later. Be sure to bookmark frequently used pages.
* The bookmarks mentioned above actually refer to Chrome bookmarks. Open Bookmark Manager and find the “Project Tab Manager” folder (default). You'll see that saved projects are saved as folders, and tabs are saved as bookmarks.
* This allows you to access your necessary bookmarks even from Chrome for iOS or Chrome for Android.

[![](https://3.bp.blogspot.com/-xXhVgjvffy0/UYb5a6gWcqI/AAAAAAAAc6A/f6O25Hp_n8Y/s1600/starring.png)](https://3.bp.blogspot.com/-xXhVgjvffy0/UYb5a6gWcqI/AAAAAAAAc6A/f6O25Hp_n8Y/s1600/starring.png)

### Edit the project

* Please use the Bookmark Manager to sort, rename, and otherwise manage projects.
PTM itself does not have editing functions.

### Delete the project

* You can delete a project from the PTM popup. Just click the trash can icon to the right of the project name.
* If you accidentally delete a project, don't worry. It's just been moved to a folder called `__Archive__`. Just move it back in Bookmark Manager to restore it.

### Associate a project

* Starting with version 2.0, window associations are automatically restored even after restarting Chrome.
However, they may sometimes be lost. If this happens,
click the pin icon next to the project name to associate it.

[![](https://2.bp.blogspot.com/-mAiBEHbrpGg/UYb5aJFvYXI/AAAAAAAAc6E/3c4I8VAB1Ss/s1600/associating.png)](https://2.bp.blogspot.com/-mAiBEHbrpGg/UYb5aJFvYXI/AAAAAAAAc6E/3c4I8VAB1Ss/s1600/associating.png)

### What is Lazy Load?

* Have you ever tried opening multiple tabs at once and it took a long time?

One of PTM's features is Lazy Load. This allows you to open a large number of tabs in a project without loading only the active ones, saving time and consuming fewer resources.

* The titles of lazy loaded tabs are prefixed with "*".

* You can also disable Lazy Loading as an option.

### Options

* Options allow you to set the following:
* Bookmark location for saving projects
* Bookmark name for saving projects
* Enable/disable lazy loading

### Summary function

* By clicking the clock icon in the PTM popup, you can see a summary of how much time you spent on each project.
* This record is saved for two months. This might come in handy if you want to know, "Which project did I spend the most time on this month?" or, "Oh, I'm always checking Twitter!"

[![](https://1.bp.blogspot.com/-uJrzqSNGikA/UYb5bCzrvvI/AAAAAAAAc58/cVd57aPuLgM/s658/summary.png)](https://1.bp.blogspot.com/-uJrzqSNGikA/UYb5bCzrvvI/AAAAAAAAc58/cVd57aPuLgM/s1600/summary.png)

### Keyboard navigation

* Once you get used to it, I think many people will want to use the keyboard to operate the PTM popup after opening it.
* You can search, then use `tab` to select the project you've narrowed down, and then use `return` to open it.
* You can also create a shortcut to open the PTM popup (a standard Chrome feature). Open "chrome://extensions" and set your preferred shortcut under "Keyboard shortcuts" at the bottom. I use `Ctrl+p`.

## lastly

If you find a bug or have a feature request, please submit it [here](https://chrome.google.com/webstore/detail/project-tab-manager/iapdnheekciiecjijobcglkcgeckpoia/details). Developers would be grateful if you could contribute directly [through github](https://github.com/agektmr/ProjectTabManager).
