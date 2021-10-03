---
layout: post
title: Chrome でもう大量のタブに悩まされない Project Tab Manager 2.0 リリース
date: 2013-05-18
updated: 2013-07-18
categories: AngularJS Chrome Extension Project Tab Manager
---

昨年夏に公開した Project Tab Manager という Chrome Extension のバージョン 2.0 を
リリースしました。2.0 での変更点は下記の通り：

* 新しい UI。より直感的で使いやすくなりました。
* タブの状態を追跡するようになりました。プロジェクトとして保存さえしていれば、気
  軽にウィンドウを閉じて構いません。いつでも閉じた時の状態に復元可能です。
* Chrome 再起動時にウィンドウとプロジェクトが自動的に関連付けられるようになりま
  した。以前はマニュアルで関連付けなければなりませんでした。
* キーボードナビゲーションが可能になりました。
* オプションがクラウドに保存されるようになりました。自宅や会社で共通の設定が利用
  できます (要 Chrome サインイン)。
* サマリー機能が拡張されました。自分がどのプロジェクトにどれくらい時間を費やした
  のか、2 ヶ月まで遡ることができます。

Project Tab Manager 知らなかった！という人がほとんどだと思うので、ゼロから書いて
みます。

## Project Tab Manager が解決する問題

元々、仕事上コンテキストスイッチ (プロジェクトごとに頭を切り替える) がかなり頻繁
に必要なため、それを少しでも楽になるようにと作ったのが Project Tab Manager でし
た。予めタブをセットにして保存しておき、手軽にひとつのウィンドウとして呼び出せ
る、というのが Project Tab Manager の基本コンセプトです。

こういう人にぜひ使って欲しいです

* Chrome のタブが常に 100 個近く開いている
* そのせいで Chrome だけでかなりメモリを消費している
* 仕事中に Twitter や Facebook (もちろん Google+ も！) を見ちゃって気が散る

Project Tab Manager (以下 PTM) を使えば、常に必要最低限なタブのみを開いておける
ので、今やっている仕事への集中力が高まり、Chrome の消費メモリが減少し、彼女がで
きます。

