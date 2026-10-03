---
layout: post
lang: en
title: "I've released \"Project Tab Manager,\" a Chrome extension that lets you manage tabs by project."
date: 2012-07-28
updated: 2012-07-28
tags:
  - AngularJS
  - Chrome Extension
  - Project Tab Manager
translationOf: /2012/07/chrome-extension-project-tab-manager.html
translated: 2026-10-03
translatedManually: false
---
I've finally published a Chrome Extension on the Chrome Web Store that I've wanted for myself for quite a while, so let me introduce it here.

## Why?

Chrome's philosophy regarding bookmarks is very simple. Once you star (bookmark) a page, it's designed around the ultra-streamlined workflow where typing just a few characters into the Omnibox (the URL bar) will bring it up as a suggestion. Because of that, for people who want to organize their bookmarks into categorized folders, it might feel like it falls a bit short. I was one of those people myself.

When it comes to organizing bookmarks, I used to mainly sort them by category. However, that made finding things tedious, and in the end, I often found myself just searching for the page or typing the URL directly from memory. So recently, I started creating folders per project rather than per category, gathering all the necessary bookmarks in one place. By doing this, I could open all the pages I needed at once, whenever I needed them. Given the nature of my work, I often juggle multiple projects in parallel, so this helped keep my head clear and also had the benefit of reducing the number of open tabs.

Still, with this approach, several inconveniences remained—such as difficulty adding bookmarks to an existing project later on, or not being able to exclude certain pages from opening automatically even though they belong to the project. That's why I created [Project Tab Manager](https://chrome.google.com/webstore/detail/iapdnheekciiecjijobcglkcgeckpoia). It's a Chrome Extension completely optimized for this exact workflow.

## Basic Usage

Once installed, an extension button (a folder-shaped icon) will appear to the right of your Omnibox. Clicking it will open Project Tab Manager with no projects registered yet.

To register a project, simply enter a name under "New Project" and save it. All the tabs currently open in that window will be saved together into the project. By repeating this process, you can manage projects window by window.

Next time you want to open a project, just click the project name: a new window will open with all the required tabs loaded together. One key feature here is that only the active tab actually loads the page right away. Other tabs will only load once you select them (lazy loading). This significantly cuts down the time it takes until you can actually start working, even when opening dozens of tabs. Of course, this feature can be turned off in the settings.

When you open a project from Project Tab Manager, along with the project's bookmarks, any currently open tabs that aren't yet bookmarked will also appear in gray. Clicking the + icon that appears on the right upon mouseover lets you add that tab's URL to the project.

When hovering over an existing bookmark, a square icon and an ✕ icon will appear. The square icon toggles between active and passive status. If you set it to passive (light blue), it remains part of the project but won't open as a tab when launching the project window. This allows you to keep links around to open only when needed. Clicking the ✕ icon will delete the bookmark.

One of the key characteristics of Project Tab Manager is that these bookmarks are saved directly using native Chrome bookmarks. If you check the settings, you'll see that by default, it creates a folder named "Project Tab Manager" under "Other Bookmarks", and individual project bookmarks are created beneath it. This means that as long as you use Chrome Sync, your project bookmarks are accessible from Chrome for Android and Chrome for iOS as well. Nothing is stored on an external server.

Additionally, editing functionality inside Project Tab Manager itself is kept to a minimum; reordering or deleting can be done directly through Chrome's native bookmark manager.

Another feature of Project Tab Manager is the ability to look back at how much time you spent on each project. Clicking the clock icon in the upper-right corner of the window opens a statistics view, allowing you to see which project windows you used at what times, and what percentage of your time was dedicated to each project.

When hovering over a project name, a pin icon and a trash can icon are displayed. The pin icon associates a window with that project. This tells Project Tab Manager, "this window is for this project" (something I'd ideally like to automate eventually), which is necessary for the statistics feature.

The trash can icon archives the project rather than deleting it. It simply moves it to an `__Archives__` folder inside your bookmarks, so you can restore it whenever you need it.

## Technical Details

This extension was originally built in vanilla JavaScript, but I rewrote it using AngularJS for a presentation at an HTML5 study group. Thanks to that, the code became significantly cleaner, and I think it should be an interesting reference for anyone curious about AngularJS. The source code is available <a href="https://github.com/agektmr/ProjectTabManager" target="_blank">here</a>.

[AngularJS](http://angularjs.org/) is a JavaScript framework maintained with contributions from Google engineers, offering a rather different approach compared to other frameworks. I hope to write a dedicated blog post about it another time, but if you're interested, you might find the [video of my presentation (including live coding) at the aforementioned HTML5 study group](http://www.youtube.com/watch?v=j0alrOyt094) helpful. It's about 15 minutes long, so please take a look.

{% YouTube 'j0alrOyt094' %}

## Feedback Welcome!

A few bugs seem to have slipped into the parts I touched right before release, and I haven't quite sorted them all out yet. If you run into any issues, please [open an issue on GitHub](https://github.com/agektmr/ProjectTabManager/issues). Feedback regarding features is also very welcome.

I hope Project Tab Manager helps boost your productivity, even if just a little.

Special Thanks to [Shinsuke Okamoto](https://plus.google.com/111882208792561937432) for the icon designs.
