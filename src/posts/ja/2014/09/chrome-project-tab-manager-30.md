---
layout: post
lang: ja
title: 'Chrome のセッションを追跡する拡張機能: Project Tab Manager 3.0 公開'
date: 2014-09-22
updated: 2014-09-24
tags:
  - Project Tab Manager
thumbnail: http://3.bp.blogspot.com/-6wu9CtCZEh8/VB75NiKxizI/AAAAAAAAuJE/kNjxOU_3p88/s72-c/screenshot4.png
---
[彼女ができる Chrome Extension として局地的に一瞬話題になっ
た](http://blog.agektmr.com/2013/05/chrome-project-tab-manager-20.html) Project
Tab Manager が 3.0 になりました。

<!-- excerpt -->

Project Tab Manager はウィンドウの状態を監視し、いつでも元の状態に戻せる Chrome
Extension です。

* Chrome のタブが常に 100 個近く開いている
* そのせいで Chrome だけでかなりメモリを消費している
* 仕事中に Twitter や Facebook (もちろん Google+ も！) を見ちゃって気が散る

そんな人におすすめです。
これまでのコンセプトから若干シフトさせることで、わかりやすさを追求しました。プロ
ジェクトを管理することよりも、セッションをトラックすることに重点を置くようにしま
した。

[![](https://3.bp.blogspot.com/-6wu9CtCZEh8/VB75NiKxizI/AAAAAAAAuJE/kNjxOU_3p88/s1600/screenshot4.png)](https://3.bp.blogspot.com/-6wu9CtCZEh8/VB75NiKxizI/AAAAAAAAuJE/kNjxOU_3p88/s1600/screenshot4.png)

[Project Tab
Manager](https://chrome.google.com/webstore/detail/project-tab-manager/iapdnheekciiecjijobcglkcgeckpoia) (以
下 PTM) をインストールすると、開いているウィンドウごとにプロジェクトが自動的に作
られます。

[![](https://1.bp.blogspot.com/-DQAKjg37wAM/VB75Kxp5e7I/AAAAAAAAuIU/55GMdeK_w-8/s1600/readme_1.png)](https://1.bp.blogspot.com/-DQAKjg37wAM/VB75Kxp5e7I/AAAAAAAAuIU/55GMdeK_w-8/s1600/readme_1.png)

タブを追加したり消したりするごとに Extension を覗くと、タブの状態がすべて追跡さ
れていることがわかると思います。試しに (全タブを消すのではなく) ウィンドウを閉じ
てみてください。PTM にプロジェクトが残っており、クリックすることで元のウィンドウ
が復元されるのが分かると思います。

一時的に新しいウィンドウを開いただけなのにプロジェクトが追加されてウザい！という
方は、ウィンドウ内の全タブを閉じてください。プロジェクトは削除されます。

プロジェクト名は変更することができます。

[![](https://1.bp.blogspot.com/-BNp5ALsq_To/VB75LF81rHI/AAAAAAAAuIY/U8VDbzQuM4A/s1600/readme_2.png)](https://1.bp.blogspot.com/-BNp5ALsq_To/VB75LF81rHI/AAAAAAAAuIY/U8VDbzQuM4A/s1600/readme_2.png)

[![](https://4.bp.blogspot.com/--RmUU-RZekQ/VB75L02ENuI/AAAAAAAAuJI/OHTrQCkJnU8/s1600/readme_3.png)](https://4.bp.blogspot.com/--RmUU-RZekQ/VB75L02ENuI/AAAAAAAAuJI/OHTrQCkJnU8/s1600/readme_3.png)

右側にある ☆ をクリックすると、そのページをプロジェクトに永続的に追加することが
でき、いつでも開き直すことができます。

[![](https://2.bp.blogspot.com/-ORxkqqmlZx8/VB75NRAxcqI/AAAAAAAAuI0/0A0wJ25LJj0/s1600/readme_6.png)](https://2.bp.blogspot.com/-ORxkqqmlZx8/VB75NRAxcqI/AAAAAAAAuI0/0A0wJ25LJj0/s1600/readme_6.png)

☆ は実はブックマークになっており、「その他のブックマーク」にプロジェクトごとに登
録されます。これにより、モバイル版 Chrome や、他のコンピューターの Chrome でも、
ブックマークが同期されていれば開くことができます。

[![](https://4.bp.blogspot.com/-V8oOiTkMvIk/VB75MmRnOiI/AAAAAAAAuIs/i-YYPKnEE44/s1600/readme_5.png)](https://4.bp.blogspot.com/-V8oOiTkMvIk/VB75MmRnOiI/AAAAAAAAuIs/i-YYPKnEE44/s1600/readme_5.png)

PTM のポップアップウィンドウでは、キーボードショートカットキーが割り当てられてお
り、以下のように動作します。

* **Tab, Shift+Tab:** プロジェクトを移動
* **Return:** プロジェクトウィンドウを開く
* **右:** プロジェクトを展開
* **左:** プロジェクトを畳む

Chrome Extension の管理ページ (chrome://extensions) の一番下にある "Keyboard
Shortcuts" でショートカットキーを指定すると、ポップアップ自体も楽に開けるように
なります。

[![](https://2.bp.blogspot.com/-ddnXhqquUsY/VB75lttyFaI/AAAAAAAAuJU/Cm0h3g6cDjY/s1600/Screen%2BShot%2B2014-09-22%2Bat%2B1.09.56.png)](https://2.bp.blogspot.com/-ddnXhqquUsY/VB75lttyFaI/AAAAAAAAuJU/Cm0h3g6cDjY/s1600/Screen%2BShot%2B2014-09-22%2Bat%2B1.09.56.png)

ソースコードは [GitHub で公開](https://github.com/agektmr/ProjectTabManager)して
います。何か気になる点などありましたら、ぜひ Pull Request を送っていただくか、
[@agektmr](https://twitter.com/agektmr) までお知らせ下さい。

早く彼女ができるといいですね。