興味を持った方は、まずは [Chrome Web Store からインストー
ル](https://chrome.google.com/webstore/detail/project-tab-manager/iapdnheekciiecjijobcglkcgeckpoia)
してください。

## Getting Started

以前のバージョンではせっかくインストールしてもらったのに使い方がわからないという
方が結構いました。ので 2.0 からヘルプを用意したのですが、日本語ヘルプを書くのが
めんどいのでここに書いちゃいます。

PTM をインストールしたらまず下記を行なってそのパワーを実感して下さい。

1. 新しいウィンドウを開く
2. 何かウェブページを開く
3. PTM のアイコンをクリック
4. プロジェクト名を入力して保存する
5. 以上

[![](http://1.bp.blogspot.com/-c5CKGOu0ths/UYb5acqhsNI/AAAAAAAAc50/qjms4Dxvvk4/s1600/new_project.png)](http://1.bp.blogspot.com/-c5CKGOu0ths/UYb5acqhsNI/AAAAAAAAc50/qjms4Dxvvk4/s1600/new_project.png)

これでこのウィンドウにプロジェクト名が付きました。以後このウィンドウで開くあらゆ
るタブは、いつでも状態を復元することができます。以下を試してみて下さい。

1. 先ほど開いたウィンドウにいくつか新しいタブを開き、ウェブページを読み込む
2. ウィンドウごと閉じる (タブをひとつひとつ閉じるのではなく、ウィンドウ自体を閉
   じて下さい)
3. PTM のアイコンをクリックして今閉じたウィンドウのプロジェクトを開く

[![](http://2.bp.blogspot.com/-L28XHuni2nI/UYb5adUjw-I/AAAAAAAAc54/zSzLCynjWNg/s1600/saved_project.png)](http://2.bp.blogspot.com/-L28XHuni2nI/UYb5adUjw-I/AAAAAAAAc54/zSzLCynjWNg/s1600/saved_project.png)

元のタブの状態が復元されましたか？これが Project Tab Manager のパワーです！

## その他の使い方

### ブックマークを保存する

* PTM では、プロジェクトを保存するとブックマークが作られます。また、プロジェクト
  保存時に含まれなかったタブも、以後は復元可能になります。必要に応じてプロジェク
  ト内のタブ名横に表示されるスターアイコン (Chrome のブックマークと同じ) をク
  リックして保存しておけば、後から再度開くことが可能です。頻繁に使うページはブッ
  クマークしておきましょう。
* 先ほどのブックマークとは、本当に Chrome のブックマークのことです。Bookmark
  Manager を開いて “Project Tab Manager” というフォルダ (デフォルト) を探してみ
  て下さい。保存したプロジェクトがフォルダとして、タブがブックマークとして保存さ
  れていることがわかると思います。
* これにより、Chrome for iOS や Chrome for Android からでも必要なブックマークに
  アクセスできるのが特徴です。

[![](http://3.bp.blogspot.com/-xXhVgjvffy0/UYb5a6gWcqI/AAAAAAAAc6A/f6O25Hp_n8Y/s1600/starring.png)](http://3.bp.blogspot.com/-xXhVgjvffy0/UYb5a6gWcqI/AAAAAAAAc6A/f6O25Hp_n8Y/s1600/starring.png)

### プロジェクトを編集する

* プロジェクトの並べ替え、名前変更などは Bookmark Manager で行なって下さい。PTM
  自体に編集機能はありません。

### プロジェクトを削除する

* プロジェクトの削除は PTM のポップアップから行えます。プロジェクト名右のゴミ箱
  アイコンをクリックするだけです。
* 間違えて消しちゃった！という場合でも大丈夫。`__Archive__` というフォルダに移動
  されているだけです。Bookmark Manager で戻してあげるだけで復活します。

### プロジェクトを関連付ける

* バージョン 2.0 から Chrome を再起動してもウィンドウの関連付けが自動復元される
  ようにはなりましたが、場合によっては外れてしまうこともあるでしょう。そんな時は
  プロジェクト名横のピンアイコンをクリックして関連付けて下さい。

[![](http://2.bp.blogspot.com/-mAiBEHbrpGg/UYb5aJFvYXI/AAAAAAAAc6E/3c4I8VAB1Ss/s1600/associating.png)](http://2.bp.blogspot.com/-mAiBEHbrpGg/UYb5aJFvYXI/AAAAAAAAc6E/3c4I8VAB1Ss/s1600/associating.png)

### Lazy Load とは

* 複数のタブをまとめて開こうとした時に長時間かかること、ありますよね？PTM の特徴
  のひとつとして Lazy Load という機能があります。これにより、プロジェクトで大量
  のタブを開こうとした時でも、アクティブなもの以外は読み込まなくなり、時間が短縮
  され、リソースをほとんど食わなくなり、彼女ができます。
* Lazy Load されたタブのタイトルには “*” がプレフィックスされます。
* オプションで Lazy Load を無効にすることもできます。

### オプション

* オプションでは下記を設定することができます
    * プロジェクトを保存するブックマークの場所
    * プロジェクトを保存するブックマークの名前
    * Lazy Load の有効・無効

### Summary 機能

* PTM ポップアップの時計アイコンをクリックすることで、どのプロジェクトにどれくら
  いの時間を費やしたか、まとめを見ることができます。
* この記録は 2 ヶ月保存されます。「今月どのプロジェクトに一番時間使ったのか
  な？」「あー俺 Twitter ばっか見てるわ！」なんてことに便利かも。

[![](http://1.bp.blogspot.com/-uJrzqSNGikA/UYb5bCzrvvI/AAAAAAAAc58/cVd57aPuLgM/s658/summary.png)](http://1.bp.blogspot.com/-uJrzqSNGikA/UYb5bCzrvvI/AAAAAAAAc58/cVd57aPuLgM/s1600/summary.png)

### キーボードナビゲーション

* 慣れてくると、PTM ポップアップを開いた後、キーボードで操作したいという人は少な
  くないと思います。
* 検索、その後 `tab` で絞りこまれたプロジェクトを選び、`return` でプロジェクトを
  開くことができます。
* PTM ポップアップを開くこと自体も、ショートカットすることができます (Chrome の
  標準機能) “chrome://extensions” を開き、一番下の “Keyboard shortcuts” からお好
  みの設定を行なって下さい。僕は `Ctrl+p` にしてます。

## 最後に

バグを発見した場合、機能要望がある場合は[こち
ら](https://chrome.google.com/webstore/detail/project-tab-manager/iapdnheekciiecjijobcglkcgeckpoia/details)
からリクエストしてください。開発者の方は直接 [github から
contribute](https://github.com/agektmr/ProjectTabManager) して頂けると嬉しいで
す。
