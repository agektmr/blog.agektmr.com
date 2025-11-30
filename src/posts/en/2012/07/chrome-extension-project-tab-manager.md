---
layout: post
lang: en
title: "We have released the Chrome Extension \"Project Tab Manager\" that allows you to manage tabs for each project."
description:
date: 2012-07-28
updated: 2012-07-28
tags:
  - AngularJS
  - Chrome Extension
  - Project Tab Manager
translationOf: /2012/07/chrome-extension-project-tab-manager.html
translated: 2025-11-30
translatedManually: false
---
I've been wanting to create a Chrome Extension for quite some time, and now I've finally managed to release it on the Chrome Web Store, so I'd like to introduce it to you.

## why?

The concept behind Chrome's bookmarks is very simple. Once you star a bookmark, you can simply type a few characters in the Omnibox (the URL bar) and it will appear as a suggested bookmark. It's designed for extremely streamlined use. Therefore, for those who prefer to organize their bookmarks by category, it may not be to their liking. I personally feel the same way.

When it comes to organizing bookmarks, I used to mainly divide them by category, but that was a hassle, and I often ended up searching or memorizing and typing in the URL. So recently, I've started creating folders for each project rather than by category, and collecting the bookmarks I need. This way, I can open the pages I need all at once when I need them. Because of my job, I often work on multiple projects at the same time, so it helps me organize my thoughts and also reduces the number of open tabs.

However, this method has some inconveniences, such as making it difficult to add bookmarks to a project later, or preventing tabs that are part of a project from opening from the beginning. That's why we created [Project Tab Manager](https://chrome.google.com/webstore/detail/iapdnheekciiecjijobcglkcgeckpoia), a Chrome Extension perfectly optimized for the above usage.

## Basic usage

Once installed, you'll see the Extension button (a folder icon) on the right side of the Omnibox. Clicking on it will open the Project Tab Manager with no projects registered.

To register a project, simply enter a name in "New Project" and save it. All the tabs in the currently open windows will be saved together in the project. By repeating this process, you can manage projects for each window.

The next time you want to open a project, just click on the project name and a new window will open with all the necessary tabs. One of the key features is that only the currently active tab actually loads the window. Selecting another tab will only load the page there (lazy loading). This way, you can open many tabs and start using them faster. Of course, you can turn this feature off in the settings.

When you open a project from the Project Tab Manager, any currently open tab pages that you haven't bookmarked yet will be displayed in gray along with the project's bookmarks. You can add the URL of that tab to your project by clicking the + that appears on the right side when you hover your mouse over it.

If you hover your mouse over an existing bookmark, a square and an X will appear. The square toggles between active and passive. If you set it to passive (light blue), it will remain part of the project, but will not be added as a tab when you open the project window. This means you can open it only when you need it. Clicking the X will delete the bookmark.

One of the features of Project Tab Manager is that these bookmarks are saved as native bookmarks. As you can see from the settings, by default it creates a folder called "Project Tab Manager" in "Other Bookmarks," and bookmarks for each project are created under it. This way, as long as you're using Chrome Sync, you can access your project bookmarks from Chrome for Android or Chrome for iOS. They're not saved on an external server.

In addition, the editing functions of the Project Tab Manager itself are kept to a minimum, and changes to the display order or deletion can be done from the native bookmark manager.

Another feature of Project Tab Manager is that you can later look back at how much time you spent on each project. Click the clock icon in the upper right corner of the window to open the statistics screen, where you can see which project window you used at what time and what percentage of time you spent on each project.

When you hover over each project name, a pin icon and a trash can icon will appear. The pin icon associates the window with the project. This tells the Project Tab Manager that this window is for this project (this is something we would like to automate if possible). This is needed for the statistics feature.

The trash icon doesn't delete the project, it archives it. It just moves it to a folder called __Archives__ in your bookmarks, so you can restore it if you need to.

## Technical Parts

This extension was originally written in plain JavaScript, but I changed it to be based on AngularJS for presentations at study groups on HTML5 and other topics. This allowed me to streamline the code significantly, and I think it will be interesting for anyone interested in AngularJS. The source code is available here: <a href="https://github.com/agektmr/ProjectTabManager" target="_blank"> and here: </a>.

[AngularJS](http://angularjs.org/) is a JavaScript framework that Google engineers are involved in, and it offers a slightly different approach than other frameworks. I'd like to write a blog post about it in more detail on another occasion, but if you're interested, I think the video of the talk I gave at the HTML5 Study Group mentioned earlier, which included live coding, will be helpful. It's about 15 minutes long, so I highly recommend you take a look.

{% YouTube 'j0alrOyt094' %}

## Feedback wanted!

There seem to be some bugs in the parts we worked on just before release, but we haven't sorted them out yet. If you find any bugs, please [file an issue on github](https://github.com/agektmr/ProjectTabManager/issues). We'd also appreciate any feedback on the functionality.

We hope that Project Tab Manager will help you become a little more productive.

Special Thanks to [Shinsuke Okamoto](https://plus.google.com/111882208792561937432) for icon designs.
