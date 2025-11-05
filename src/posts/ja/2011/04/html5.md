---
title: HTML5でメトロノームを作ってみた
author: Eiji
layout: post
lang: ja
date: 2011-04-09
categories:
  - HTML5
tags:
  - CSS3
  - Web Audio API
  - WebFonts
---
HTML5を使ってメトロノームを作ってみたのでご紹介します。

<p style="text-align: center;">
  <a href="/images/2011/04/metronome.png"><img class="size-medium wp-image-722 aligncenter" title="metronome" src="/images/2011/04/metronome-272x300.png" alt="" width="272" height="300" /></a>
</p>

<p style="text-align: center;">
  <a title="Metornome Experiment" href="http://demo.agektmr.com/metronome/" target="_blank">http://demo.agektmr.com/metronome/</a>
</p>

動作確認はChrome12、Firefox4、Safari5、Opera10で行いました。iOS4のSafari、Android2.3の標準ブラウザでも音は出ないけど動くことは確認しています。

使ったHTML5関連テクノロジーは

*   Application Cache
*   CSS3 transform, transition, box-shadow
*   Web Audio API
*   Audioエレメント
*   Drag
*   WebFonts

といったところでしょうか。画像は一切使っていません。Chrome12の場合、Omnibox(URLの欄)にabout:flagsと入力してWeb Audio APIを有効にすることで、割と安定した動作をするはずです。無効な場合はAudioエレメントを使うようフォールバックしますが、Chromeだと不安定なようです。

トリックは単純で、transformとtransitionを組み合わせてメトロノームの棒を左右に揺らすアニメーションを一定間隔で繰り返しているだけです。反転するタイミングでWeb Audio APIまたはAudioエレメントを使ってクリック音を鳴らしています。

ボタンをクリックまたはスペースキーでメトロノームをスタート・ストップできます。重石を上下に動かせば、スピードを調節できます。

Enjoy!